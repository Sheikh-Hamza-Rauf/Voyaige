# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import json
import numpy as np
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestRegressor
from surprise import Dataset, Reader, SVD
from surprise.model_selection import cross_validate
import joblib
import os
import re
import warnings
warnings.filterwarnings('ignore')
from waitress import serve

from surprise import accuracy

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/api/ItineraryForm', methods=['POST'])
def generate_itinerary():
        """
        API endpoint to generate an itinerary based on user input.
        Expects JSON input with the following fields:
        - starting_point
        - destination
        - duration_days
        - num_travelers
        - area_of_interest
        - budget
        - allocation_percentages (optional)
        """
        user_input = request.json

        # return jsonify({'test1': f" "})

        # Validate user input
        required_fields = ['starting_point', 'destination', 'duration_days', 'num_travelers', 'area_of_interest', 'budget']
        for field in required_fields:
            if field not in user_input:
                return jsonify({'error': f"Missing field: {field}"}), 400

        # Get allocation_percentages if provided, else use default
        allocation_percentages = user_input.get('allocation_percentages', data_prepared['allocation_percentages'])

        try:
            itinerary, total_cost = generate_itinerary_ml(
                user_input=user_input,
                hotels_dict=data_prepared['hotels_dict'],
                restaurants_dict=data_prepared['restaurants_dict'],
                attractions_dict=data_prepared['attractions_dict'],
                algo=data_prepared['algo'],
                allocation_percentages=allocation_percentages
            )
            return jsonify({
                'itinerary': itinerary,
                'total_cost': total_cost
            }), 200
        except Exception as e:
            print(f"Error generating itinerary: {e}")
            return jsonify({'error': str(e)}), 500
def generate_itinerary_ml(user_input, hotels_dict, restaurants_dict, attractions_dict, algo, allocation_percentages):
    destination = user_input['destination']
    duration = user_input['duration_days']
    budget = user_input['budget']

    # Dynamic budget allocation
    allocated_budget = dynamic_budget_allocation(budget, allocation_percentages)

    # Retrieve hotels, restaurants, and attractions for the given destination
    hotel_data = hotels_dict.get(destination, [])
    restaurant_data = restaurants_dict.get(destination, [])
    attraction_data = attractions_dict.get(destination, [])

    # Recommendation system predictions for hotels and attractions only
    user_id = 0
    recommended_hotels = recommend_items(algo, user_id, [hotel['hotel_name'] for hotel in hotel_data], hotel_data, budget=allocated_budget['hotel'], top_n=5)
    recommended_attractions = recommend_items(algo, user_id, [attr['attr_name'] for attr in attraction_data], attraction_data, top_n=20)

    # Select a hotel within budget
    selected_hotel = None
    for hotel in recommended_hotels:
        if hotel['price'] * duration <= allocated_budget['hotel']:
            selected_hotel = hotel
            break
    if not selected_hotel and hotel_data:
        selected_hotel = hotel_data[0]
    elif not selected_hotel:
        selected_hotel = {'hotel_name': 'No suitable hotel found', 'hotel_address': 'N/A', 'hotel_price': 'N/A'}

    # Select restaurants for lunch and dining directly from the city data
    selected_restaurants = []
    lunch_dinner_count = 2 * duration  # Number of meals (lunch + dinner for each day)
    
    if restaurant_data:
        # Select restaurants based on the available data in the city
        selected_restaurants = restaurant_data[:lunch_dinner_count]

    # Ensure selected_restaurants is never empty
    if not selected_restaurants:
        selected_restaurants = [
            {'restaurant_name': 'No suitable restaurant found in this city', 'restaurant_address': 'N/A'}
        ]

 

    # Select top attractions
    selected_attractions = recommended_attractions[:5]
    if not selected_attractions and attraction_data:
        selected_attractions = attraction_data[:5]

    # Transport cost
    transport_cost = allocated_budget.get('transport', 0)

    # Create the itinerary dictionary
    itinerary = {
        'hotel': selected_hotel,
        'restaurants': selected_restaurants,
        'attractions': selected_attractions,
        'transport': transport_cost
    }

    # Format the itinerary for display
    formatted_itinerary = format_itinerary_ml(itinerary, user_input, duration, restaurants_dict)

    # Calculate the total estimated cost
    hotel_cost = selected_hotel.get('price', 0) * duration if isinstance(selected_hotel.get('price', 0), (int, float)) else 0
    total_cost = hotel_cost + transport_cost  # Include transport cost

    return formatted_itinerary, total_cost


# Define recommendation functions
def recommend_items(algo, user_id, items, item_data, budget=None, top_n=5):
            predictions = []
            for item_name in items:
                # Predict rating for the item
                pred = algo.predict(user_id, item_name)

                # Find the item details from item_data (search in the list of dictionaries)
                item_info = next((data for data in item_data if data.get('name') == item_name), None)

                if item_info:
                    price = item_info.get('price')
                    rating = item_info.get('rating')

                    # Filter items within budget
                    if budget is None or (price is not None and price <= budget):
                        predictions.append((item_name, pred.est, price, rating))

            # Sort by estimated rating and, if available, by rating as a secondary criterion
            predictions.sort(key=lambda x: (x[1], x[3] if x[3] is not None else 0), reverse=True)

            # Return the top N recommendations with detailed information
            recommended_items = [{'name': item, 'estimated_rating': est, 'price': price, 'rating': rating}
                                for item, est, price, rating in predictions[:top_n]]

            return recommended_items
def format_itinerary_ml(itinerary, user_input, duration, restaurants_dict):
    """
    Formats the itinerary into a day-by-day itinerary string.

    Args:
        itinerary (dict): Contains selected hotel, restaurants, and attractions.
        user_input (dict): Contains user's destination, duration, number of travelers, area of interest, and budget.
        duration (int): Number of days for the itinerary.
        restaurants_dict (dict): Dictionary containing restaurant data for the destination.

    Returns:
        dict: A formatted itinerary dictionary.
    """
    destination = user_input['destination']
    formatted_itinerary = {
        "destination": destination,
        "duration": duration,
        "num_travelers": user_input['num_travelers'],
        "area_of_interest": user_input['area_of_interest'],
        "total_budget": user_input['budget'],
        "hotel": itinerary['hotel'],
        "transport_budget": itinerary['transport'],
        "days": []
    }

    # Prepare day-wise itinerary activities
    attractions = itinerary['attractions']
    restaurants = itinerary['restaurants']

    # Add restaurants from restaurants_dict
    if destination in restaurants_dict:
        restaurants.extend(restaurants_dict[destination])

    # Adjust attractions per day based on availability
    if attractions:
        attractions_per_day = max(1, len(attractions) // duration)
    else:
        attractions_per_day = 0

    # Format each day
    for day in range(1, duration + 1):
        day_info = {
            "day": day,
            "attractions": [],
            "dining": {}
        }

        # Allocate daily attractions
        daily_attractions = attractions[(day - 1) * attractions_per_day : day * attractions_per_day]
        if daily_attractions:
            day_info["attractions"] = [
                {
                    "name": attraction.get('attr_name', 'Not specified'),
                    "category": attraction.get('attr_category', 'General')
                } for attraction in daily_attractions
            ]
        else:
            day_info["attractions"].append({"name": "No specific attractions planned for today", "category": ""})

        # Allocate restaurants (lunch and dinner)
        if day <= len(restaurants) // 2:
            lunch_restaurant = restaurants[(day - 1) * 2]
            dinner_restaurant = restaurants[(day - 1) * 2 + 1]
            day_info["dining"] = {
                "lunch": lunch_restaurant.get('restaurant_name', 'Not specified'),
                "dinner": dinner_restaurant.get('restaurant_name', 'Not specified')
            }
        else:
            day_info["dining"] = {
                "lunch": "Local eateries",
                "dinner": "Local eateries"
            }

        formatted_itinerary["days"].append(day_info)

    return formatted_itinerary

def dynamic_budget_allocation(total_budget, allocation_percentages):
            """
            Dynamically allocates budget for hotels, restaurants, and transport based on the total budget and area of interest.
            Attractions do not require budget allocation as they are free.

            Args:
                total_budget (float): The user's total budget for the trip.
                allocation_percentages (dict): A dictionary with base percentage allocations for each category.

            Returns:
                dict: A dictionary with allocated budgets for 'hotel', 'restaurants', and 'transport'.
            """
            # Default base allocation percentages if no specific adjustments are needed
            base_allocation = {
                'hotel': 50,        # 50% of the budget for hotel
                'restaurants': 30,  # 30% of the budget for restaurants
                'transport': 20     # 20% of the budget for transport
            }

            # Update allocation based on input allocation_percentages
            base_allocation.update(allocation_percentages)

            # Calculate the allocated budget for each category
            allocated_budget = {category: total_budget * percentage / 100 for category, percentage in base_allocation.items()}

            return allocated_budget  # Ensure the function returns allocated_budget




def load_json_with_cleaning(file_path):
        encodings = ['utf-8', 'utf-8-sig', 'ISO-8859-1']
        for encoding in encodings:
            try:
                with open(file_path, 'r', encoding=encoding, errors='ignore') as file:
                    raw_data = file.read()
                    raw_data = re.sub(r'[\x00-\x1F\x7F]', '', raw_data)
                    cleaned_data = re.sub(r'\{"\$oid":\s*"(.*?)"\}', r'"\1"', raw_data)
                    try:
                        data = json.loads(cleaned_data)
                        return data
                    except json.JSONDecodeError as e:
                        print(f"Error decoding JSON with {encoding} encoding: {e}")
                        continue
            except UnicodeDecodeError as e:
                print(f"Failed to read file with {encoding} encoding: {e}")
                continue
        print(f"All encoding attempts failed for file {file_path}.")
        return None

def remove_image_columns(df):
        return df.drop(columns=[col for col in ['image', 'images'] if col in df.columns])

def convert_lists_to_strings(df):
        for col in df.columns:
            if df[col].apply(lambda x: isinstance(x, list)).any():
                df[col] = df[col].apply(lambda x: str(x) if isinstance(x, list) else x)
        return df

def prepare_data():
        # Initialize a list to hold DataFrames
        dataframes = []

        # Load CSV files as separate DataFrames and remove 'image' and 'images' columns if present
        attractions_df = remove_image_columns(pd.read_csv(paths["Cleaned_attr"]))
        airbnb_df = remove_image_columns(pd.read_csv(paths["Cleaned_Airbnb"]))
        buses_df = remove_image_columns(pd.read_csv(paths["Cleaned_busses"]))
        cars_df = remove_image_columns(pd.read_csv(paths["Cleaned_Cars"]))
        trains_df = remove_image_columns(pd.read_csv(paths["Cleaned_trains"]))

        # Rename columns to avoid duplicates
        airbnb_df.columns = [f"airbnb_{col}" for col in airbnb_df.columns]
        buses_df.columns = [f"bus_{col}" for col in buses_df.columns]
        cars_df.columns = [f"car_{col}" for col in cars_df.columns]
        trains_df.columns = [f"train_{col}" for col in trains_df.columns]

        # Add CSV DataFrames to the list
        dataframes.extend([attractions_df, buses_df, trains_df, cars_df])

        # Load hotel data and reviews, and merge them if possible
        hotel_data = load_json_with_cleaning(paths["clean_hotel_data"])
        hotel_reviews = load_json_with_cleaning(paths["hotel_reviews"])

        if hotel_data and hotel_reviews:
            hotel_df = remove_image_columns(pd.DataFrame(hotel_data))
            hotel_reviews_df = pd.DataFrame(hotel_reviews)

            # Ensure 'hotel_id' is present for merging
            if 'hotel_id' in hotel_df.columns and 'hotel_id' in hotel_reviews_df.columns:
                merged_hotel_df = pd.merge(hotel_df, hotel_reviews_df[['hotel_id', 'rating']], on='hotel_id', how='left')
                dataframes.append(merged_hotel_df)

        # Load restaurant data and reviews, and merge them if possible
        restaurant_data = load_json_with_cleaning(paths["restaurant_data"])
        restaurant_reviews = load_json_with_cleaning(paths["restaurant_reviews"])

        if restaurant_data and restaurant_reviews:
            restaurant_df = remove_image_columns(pd.DataFrame(restaurant_data))
            restaurant_reviews_df = pd.DataFrame(restaurant_reviews)

            # Ensure 'restaurant_id' is present for merging
            if 'restaurant_id' in restaurant_df.columns and 'restaurant_id' in restaurant_reviews_df.columns:
                merged_restaurant_df = pd.merge(restaurant_df, restaurant_reviews_df[['restaurant_id', 'rating']], on='restaurant_id', how='left')
                dataframes.append(merged_restaurant_df)

        # Concatenate all DataFrames side by side
        final_df = pd.concat(dataframes, axis=1)
        print(f"Data has been merged")

        # Adding prefix to merged hotel DataFrame columns
        merged_hotel_df.columns = [f"hotel_{col}" for col in merged_hotel_df.columns]

        # Adding prefix to merged restaurant DataFrame columns
        merged_restaurant_df.columns = [f"restaurant_{col}" for col in merged_restaurant_df.columns]

        # Adding prefix to attractions DataFrame columns
        attractions_df.columns = [f"attr_{col}" for col in attractions_df.columns]

        # List of original DataFrames
        dataframes = [attractions_df, merged_hotel_df, merged_restaurant_df, buses_df, trains_df, cars_df]

        # List of columns to drop for each DataFrame
        columns_to_drop = {
            1: ['attr_description', 'attr_availability', 'attr_image1','attr_image2','attr_image3'],
            2: ['hotel__id', 'hotel_about'],
            3: ['restaurant__id', 'restaurant_phone_number', 'restaurant_service', 'restaurant_Open_hour'],
            4: ['bus_cruise'],
            5: ['train_cruise'],
            6: ['car_ac', 'car_transmission', 'car_class', 'car_theft_protection', 'car_clean_interior', 'car_clean_exterior']
        }

        # Loop through each DataFrame and drop the specified columns directly from the original DataFrames
        for i, df in enumerate(dataframes, start=1):
            if i in columns_to_drop:
                df.drop(columns=columns_to_drop[i], errors='ignore', inplace=True)
                print(f"DataFrame {i} - Columns removed: {columns_to_drop[i]}")

        # Print overall info about the dataframes list
        print("Overall DataFrames Info:")
        print(f"Number of DataFrames: {len(dataframes)}")
        print("-" * 50)

        # Print info for each DataFrame
        dataframe_names = [
            'attractions_df',
            'merged_hotel_df',
            'merged_restaurant_df',
            'buses_df',
            'trains_df',
            'cars_df'
        ]

        for i, df in enumerate(dataframes, start=1):
            print(f"DataFrame {i} Info:")
            df.info()
            print("-" * 50)

        # Creating lookup dictionaries for each DataFrame

        # Group attractions by city
        attractions_dict = attractions_df.groupby('attr_city').apply(lambda x: x.to_dict('records')).to_dict()

        # Group hotels by city
        hotels_dict = merged_hotel_df.groupby('hotel_city').apply(lambda x: x.to_dict('records')).to_dict()

        # Group restaurants by city
        restaurants_dict = merged_restaurant_df.groupby('restaurant_city').apply(lambda x: x.to_dict('records')).to_dict()

        # Transport lookup dictionary with grouped data by starting and ending locations
        transport_dict = {
            'buses': buses_df.groupby(['bus_starting', 'bus_ending']).apply(lambda x: x.to_dict('records')).to_dict(),
            'trains': trains_df.groupby(['train_starting', 'train_ending']).apply(lambda x: x.to_dict('records')).to_dict(),
            'cars': cars_df.groupby('car_city').apply(lambda x: x.to_dict('records')).to_dict()
        }

        # Combined dictionary with all lookup dictionaries
        trip_planning_dict = {
            'attractions': attractions_dict,
            'hotels': hotels_dict,
            'restaurants': restaurants_dict,
            'transport': transport_dict
        }


        # Function to calculate average ratings
        def calculate_avg_rating(df, group_col, rating_col):
            return df.groupby(group_col)[rating_col].mean().reset_index().rename(columns={rating_col: 'avg_rating'})

        # Convert the ratings columns to numeric, forcing non-numeric values to NaN
        merged_hotel_df['hotel_rating'] = pd.to_numeric(merged_hotel_df['hotel_rating'], errors='coerce')
        merged_restaurant_df['restaurant_rating'] = pd.to_numeric(merged_restaurant_df['restaurant_rating'], errors='coerce')

        # Calculate average ratings
        hotel_avg_ratings = calculate_avg_rating(merged_hotel_df, 'hotel_hotel_id', 'hotel_rating')
        restaurant_avg_ratings = calculate_avg_rating(merged_restaurant_df, 'restaurant_restaurant_id', 'restaurant_rating')

        # Merge average ratings back into the original DataFrames
        merged_hotel_df = pd.merge(merged_hotel_df, hotel_avg_ratings, on='hotel_hotel_id', how='left')
        merged_restaurant_df = pd.merge(merged_restaurant_df, restaurant_avg_ratings, on='restaurant_restaurant_id', how='left')

        # Display the updated DataFrames to verify
        print("Hotels DataFrame with Average Ratings:")
        print(merged_hotel_df.head())

        print("\nRestaurants DataFrame with Average Ratings:")
        print(merged_restaurant_df.head())

        # Encoding Categorical Columns
        from sklearn.preprocessing import LabelEncoder

        # Define the columns to encode for each DataFrame
        columns_to_encode = {
            'merged_hotel_df': ['hotel_city'],
            'merged_restaurant_df': ['restaurant_city'],
            'attractions_df': ['attr_city'],
            'buses_df': ['bus_starting', 'bus_ending'],
            'trains_df': ['train_starting', 'train_ending'],
            'cars_df': ['car_city']
        }

        # Initialize a dictionary to store LabelEncoders for each column
        encoders = {}

        def encode_categorical_columns(dataframes_dict, columns_to_encode, encoders):
            for df_name, df in dataframes_dict.items():
                if df_name in columns_to_encode:
                    for col in columns_to_encode[df_name]:
                        if col in df.columns:
                            le = LabelEncoder()
                            df[col] = df[col].fillna('Missing')
                            df[f'{col}_encoded'] = le.fit_transform(df[col])
                            encoders[f'{df_name}_{col}'] = le
                            print(f"Encoded '{col}' in '{df_name}' as '{col}_encoded'.")
                        else:
                            print(f"Column '{col}' not found in '{df_name}'. Skipping encoding for this column.")

        def display_encoded_columns(dataframes_dict, columns_to_encode):
            for df_name, df in dataframes_dict.items():
                if df_name in columns_to_encode:
                    for col in columns_to_encode[df_name]:
                        encoded_col = f'{col}_encoded'
                        if encoded_col in df.columns:
                            print(f"\n{df_name} - {col} and {encoded_col}:")
                            print(df[[col, encoded_col]].head())
                        else:
                            print(f"\n{df_name}: Encoded column '{encoded_col}' not found.")

        # Execute the encoding process
        dataframes_dict = {
            'merged_hotel_df': merged_hotel_df,
            'merged_restaurant_df': merged_restaurant_df,
            'attractions_df': attractions_df,
            'buses_df': buses_df,
            'trains_df': trains_df,
            'cars_df': cars_df
        }

        encode_categorical_columns(dataframes_dict, columns_to_encode, encoders)
        display_encoded_columns(dataframes_dict, columns_to_encode)

        # Scaling Numerical Columns
        from sklearn.preprocessing import StandardScaler

        # Define the columns to scale for each DataFrame
        columns_to_scale = {
            'merged_hotel_df': ['hotel_price'],
            'merged_restaurant_df': ['restaurant_rating'],
            'buses_df': ['bus_price'],
            'trains_df': ['train_price'],
            'cars_df': ['car_price_per_day']
        }

        # Initialize a dictionary to store StandardScaler instances for each column
        scalers = {}

        def scale_numerical_columns(dataframes_dict, columns_to_scale, scalers):
            for df_name, df in dataframes_dict.items():
                if df_name in columns_to_scale:
                    for col in columns_to_scale[df_name]:
                        if col in df.columns:
                            try:
                                df[col] = df[col].fillna(df[col].mean())
                                scaler = StandardScaler()
                                scaled_values = scaler.fit_transform(df[[col]])
                                scaled_col_name = f'{col}_scaled'
                                df[scaled_col_name] = scaled_values
                                scalers[f'{df_name}_{col}'] = scaler
                                print(f"Scaled '{col}' in '{df_name}' as '{scaled_col_name}'.")
                            except Exception as e:
                                print(f"Error scaling '{col}' in '{df_name}': {e}")
                        else:
                            print(f"Column '{col}' not found in '{df_name}'. Skipping scaling for this column.")

        def display_scaled_columns(dataframes_dict, columns_to_scale):
            for df_name, df in dataframes_dict.items():
                if df_name in columns_to_scale:
                    for col in columns_to_scale[df_name]:
                        scaled_col = f'{col}_scaled'
                        if scaled_col in df.columns:
                            print(f"\n{df_name} - {col} and {scaled_col}:")
                            print(df[[col, scaled_col]].head())
                        else:
                            print(f"\n{df_name}: Scaled column '{scaled_col}' not found.")

        # Execute the scaling process
        scale_numerical_columns(dataframes_dict, columns_to_scale, scalers)
        display_scaled_columns(dataframes_dict, columns_to_scale)

        # Save the scalers for future use
        def save_scalers(scalers, directory='scalers'):
            os.makedirs(directory, exist_ok=True)
            for scaler_name, scaler_instance in scalers.items():
                scaler_path = os.path.join(directory, f'{scaler_name}_scaler.joblib')
                joblib.dump(scaler_instance, scaler_path)
                print(f"Saved scaler '{scaler_name}' to '{scaler_path}'.")

        # Save the scalers
        save_scalers(scalers)

    # -------------------------------------------------------------------------------------------------------------------
        # Prepare user preferences DataFrame
        user_preferences = []
        for idx, row in itineraries_df.iterrows():
            user_id = idx  # Unique user ID for each itinerary
            hotel = row['hotel']
            # Assign higher rating for hotel
            user_preferences.append({'user_id': user_id, 'item': hotel, 'type': 'hotel', 'rating': 5})
            # Assign medium rating for attractions
            for attraction in row['attractions']:
                user_preferences.append({'user_id': user_id, 'item': attraction, 'type': 'attraction', 'rating': 4})
            # Assign lower rating for restaurants
            for restaurant in row['restaurants']:
                user_preferences.append({'user_id': user_id, 'item': restaurant, 'type': 'restaurant', 'rating': 3})

        user_pref_df = pd.DataFrame(user_preferences)

        # Define the rating scale
        reader = Reader(rating_scale=(1, 5))

        # Load data into Surprise
        data = Dataset.load_from_df(user_pref_df[['user_id', 'item', 'rating']], reader)

        # Initialize the SVD algorithm
        
        def save_model(algo, filename='svd_model.joblib'):
                         joblib.dump(algo, filename)
                         print(f"Model saved to {filename}")
        # Load the trained model using joblib
        def load_model(filename='svd_model.joblib'):
             try:
                    model = joblib.load(filename)
                    print(f"Model loaded from {filename}")
                    return model
             except FileNotFoundError:
                  print(f"Model file {filename} not found.")
                  return None

        # Check if model exists before training
        algo = load_model()

        if algo is None:
    # Initialize the SVD algorithm
         algo = SVD(verbose=True)

    # Define the rating scale
         reader = Reader(rating_scale=(1, 5))

    # Load data into Surprise
         data = Dataset.load_from_df(user_pref_df[['user_id', 'item', 'rating']], reader)

    # Perform cross-validation
         print("Cross-validating the SVD model...")
         cross_validate(algo, data, measures=['RMSE'], cv=5, verbose=True)
    # Train the model on the entire dataset
         print("Training the SVD model on the full dataset...")
         trainset = data.build_full_trainset()
         algo.fit(trainset)

    # Save the trained model
         save_model(algo)


        def allocate_budget(total_budget, allocation_percentages):
            allocated_budget = {}
            for category, percentage in allocation_percentages.items():
                allocated_budget[category] = total_budget * percentage / 100
            return allocated_budget

        # Example allocation percentages
        allocation_percentages = {
            'hotel': 50,        # 50% of the budget
            'restaurants': 30,  # 30% of the budget
            'attractions': 20   # 20% of the budget
        }


        
        
        # Example user input (for testing purposes)
        # In production, this will come from the frontend
        user_input = {
            'starting_point': 'Islamabad',
            'destination': 'Murree',
            'duration_days': 5,
            'num_travelers': 4,
            'area_of_interest': 'Urban Exploration',
            'budget': 12000  # in PKR
        }


        return {
            'hotels_dict': hotels_dict,
            'restaurants_dict': restaurants_dict,
            'attractions_dict': attractions_dict,
            'algo': algo,
            'allocation_percentages': allocation_percentages
        }

    


if __name__ == '__main__':
    itineraries_data = [
        {
            'destination': 'Islamabad',
            'area_of_interest': 'Cultural & Scenic',
            'hotel': 'Serena Hotel',
            'restaurants': ['Monal Restaurant', 'Centaurus Mall Food Court', 'Kohsar Restaurant'],
            'attractions': ['Faisal Mosque', 'Daman-e-Koh', 'Pakistan Monument']
        },
        {
            'destination': 'Lahore',
            'area_of_interest': 'Historical & Culinary',
            'hotel': 'Pearl Continental',
            'restaurants': ['Cuckoo’s Den', 'Andaaz Restaurant', 'Lakshmi Chowk'],
            'attractions': ['Lahore Fort', 'Badshahi Mosque', 'Shalimar Gardens']
        },
        {
            'destination': 'Karachi',
            'area_of_interest': 'Beach & Urban Exploration',
            'hotel': 'Marriott Hotel',
            'restaurants': ['Boat Basin', 'BBQ Tonight', 'Okra Restaurant'],
            'attractions': ['Clifton Beach', 'Quaid’s Mausoleum', 'Pakistan Maritime Museum']
        },
        {
            'destination': 'Hunza Valley',
            'area_of_interest': 'Adventure & Nature',
            'hotel': 'Serena Hunza',
            'restaurants': ['Hotel Restaurant', 'Local Hunza Cuisine', 'Local Café'],
            'attractions': ['Baltit Fort', 'Passu Cones', 'Hopper Glacier']
        },
        {
            'destination': 'Swat Valley',
            'area_of_interest': 'Scenic & Relaxation',
            'hotel': 'Serena Swat',
            'restaurants': ['Local Restaurant', 'Hotel Restaurant', 'Benaz Restaurant'],
            'attractions': ['Mingora City Tour', 'Malam Jabba', 'Fizagat Park']
        },
        {
            'destination': 'Peshawar',
            'area_of_interest': 'Cultural & Historical',
            'hotel': 'Serena Hotel Peshawar',
            'restaurants': ['Namak Mandi', 'Sufi Restaurant', 'Local Dhaba'],
            'attractions': ['Peshawar Museum', 'Qissa Khwani Bazaar', 'Bala Hisar Fort']
        },
        {
            'destination': 'Quetta',
            'area_of_interest': 'Nature & Culture',
            'hotel': 'Serena Quetta',
            'restaurants': ['Lakeside Restaurant', 'Local Cuisine', 'Noor Mahal Restaurant'],
            'attractions': ['Hanna Lake', 'Quetta Bazaar', 'Ziarat Day Trip']
        },
        {
            'destination': 'Skardu',
            'area_of_interest': 'Adventure & Scenic',
            'hotel': 'Shangrila Resort',
            'restaurants': ['Resort Restaurant', 'Local Restaurant', 'Local Café'],
            'attractions': ['Shangrila Lake', 'Deosai Plains', 'Shigar Fort']
        },
        {
            'destination': 'Multan',
            'area_of_interest': 'Cultural & Historical',
            'hotel': 'Serena Multan',
            'restaurants': ['Local Restaurant', 'Hotel Restaurant', 'Local Eatery'],
            'attractions': ['Multan Fort', 'Shrine of Bahauddin Zakariya', 'Tomb of Shah Rukn-e-Alam']
        },
        {
            'destination': 'Gilgit',
            'area_of_interest': 'Adventure & Scenic',
            'hotel': 'Serena Gilgit',
            'restaurants': ['Local Café', 'Local Restaurant', 'Local Eatery'],
            'attractions': ['Explore Gilgit City', 'Gilgit Bazaar', 'Hunza Valley']
        },
        {
            'destination': 'Neelum Valley',
            'area_of_interest': 'Scenic & Relaxation',
            'hotel': 'K2 Inn Muzaffarabad',
            'restaurants': ['Hotel Restaurant', 'Local Cuisine', 'Local Café'],
            'attractions': ['Muzaffarabad City Tour', 'Keran and Sharda', 'Ratti Gali Lake']
        },
        {
            'destination': 'Bahawalpur',
            'area_of_interest': 'Historical & Cultural',
            'hotel': 'Noor Mahal Hotel',
            'restaurants': ['Local Restaurant', 'Hotel Restaurant', 'Local Café'],
            'attractions': ['Noor Mahal', 'Derawar Fort', 'Bahawalpur Museum']
        },
        {
            'destination': 'Murree',
            'area_of_interest': 'Scenic & Leisure',
            'hotel': 'Pearl Continental Murree',
            'restaurants': ['Café Aylanto', 'Local Café', 'Local Eatery'],
            'attractions': ['Mall Road', 'Pindi Point', 'Patriata Cable Car']
        },
        {
            'destination': 'Ziarat',
            'area_of_interest': 'Nature & Historical',
            'hotel': 'Ziarat Residency',
            'restaurants': ['Hotel Restaurant', 'Local Cuisine', 'Local Café'],
            'attractions': ['Quaid-e-Azam Residency', 'Juniper Forest', 'Ziarat Golf Course']
        },
        {
            'destination': 'Gwadar',
            'area_of_interest': 'Beach & Relaxation',
            'hotel': 'Serena Gwadar',
            'restaurants': ['Hotel Restaurant', 'Local Seafood Restaurant', 'Beachside Shack'],
            'attractions': ['Gwadar Beach', 'Hammerhead Lighthouse', 'Gwadar Port']
        },
        {
            'destination': 'Sialkot',
            'area_of_interest': 'Cultural & Sports',
            'hotel': 'Hotel One Sialkot',
            'restaurants': ['Local Restaurant', 'Hotel Restaurant', 'Local Café'],
            'attractions': ['Sialkot Fort', 'Clock Tower', 'Iqbal Manzil']
        },
        {
            'destination': 'Rawalpindi',
            'area_of_interest': 'Urban Exploration',
            'hotel': 'Pearl Continental Rawalpindi',
            'restaurants': ['Local Eatery', 'Hotel Restaurant', 'Picnic'],
            'attractions': ['Raja Bazaar', 'Rawalpindi Cricket Stadium', 'Ayub National Park']
        },
        {
            'destination': 'Chitral',
            'area_of_interest': 'Adventure & Culture',
            'hotel': 'Serena Chitral',
            'restaurants': ['Hotel Restaurant', 'Local Cuisine', 'On-site Hut'],
            'attractions': ['Chitral Bazaar', 'Shandur Pass', 'Tirich Mir Base Camp']
        },
        {
            'destination': 'Bahawalnagar',
            'area_of_interest': 'Historical',
            'hotel': 'Local Guest House',
            'restaurants': ['Local Restaurant', 'Hotel', 'Local Café'],
            'attractions': ['Bahawalnagar Fort', 'Noor Mahal Bahawalpur', 'Local Markets']
        },
        {
            'destination': 'Mirpur',
            'area_of_interest': 'Scenic & Leisure',
            'hotel': 'Hotel Mirpur',
            'restaurants': ['Lakeside Restaurant', 'Local Bazaar', 'Local Eatery'],
            'attractions': ['Mangla Dam Tour', 'Neelum Jheel', 'Local Parks']
        },
        {
            'destination': 'Muridke',
            'area_of_interest': 'Urban & Historical',
            'hotel': 'Local Guest House',
            'restaurants': ['Local Dhaba', 'Local Café'],
            'attractions': ['Local Historical Sites', 'Markets']
        },
        {
            'destination': 'Saidu Sharif',
            'area_of_interest': 'Scenic & Cultural',
            'hotel': 'Serena Saidu Sharif',
            'restaurants': ['Hotel Restaurant', 'Local Cuisine', 'Local Café'],
            'attractions': ['Fizagat Park', 'Mingora', 'Saidu Sharif Museum']
        },
        {
            'destination': 'Taxila',
            'area_of_interest': 'Historical & Cultural',
            'hotel': 'Hotel One Taxila',
            'restaurants': ['Local Restaurant', 'Hotel Restaurant', 'Local Café'],
            'attractions': ['Taxila Museum', 'Jaulian Monastery', 'Sirkap Ancient City']
        },
        {
            'destination': 'Bhawalpur',
            'area_of_interest': 'Historical & Cultural',
            'hotel': 'Noor Mahal Hotel',
            'restaurants': ['Local Restaurant', 'Hotel Restaurant', 'Local Café'],
            'attractions': ['Noor Mahal', 'Derawar Fort', 'Bahawalpur Museum']
        },
        {
            'destination': 'Kaghan Valley',
            'area_of_interest': 'Adventure & Scenic',
            'hotel': 'Serena Kaghan',
            'restaurants': ['Hotel Restaurant', 'Local Cuisine', 'Local Café'],
            'attractions': ['Lake Saif ul Malook', 'Trek to Lulusar Lake', 'Babusar Top']
        },
        {
            'destination': 'Kotli',
            'area_of_interest': 'Scenic & Leisure',
            'hotel': 'Local Guest House',
            'restaurants': ['Local Restaurant', 'Local Café'],
            'attractions': ['Kotli City', 'River View', 'Local Parks']
        },
        {
            'destination': 'Gilgit',
            'area_of_interest': 'Extreme Adventure',
            'hotel': 'Serena Gilgit',
            'restaurants': ['Hotel Restaurant', 'Local Restaurant', 'Local Eatery'],
            'attractions': ['Explore Gilgit Bazaar', 'Hunza Valley', 'Rakaposhi Base Camp']
        },
        {
            'destination': 'Bahawalpur',
            'area_of_interest': 'Cultural & Historical',
            'hotel': 'Noor Mahal Hotel',
            'restaurants': ['Local Restaurant', 'Hotel Restaurant', 'Local Café'],
            'attractions': ['Noor Mahal', 'Derawar Fort', 'Bahawalpur Museum']
        },
        {
            'destination': 'Naran',
            'area_of_interest': 'Adventure & Scenic',
            'hotel': 'Hotel Naran',
            'restaurants': ['Local Bistro', 'Mountain View Café', 'Riverfront Restaurant'],
            'attractions': ['Lake Saif ul Malook', 'Babusar Top', 'Lulusar Lake']
        },
        {
            'destination': 'Shogran',
            'area_of_interest': 'Scenic & Leisure',
            'hotel': 'Serena Shogran',
            'restaurants': ['Shogran Café', 'Green View Restaurant', 'Snow View Eatery'],
            'attractions': ['Shogran Park', 'Aldara Peak', 'Patriata Cable Car']
        },
        {
            'destination': 'Siri Paye',
            'area_of_interest': 'Adventure & Nature',
            'hotel': 'Local Campsite',
            'restaurants': ['Campfire BBQ', 'Mountain Hut Café'],
            'attractions': ['Siri Paye Trek', 'Lulusar Lake', 'Babusar Pass']
        },
        {
            'destination': 'Astola Island',
            'area_of_interest': 'Beach & Nature',
            'hotel': 'Local Resort',
            'restaurants': ['Beachside Shack', 'Seafood Delight'],
            'attractions': ['Astola Beach', 'Snorkeling', 'Wildlife Exploration']
        },
        {
            'destination': 'Shandur Pass',
            'area_of_interest': 'Adventure & Culture',
            'hotel': 'Shandur Inn',
            'restaurants': ['Shandur Café', 'Highland Restaurant'],
            'attractions': ['Shandur Polo Festival', 'Hiking Trails', 'Local Villages']
        },
        {
            'destination': 'Passu',
            'area_of_interest': 'Scenic & Adventure',
            'hotel': 'Passu Meadows',
            'restaurants': ['Passu Café', 'Mountain View Restaurant'],
            'attractions': ['Passu Cones', 'Hopper Glacier', 'Hachikot Glacier']
        },
        {
            'destination': 'Lahore',
            'area_of_interest': 'Cultural & Culinary',
            'hotel': 'Lahore Residency',
            'restaurants': ['Food Street BBQ', 'Tabaq Restaurant'],
            'attractions': ['Minar-e-Pakistan', 'Lahore Museum']
        },
        {
            'destination': 'Margalla Hills',
            'area_of_interest': 'Nature & Hiking',
            'hotel': 'Local Guest House',
            'restaurants': ['Hilltop Café', 'Trailside Restaurant'],
            'attractions': ['Margalla Hills National Park', 'Rawal Lake', 'Hiking Trails']
        },
        {
            'destination': 'Malakand',
            'area_of_interest': 'Adventure & Nature',
            'hotel': 'Malakand Resort',
            'restaurants': ['Malakand Café', 'Hill View Restaurant'],
            'attractions': ['Malakand Pass', 'Hiking Trails', 'Local Waterfalls']
        },
        {
            'destination': 'Ziarat',
            'area_of_interest': 'Nature & Historical',
            'hotel': 'Ziarat Residency',
            'restaurants': ['Ziarat Café', 'Mountain View Eatery'],
            'attractions': ['Quaid-e-Azam Residency', 'Juniper Forest']
        },
        {
            'destination': 'Noor Mahal',
            'area_of_interest': 'Historical & Cultural',
            'hotel': 'Noor Mahal Hotel',
            'restaurants': ['Noor Mahal Restaurant', 'Heritage Café'],
            'attractions': ['Noor Mahal', 'Derawar Fort']
        },
        {
            'destination': 'Bhurban',
            'area_of_interest': 'Scenic & Leisure',
            'hotel': 'Bhurban Resort',
            'restaurants': ['Bhurban Café', 'Snow View Restaurant'],
            'attractions': ['Bhurban Park', 'Local Hiking Trails']
        },
        {
            'destination': 'Saidu Sharif',
            'area_of_interest': 'Scenic & Cultural',
            'hotel': 'Serena Saidu Sharif',
            'restaurants': ['Fizagat Park Café', 'Mingora Bistro'],
            'attractions': ['Fizagat Park', 'Mingora', 'Saidu Sharif Museum']
        }
    ]

    # Step 2: Create the Itineraries DataFrame
    itineraries_df = pd.DataFrame(itineraries_data)
    
    # Define file paths (Update these paths as per your local setup)
  
    paths = {
    "Cleaned_attr": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\cleaned_data\\Cleaned_attr.csv",
    "clean_hotel_data": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\cleaned_data\\clean_hotel_data.json",
    "Cleaned_Airbnb": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\cleaned_data\\Cleaned_Airbnb.csv",
    "Cleaned_busses": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\cleaned_data\\Cleaned_busses.csv",
    "Cleaned_Cars": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\cleaned_data\\Cleaned_Cars.csv",
    "Cleaned_trains": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\cleaned_data\\Cleaned_trains.csv",
    "hotel_reviews": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\cleaned_data\\clean_hotel_review_data.json",
    "restaurant_data": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\new_restaurant_db.restaurants_data.json",
    "restaurant_reviews": "C:\\Users\\DELL\\OneDrive\\Documents\\GitHub\\Voyaige\\Dataset\\new_restaurant_db.restaurants_reviews.json"
}

    # Prepare data when the Flask app starts
    data_prepared = prepare_data()

@app.route('/')
def home():
    return "Welcome to the Flask App (FORM-BASED)!"

if __name__ == "__main__":
    app.run(port=5002)
