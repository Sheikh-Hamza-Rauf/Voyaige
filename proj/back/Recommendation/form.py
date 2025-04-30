from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
import re
import random
import joblib
import warnings
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.metrics import mean_squared_error, r2_score
from waitress import serve

warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Directory to save models and training columns
MODEL_DIR = "models"
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

# Filenames for saved models and training columns (transport model removed)
MODEL_FILES = {
    "hotel": os.path.join(MODEL_DIR, "hotel_model.pkl"),
    "restaurant": os.path.join(MODEL_DIR, "restaurant_model.pkl"),
    "attraction": os.path.join(MODEL_DIR, "attraction_model.pkl")
}
TRAINING_COLS_FILE = os.path.join(MODEL_DIR, "training_columns.pkl")

# Global dictionary to store training columns for each component.
training_columns = {}

def load_and_preprocess_data(paths):
    """Load and preprocess data from various sources."""
    # Load CSV files
    attractions_df = pd.read_csv(paths["Cleaned_attr"])
    airbnb_df = pd.read_csv(paths["Cleaned_Airbnb"])
    buses_df = pd.read_csv(paths["Cleaned_busses"])
    cars_df = pd.read_csv(paths["Cleaned_Cars"])
    trains_df = pd.read_csv(paths["Cleaned_trains"])
    
    # Function to load and clean JSON files
    def load_json_file(file_path):
        encodings = ['utf-8', 'utf-8-sig', 'ISO-8859-1']
        data = None
        for encoding in encodings:
            try:
                with open(file_path, 'r', encoding=encoding, errors='ignore') as file:
                    raw_data = file.read()
                    raw_data = re.sub(r'[\x00-\x1F\x7F]', '', raw_data)
                    cleaned_data = re.sub(r'\{"\\$oid":\s*"(.*?)"\}', r'"\1"', raw_data)
                    try:
                        data = json.loads(cleaned_data)
                        break
                    except json.JSONDecodeError as e:
                        print(f"Error decoding JSON with {encoding} encoding: {e}")
                        continue
            except UnicodeDecodeError as e:
                print(f"Failed to read file with {encoding} encoding: {e}")
                continue
        if data is None:
            print(f"All encoding attempts failed for file {file_path}.")
        return pd.DataFrame(data) if data else pd.DataFrame()
    
    # Load JSON files
    hotels_df = load_json_file(paths["clean_hotel_data"])
    hotel_reviews_df = load_json_file(paths["hotel_reviews"])
    restaurants_df = load_json_file(paths["restaurant_data"])
    restaurant_reviews_df = load_json_file(paths["restaurant_reviews"])
    
    # Merge hotel and restaurant data with their reviews
    if not hotels_df.empty and not hotel_reviews_df.empty:
        hotels_df = pd.merge(hotels_df, hotel_reviews_df[['hotel_id', 'rating']], on='hotel_id', how='left')
    if not restaurants_df.empty and not restaurant_reviews_df.empty:
        restaurants_df = pd.merge(restaurants_df, restaurant_reviews_df[['restaurant_id', 'rating']], on='restaurant_id', how='left')
    
    # Transportation data is loaded (for completeness) but not used for training.
    return {
        'attractions': attractions_df,
        'hotels': hotels_df,
        'restaurants': restaurants_df,
        'transport': {
            'buses': buses_df,
            'cars': cars_df,
            'trains': trains_df
        }
    }

def prepare_training_data(data_dict):
    """Prepare training data for hotel, restaurant, and attraction models."""
    # Hotels
    hotel_cols = data_dict['hotels'].columns
    hotel_feature_cols = [col for col in ['city', 'price', 'rating'] if col in hotel_cols]
    hotel_features = pd.get_dummies(data_dict['hotels'][hotel_feature_cols])
    
    # Restaurants
    restaurant_cols = data_dict['restaurants'].columns
    restaurant_feature_cols = [col for col in ['city', 'rating'] if col in restaurant_cols]
    restaurant_features = pd.get_dummies(data_dict['restaurants'][restaurant_feature_cols])
    
    # Attractions – using city and category (if available)
    attraction_cols = data_dict['attractions'].columns
    attraction_feature_cols = [col for col in attraction_cols if 'city' in col.lower() or 'category' in col.lower()]
    attraction_features = pd.get_dummies(data_dict['attractions'][attraction_feature_cols])
    
    # Create target variables
    hotel_targets = data_dict['hotels']['price'] if 'price' in hotel_cols else pd.Series(0, index=hotel_features.index)
    restaurant_targets = data_dict['restaurants']['rating'] if 'rating' in restaurant_cols else pd.Series(0, index=restaurant_features.index)
    attraction_targets = attraction_features  # using features as proxy targets for attractions
    
    training_data = {
        'hotel': (hotel_features, hotel_targets),
        'restaurant': (restaurant_features, restaurant_targets),
        'attraction': (attraction_features, attraction_targets)
    }
    return training_data

def train_models(training_data):
    """Train models for each component and return both models and performance metrics."""
    models = {}
    metrics = {}
    
    for component, (X, y) in training_data.items():
        if X.empty or len(y) == 0:
            print(f"Skipping {component} model due to empty data")
            continue
            
        try:
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            # For attraction, use a multi-output regressor; for others, use RandomForest.
            if component == 'attraction':
                model = MultiOutputRegressor(GradientBoostingRegressor())
            else:
                model = RandomForestRegressor(n_estimators=150, random_state=42)
            
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            
            if component != 'attraction':
                mse = mean_squared_error(y_test, y_pred)
                r2 = r2_score(y_test, y_pred)
                metrics[component] = {'mse': mse, 'r2': r2}
            
            models[component] = model
            print(f"Successfully trained {component} model")
        except Exception as e:
            print(f"Error training {component} model: {e}")
            continue
            
    return models, metrics

def generate_itinerary(user_input, models, data_dict):
    """Generate itinerary based on user input, model predictions, and dynamic PKR budget management."""
    # Parse input values and enforce edge-case constraints.
    destination = user_input['destination']
    budget = float(user_input['budget'])  # budget in PKR
    duration = int(user_input['duration_days'])
    num_travelers = int(user_input['num_travelers'])
    area_of_interest = user_input.get('area_of_interest', '').lower()
    
    # Enforce minimum 1 and maximum 4 travelers.
    if num_travelers < 1:
        num_travelers = 1
    elif num_travelers > 4:
        num_travelers = 4
        
    # Transportation constraint: if duration is less than 3 days, override to 3.
    if duration < 3:
        duration = 3

    itinerary = {
        "destination": destination,
        "duration_days": duration,
        "num_travelers": num_travelers,
        "total_budget": budget,
        "hotel": {},
        "restaurants": [],
        "attractions": [],
        "transportation": {},
        "days": []
    }
    
    # ----- Hotel Selection -----
    hotel_city_col = [col for col in data_dict['hotels'].columns if 'city' in col.lower()][0]
    hotels = data_dict['hotels'][data_dict['hotels'][hotel_city_col] == destination].copy()
    if 'price' in hotels.columns:
        hotels['price'] = pd.to_numeric(hotels['price'], errors='coerce')
    if 'rating' in hotels.columns:
        hotels['rating'] = pd.to_numeric(hotels['rating'], errors='coerce')
    
    if not hotels.empty and 'hotel' in models:
        hotel_features = pd.get_dummies(hotels[[hotel_city_col, 'price', 'rating']])
        hotel_features = hotel_features.reindex(columns=training_columns['hotel'], fill_value=0)
        hotel_preds = models['hotel'].predict(hotel_features)
        hotels = hotels.copy()
        hotels['pred_score'] = hotel_preds
        # Sort hotels by predicted score and rating.
        top_hotels = hotels.sort_values(by=['pred_score', 'rating'], ascending=[False, False])
        # Dynamic budget allocation: hotel budget = 30% of total budget.
        hotel_alloc = 0.3 * budget
        # Try to choose a hotel whose total cost (price * duration) is within allocation.
        affordable_hotels = top_hotels[top_hotels['price'] * duration <= hotel_alloc]
        if not affordable_hotels.empty:
            chosen_hotel = affordable_hotels.iloc[0]
        else:
            chosen_hotel = top_hotels.sort_values(by='price').iloc[0]
        itinerary["hotel"] = {
            "name": chosen_hotel.get('name', 'Best Available Hotel'),
            "price": float(chosen_hotel.get('price', 0)),
            "rating": float(chosen_hotel.get('rating', 0))
        }
    else:
        itinerary["hotel"] = {"name": "Default Hotel", "price": 5000.0, "rating": 3.5}
    
    # ----- Restaurant Selection -----
    restaurant_city_col = [col for col in data_dict['restaurants'].columns if 'city' in col.lower()][0]
    restaurants_df = data_dict['restaurants'][data_dict['restaurants'][restaurant_city_col] == destination].copy()
    if 'rating' in restaurants_df.columns:
        restaurants_df['rating'] = pd.to_numeric(restaurants_df['rating'], errors='coerce')
    if not restaurants_df.empty and 'restaurant' in models:
        # Filter to include restaurants with rating 4.0 or higher.
        restaurants_df = restaurants_df[restaurants_df['rating'] >= 4.0]
        if restaurants_df.empty:
            restaurants_df = data_dict['restaurants'][data_dict['restaurants'][restaurant_city_col] == destination]
        rest_features = pd.get_dummies(restaurants_df[[restaurant_city_col, 'rating']])
        rest_features = rest_features.reindex(columns=training_columns['restaurant'], fill_value=0)
        rest_preds = models['restaurant'].predict(rest_features)
        restaurants_df = restaurants_df.copy()
        restaurants_df['pred_score'] = rest_preds
        # Sort by predicted score and rating.
        top_restaurants = restaurants_df.sort_values(by=['pred_score', 'rating'], ascending=[False, False])
        
        # For each day, assign two unique restaurants (lunch and dinner) without repetition.
        lunch_dinner_pairs = []
        available_restaurants = top_restaurants.drop_duplicates(subset='name').copy()
        for d in range(duration):
            if len(available_restaurants) >= 2:
                pair = available_restaurants.sample(2, replace=False)
                # Remove selected restaurants to avoid repetition.
                available_restaurants = available_restaurants.drop(pair.index)
                lunch_dinner_pairs.append((pair.iloc[0]['name'], pair.iloc[1]['name']))
            else:
                # If not enough unique restaurants remain, sample from the top list ensuring lunch != dinner.
                pair = top_restaurants.sample(2, replace=False)
                lunch_dinner_pairs.append((pair.iloc[0]['name'], pair.iloc[1]['name']))
        # Also compile a unique list of all recommended restaurants.
        all_restaurants = list({r for pair in lunch_dinner_pairs for r in pair})
        itinerary["restaurants"] = all_restaurants
        itinerary["lunch_dinner_pairs"] = lunch_dinner_pairs
    else:
        itinerary["restaurants"] = ["Local Eatery"]
        itinerary["lunch_dinner_pairs"] = [("Local Eatery", "Local Eatery") for _ in range(duration)]
    
    # ----- Attraction Selection -----
    attraction_city_col = [col for col in data_dict['attractions'].columns if 'city' in col.lower()][0]
    attractions_df = data_dict['attractions'][data_dict['attractions'][attraction_city_col] == destination]
    # Filter attractions based on area_of_interest.
    if area_of_interest == "urban exploration":
        if 'category' in attractions_df.columns:
            attractions_df = attractions_df[~attractions_df['category'].str.contains("museum|heritage", case=False, na=False)]
        if 'name' in attractions_df.columns:
            attractions_df = attractions_df[~attractions_df['name'].str.contains("museum|heritage", case=False, na=False)]
    if not attractions_df.empty and 'attraction' in models:
        if 'category' in attractions_df.columns:
            attr_features = pd.get_dummies(attractions_df[[attraction_city_col, 'category']])
        else:
            attr_features = pd.get_dummies(attractions_df[[attraction_city_col]])
        attr_features = attr_features.reindex(columns=training_columns['attraction'], fill_value=0)
        attr_preds = models['attraction'].predict(attr_features)
        attractions_df = attractions_df.copy()
        attractions_df['pred_score'] = np.mean(attr_preds, axis=1)
        top_attractions = attractions_df.sort_values(by='pred_score', ascending=False)
        # Choose unique attractions for each day if possible.
        if len(top_attractions) >= duration:
            selected_attractions = top_attractions.sample(n=duration, replace=False)
        else:
            selected_attractions = top_attractions
        itinerary["attractions"] = selected_attractions[[attraction_city_col, 'name']].to_dict('records')
    else:
        itinerary["attractions"] = [{"name": "Popular Attraction", attraction_city_col: destination}]
    
    # ----- Transportation Cost Estimation -----
    # Use a fixed public transport cost (in PKR). Enforce a minimum duration of 3 days and minimum cost of 50 PKR.
    effective_duration = max(duration, 3)
    travel_cost = max(effective_duration * 15, 5000)
    itinerary["transportation"] = {
        "mode": "public transport (bus/train)",
        "estimated_cost": travel_cost
    }
    
    # ----- Dynamic Budget Allocation & Cost Management -----
    # Allocation ratios: Hotel: 30%, Restaurant: 30%, Transport: 20%, Attractions: 20%
    hotel_alloc = 0.3 * budget
    restaurant_alloc = 0.3 * budget
    transport_alloc = 0.2 * budget
    attraction_alloc = 0.2 * budget
    
    hotel_cost = itinerary["hotel"]["price"] * duration
    # Assume default meal cost = 2000 PKR per meal.
    meal_cost_default = 2000
    restaurant_cost = meal_cost_default * 2 * duration
    transport_cost = transport_alloc
    # Assume a fixed attraction cost per day of 100 PKR.
    attraction_cost = 1000 * duration

    # Adjust restaurant cost if it exceeds allocated budget.
    if restaurant_cost > restaurant_alloc:
        meal_cost_adjusted = restaurant_alloc / (2 * duration)
        restaurant_cost = meal_cost_adjusted * 2 * duration
    # Adjust attraction cost if it exceeds allocation.
    if attraction_cost > attraction_alloc:
        attraction_cost = attraction_alloc

    total_cost = hotel_cost + restaurant_cost + transport_cost + attraction_cost

    itinerary["cost_breakdown"] = {
        "hotel_cost": hotel_cost,
        "restaurant_cost": restaurant_cost,
        "transport_cost": transport_cost,
        "attraction_cost": attraction_cost,
        "total_cost": total_cost,
        "budget": budget,
        "status": "Within budget" if total_cost <= budget else "Over budget"
    }
    
    # ----- Day-by-Day Itinerary (Logical & Unique) -----
    daily_itinerary = []
    # For attractions, assign unique ones per day if available.
    if len(itinerary["attractions"]) >= duration:
        day_attractions = itinerary["attractions"]
    else:
        # If not enough, repeat the available ones (though ideally they should be unique)
        day_attractions = (itinerary["attractions"] * ((duration // len(itinerary["attractions"])) + 1))[:duration]
    
    for i in range(duration):
        day_plan = {
            "day": i + 1,
            "attraction": day_attractions[i],
            "lunch": itinerary["lunch_dinner_pairs"][i][0],
            "dinner": itinerary["lunch_dinner_pairs"][i][1]
        }
        daily_itinerary.append(day_plan)
    itinerary["days"] = daily_itinerary

    # Print itinerary in console
    print("\nGenerated Itinerary:")
    print(json.dumps(itinerary, indent=4))
    
    return itinerary

@app.route("/")
def index():
    return "Server is up"


@app.route('/api/ItineraryForm', methods=['POST'])
def generate_itinerary_api():
    try:
        user_input = request.json
        # Required fields (area_of_interest is used for attractions filtering)
        required_fields = ['destination', 'duration_days', 'num_travelers', 'area_of_interest', 'budget']
        for field in required_fields:
            if field not in user_input:
                return jsonify({'error': f"Missing field: {field}"}), 400
        
        itinerary = generate_itinerary(user_input, trained_models, data_dict)
        return jsonify({
            'itinerary': itinerary,
            'total_cost': itinerary["cost_breakdown"]["total_cost"]
        }), 200
    except Exception as e:
        print(f"Error generating itinerary: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Paths for input datasets (adjust paths as necessary)
    paths = {
    "Cleaned_attr": "../Dataset/cleaned_data/Cleaned_attr.csv",
    "clean_hotel_data": "../Dataset/cleaned_data/clean_hotel_data.json",
    "Cleaned_Airbnb": "../Dataset/cleaned_data/Cleaned_Airbnb.csv",
    "Cleaned_busses": "../Dataset/cleaned_data/Cleaned_busses.csv",
    "Cleaned_Cars": "../Dataset/cleaned_data/Cleaned_Cars.csv",
    "Cleaned_trains": "../Dataset/cleaned_data/Cleaned_trains.csv",
    "hotel_reviews": "../Dataset/cleaned_data/clean_hotel_review_data.json",
    "restaurant_data": "../Dataset/new_restaurant_db.restaurants_data.json",
    "restaurant_reviews": "../Dataset/new_restaurant_db.restaurants_reviews.json"
}
    
    print("Loading and preprocessing data...")
    data_dict = load_and_preprocess_data(paths)
    
    # Load saved models if they exist; otherwise, train them.
    if all(os.path.exists(f) for f in MODEL_FILES.values()) and os.path.exists(TRAINING_COLS_FILE):
        print("Loading saved models and training columns...")
        trained_models = { comp: joblib.load(MODEL_FILES[comp]) for comp in MODEL_FILES }
        training_columns = joblib.load(TRAINING_COLS_FILE)
    else:
        print("Preparing training data...")
        training_data = prepare_training_data(data_dict)
        for component, (X, _) in training_data.items():
            training_columns[component] = X.columns
        print("Training models...")
        trained_models, model_metrics = train_models(training_data)
        print("Model performance metrics:")
        for comp, met in model_metrics.items():
            print(f"{comp.capitalize()} model: MSE={met['mse']:.4f}, R²={met['r2']:.4f}")
        for comp, model in trained_models.items():
            joblib.dump(model, MODEL_FILES[comp])
        joblib.dump(training_columns, TRAINING_COLS_FILE)
    
    print("Starting Flask server...")
    serve(app, host="0.0.0.0", port=8000)
