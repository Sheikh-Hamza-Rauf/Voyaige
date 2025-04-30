from flask import Flask, request, jsonify
from waitress import serve
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
import re
import joblib
import warnings
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.metrics import mean_squared_error, r2_score

warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# ========================== File Paths ==========================
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

MODEL_DIR = "models"
MODEL_FILES = {
    "hotel": os.path.join(MODEL_DIR, "hotel_model.pkl"),
    "restaurant": os.path.join(MODEL_DIR, "restaurant_model.pkl"),
    "attraction": os.path.join(MODEL_DIR, "attraction_model.pkl")
}
TRAINING_COLS_FILE = os.path.join(MODEL_DIR, "training_columns.pkl")


# ========================== Data Loading ==========================
def load_json_file(file_path):
    encodings = ['utf-8', 'utf-8-sig', 'ISO-8859-1']
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding, errors='ignore') as file:
                raw_data = file.read()
                raw_data = re.sub(r'[\x00-\x1F\x7F]', '', raw_data)
                cleaned_data = re.sub(r'\{"\\$oid":\s*"(.*?)"\}', r'"\1"', raw_data)
                return pd.DataFrame(json.loads(cleaned_data))
        except Exception:
            continue
    return pd.DataFrame()

def load_and_preprocess_data(paths):
    attractions_df = pd.read_csv(paths["Cleaned_attr"])
    airbnb_df = pd.read_csv(paths["Cleaned_Airbnb"])
    buses_df = pd.read_csv(paths["Cleaned_busses"])
    cars_df = pd.read_csv(paths["Cleaned_Cars"])
    trains_df = pd.read_csv(paths["Cleaned_trains"])

    hotels_df = load_json_file(paths["clean_hotel_data"])
    hotel_reviews_df = load_json_file(paths["hotel_reviews"])
    restaurants_df = load_json_file(paths["restaurant_data"])
    restaurant_reviews_df = load_json_file(paths["restaurant_reviews"])

    if not hotels_df.empty and not hotel_reviews_df.empty:
        hotels_df = pd.merge(hotels_df, hotel_reviews_df[['hotel_id', 'rating']], on='hotel_id', how='left')
    if not restaurants_df.empty and not restaurant_reviews_df.empty:
        restaurants_df = pd.merge(restaurants_df, restaurant_reviews_df[['restaurant_id', 'rating']], on='restaurant_id', how='left')

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


# ========================== Model Training ==========================
def prepare_training_data(data_dict):
    hotel = data_dict['hotels']
    restaurant = data_dict['restaurants']
    attraction = data_dict['attractions']

    hotel_features = pd.get_dummies(hotel[['city', 'price', 'rating']].dropna()) if not hotel.empty else pd.DataFrame()
    restaurant_features = pd.get_dummies(restaurant[['city', 'rating']].dropna()) if not restaurant.empty else pd.DataFrame()
    attraction_features = pd.get_dummies(attraction[['city', 'category']].dropna()) if not attraction.empty else pd.DataFrame()

    hotel_targets = hotel['price'] if 'price' in hotel else pd.Series()
    restaurant_targets = restaurant['rating'] if 'rating' in restaurant else pd.Series()
    attraction_targets = attraction_features.copy()

    return {
        'hotel': (hotel_features, hotel_targets),
        'restaurant': (restaurant_features, restaurant_targets),
        'attraction': (attraction_features, attraction_targets)
    }

def train_models(training_data):
    models = {}
    metrics = {}
    for comp, (X, y) in training_data.items():
        if X.empty or y.empty:
            continue
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        model = MultiOutputRegressor(GradientBoostingRegressor()) if comp == 'attraction' else RandomForestRegressor(n_estimators=100)
        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)
        if comp != 'attraction':
            metrics[comp] = {
                'mse': mean_squared_error(y_test, y_pred),
                'r2': r2_score(y_test, y_pred)
            }
        models[comp] = model
    return models, metrics


# ========================== Itinerary Logic ==========================
def generate_itinerary(user_input, models, data_dict, training_columns):
    destination = user_input['destination']
    budget = float(user_input['budget'])
    duration = max(int(user_input['duration_days']), 3)
    num_travelers = min(max(int(user_input['num_travelers']), 1), 4)
    area_of_interest = user_input.get('area_of_interest', '').lower()

    itinerary = {
        "destination": destination,
        "budget": budget,
        "duration_days": duration,
        "num_travelers": num_travelers,
        "area_of_interest": area_of_interest,
        "plan": []
    }

    hotel_df = data_dict['hotels']
    if not hotel_df.empty and destination in hotel_df['city'].values:
        filtered_hotels = hotel_df[hotel_df['city'] == destination]
        if not filtered_hotels.empty:
            hotel_sample = filtered_hotels.sample(1)
            price = hotel_sample['price'].values[0]
            total_cost = price * duration * num_travelers
            itinerary['plan'].append({
                "type": "hotel",
                "name": hotel_sample['name'].values[0],
                "cost": total_cost,
                "details": hotel_sample.to_dict(orient='records')[0]
            })
            budget -= total_cost

    attraction_df = data_dict['attractions']
    if not attraction_df.empty and destination in attraction_df['city'].values:
        filtered = attraction_df[attraction_df['city'] == destination]
        X_attr = pd.get_dummies(filtered[['city', 'category']])
        X_attr = X_attr.reindex(columns=training_columns['attraction'], fill_value=0)
        preds = models['attraction'].predict(X_attr)
        scores = preds.sum(axis=1)
        top_idxs = scores.argsort()[-3:][::-1]
        for _, row in filtered.iloc[top_idxs].iterrows():
            itinerary['plan'].append({
                "type": "attraction",
                "name": row.get('name', 'Attraction'),
                "details": row.to_dict()
            })

    return itinerary


# ========================== Main Execution ==========================
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

print("Loading data...")
data_dict = load_and_preprocess_data(paths)

if all(os.path.exists(p) for p in MODEL_FILES.values()) and os.path.exists(TRAINING_COLS_FILE):
    print("Loading saved models...")
    trained_models = {k: joblib.load(p) for k, p in MODEL_FILES.items()}
    training_columns = joblib.load(TRAINING_COLS_FILE)
else:
    print("Training models...")
    training_data = prepare_training_data(data_dict)
    training_columns = {k: X.columns for k, (X, _) in training_data.items()}
    trained_models, metrics = train_models(training_data)
    for k, model in trained_models.items():
        joblib.dump(model, MODEL_FILES[k])
    joblib.dump(training_columns, TRAINING_COLS_FILE)


# ========================== API Routes ==========================
@app.route('/api/generate-itinerary', methods=['POST'])
def generate_itinerary_api():
    try:
        user_input = request.get_json()
        itinerary = generate_itinerary(user_input, trained_models, data_dict, training_columns)
        return jsonify(itinerary)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ========================== Server ==========================
if __name__ == '__main__':
    print("Starting server on port 5001...")
    serve(app, host="0.0.0.0", port=5001)
