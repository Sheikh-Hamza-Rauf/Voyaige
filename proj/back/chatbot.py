import re
import os
import pandas as pd
import random
import numpy as np
import torch
import json
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.llms import HuggingFacePipeline
from sklearn.metrics.pairwise import cosine_similarity
from transformers import GPT2Tokenizer, GPT2LMHeadModel
from flask import Flask, request, jsonify
import re
from flask_cors import CORS
from flask_cors import cross_origin
import logging

app = Flask(__name__)
#CORS(app)
CORS(app, resources={r"/MiloChatbot": {"origins": "http://localhost:3000"}})


def load_data(file_path, file_type='csv'):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return None
    try:
        if file_type == 'csv':
            return pd.read_csv(file_path)
        elif file_type == 'json':
            return pd.read_json(file_path)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return None

hotel_df = load_data('./chatbot/Cleaned/new_hotel_data.csv')
ratings_df = load_data('./chatbot/Cleaned/clean_hotel_review_data.json', 'json')
restaurant_df = load_data('./chatbot/Cleaned/new_restaurant_db.restaurants_data.json', 'json')
attraction_df = load_data('./chatbot/Cleaned/Cleaned_attr.csv')
airbnb_df = load_data('./chatbot/Cleaned/Cleaned_Airbnb.csv')
busses_df = load_data('./chatbot/Cleaned/Cleaned_busses.csv')
cars_df = load_data('./chatbot/Cleaned/Cleaned_Cars.csv')
trains_df = load_data('./chatbot/Cleaned/Cleaned_trains.csv')

# Merge hotel/restaurant data with ratings
merged_df = hotel_df.merge(ratings_df, on='hotel_id', how='left')
average_ratings = merged_df.groupby('hotel_id')['rating'].mean().reset_index()
average_ratings.columns = ['hotel_id', 'average_rating']
hotel_df = hotel_df.merge(average_ratings, on='hotel_id', how='left')
hotel_df.rename(columns={'average_rating': 'Rating'}, inplace=True)
restaurant_ratings_df = load_data('./chatbot/Cleaned/new_restaurant_db.restaurants_reviews.json', 'json')
restaurant_merged_df = restaurant_df.merge(restaurant_ratings_df, on='restaurant_id', how='left')
average_restaurant_ratings = restaurant_merged_df.groupby('restaurant_id')['rating'].mean().reset_index()
average_restaurant_ratings.columns = ['restaurant_id', 'average_restaurant_ratings']
restaurant_df = restaurant_df.merge(average_restaurant_ratings, on='restaurant_id', how='left')
restaurant_df.rename(columns={'average_restaurant_ratings': 'Rating'}, inplace=True)
restaurant_df['Rating'] = restaurant_df['Rating'].fillna(3.5)

# Generate descriptions 
def preprocess_hotel_data(row):
    return f"{row['name']} located at {row['address']} in {row['city']}, costs Rs{row['price']} per night. Description: {row['about']}."
hotel_df['description'] = hotel_df.apply(preprocess_hotel_data, axis=1)

def preprocess_restaurant_data(row):
    return f"{row['name']} located at {row['address']} with phone {row['phone_number']} in {row['city']}."
restaurant_df['description'] = restaurant_df.apply(preprocess_restaurant_data, axis=1)

def preprocess_attraction_data(row):
    return f"{row['name']} located at {row['address']} in {row['city']}. Category: {row['category']}. Rating: {row['rating']}."
attraction_df['description'] = attraction_df.apply(preprocess_attraction_data, axis=1)

def preprocess_airbnb_data(row):
    return f"{row['name']} located at {row['address']}. Price per night is Rs{row['pricing_rate_amount']}."
airbnb_df['description'] = airbnb_df.apply(preprocess_airbnb_data, axis=1)

def preprocess_buses_data(row):
    return f"{row['name']} departing from {row['starting']} to {row['ending']} at {row['departure_time']}."
busses_df['description'] = busses_df.apply(preprocess_buses_data, axis=1)

def preprocess_car_data(row):
    return f"{row['brand_name']} {row['car_name']} for {row['price_per_day']} per day."
cars_df['description'] = cars_df.apply(preprocess_car_data, axis=1)

def preprocess_train_data(row):
    return f"{row['name']} departing from {row['starting']} to {row['ending']} at {row['departure_time']}."
trains_df['description'] = trains_df.apply(preprocess_train_data, axis=1)

# Enhanced Dictionary for amenities
amenities_data = {
    "hotel": hotel_df.set_index('name')['description'].to_dict(),
    "restaurant": restaurant_df.set_index('name')['description'].to_dict(),
    "attraction": attraction_df.set_index('name')['description'].to_dict(),
    "airbnb": airbnb_df.set_index('name')['description'].to_dict(),
    "bus": busses_df.set_index('name')['description'].to_dict(),
    "car": cars_df.set_index('car_name')['description'].to_dict(),
    "train": trains_df.set_index('name')['description'].to_dict()
}

amenities_data
ratings_df = pd.read_csv('./chatbot/Cleaned/ratings.csv')

# Load embeddings from the specified files
hotel_embeddings = np.load('./chatbot/Embeddings/hotel_embeddings.npy')
restaurant_embeddings = np.load('./chatbot/Embeddings/restaurant_embeddings.npy')
attraction_embeddings = np.load('./chatbot/Embeddings/attr_embeddings.npy')
airbnb_embeddings = np.load('./chatbot/Embeddings/airbnb_embeddings.npy')
bus_embeddings = np.load('./chatbot/Embeddings/buses_embeddings.npy')
car_embeddings = np.load('./chatbot/Embeddings/cars_embeddings.npy')
train_embeddings = np.load('./chatbot/Embeddings/trains_embeddings.npy')

hotel_names = np.load('./chatbot/Names/hotel_names.npy', allow_pickle=True)
restaurant_names = np.load('./chatbot/Names/restaurant_names.npy', allow_pickle=True)
attraction_names = np.load('./chatbot/Names/attraction_names.npy', allow_pickle=True)
airbnb_names = np.load('./chatbot/Names/airbnb_names.npy', allow_pickle=True)
car_names = np.load('./chatbot/Names/car_names.npy', allow_pickle=True)
bus_names = np.load('./chatbot/Names/bus_names.npy', allow_pickle=True)
train_names = np.load('./chatbot/Names/train_names.npy', allow_pickle=True)

model_name = "fine_tuned_gpt1_1"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, max_length=100)
llm = HuggingFacePipeline(pipeline=pipe)

# Load model and tokenizer during app startup
preloaded_model = AutoModelForCausalLM.from_pretrained(model_name)  # Replace with your model loader
preloaded_tokenizer = AutoTokenizer.from_pretrained(model_name)  # Replace with your tokenizer loader

# Updated prompt to enhance coherence
prompt_template = PromptTemplate(input_variables=["query"], template="Respond to this travel-related question: {query}")
langchain_pipeline = LLMChain(prompt=prompt_template, llm=llm)

# Finding the top similarities 
def find_top_similarities(embedding_matrix, names, query_embedding, top_n=1):
    similarities = cosine_similarity(query_embedding, embedding_matrix)
    top_indices = similarities.argsort()[0][-top_n:][::-1]
    return [names[idx] for idx in top_indices]

# Checking for car names
def validate_car_name(car_name):
    car_name_lower = car_name.lower()
    for name in car_names:
        if car_name_lower in name.lower():
            return name
    return None

# Parsing User Input
def parse_user_input(user_input):
    # List of supported cities
    supported_cities = {
        "kashmir", "murree", "islamabad", "lahore", "karachi", "hunza", 
        "skardu", "chitral", "gilgit", "multan", "abbottabad", "quetta", 
        "naran", "batakundi", "peshawar", "faisalabad"
    }
    
    # Initialize values
    starting_city, destination_city, transport, days, budget = None, None, None, None, None

    # Detect city-to-city trip in user input
    match = re.search(r'plan a trip from (\w+) to (\w+)', user_input.lower())
    if match:
        starting_city, destination_city = match.groups()
        if starting_city not in supported_cities or destination_city not in supported_cities:
            return "One or both of the specified cities are not supported. Please choose from the supported cities."
    
    # If city-to-city trip is not specified, detect single city
    if not destination_city:
        destination_city = next((c for c in supported_cities if c in user_input.lower()), None)
        if destination_city is None:
            return "City information is not available. Please choose from supported cities."

    # Detect transport mode in user input
    if "bus" in user_input.lower():
        transport = "bus"
    elif "car" in user_input.lower():
        transport = "car"
    elif "train" in user_input.lower():
        transport = "train"

    # Detect number of days in user input
    days_match = re.search(r'(\d+)\s*(days|day)', user_input.lower())
    if days_match:
        days = int(days_match.group(1))

    # Detect budget in user input
    budget_match = re.search(r'budget of (\d+)', user_input.lower())
    if budget_match:
        budget = int(budget_match.group(1))

    return starting_city, destination_city, transport, days, budget

# Validate user input
def validate_user_query(user_input):
    return any(word in user_input for word in ["plan", "travel", "trip", "itinerary", "tell me", "what", "where"])

# Helper function to randomize cost based on type of item (hotel, restaurant, attraction)
def get_randomized_cost(info, category):
    # Check for price in the description and strip it out if exists
    if isinstance(info, dict) and 'description' in info:
        # Try to find a price in the description
        price_match = re.search(r'(\d+[\.,]?\d*)\s*(Rs|USD|PKR)', info['description'])
        if price_match:
            # Extract and return the price as a float
            return float(price_match.group(1).replace(',', ''))
    
    # If no price is found in the description, generate a reasonable default price
    if category == "hotel":
        return random.randint(3000, 15000)  # Reasonable range for hotels/Airbnbs
    elif category == "restaurant":
        return random.randint(500, 3500)  # Price range per person for restaurants
    elif category == "attraction":
        return random.randint(500, 2500)  # Price range for attractions
    elif category == "bus":
        return random.randint(500, 3000)  # Reasonable bus fare range
    elif category == "car":
        return random.randint(3000, 7000)  # Price range for car rental per day
    elif category == "train":
        return random.randint(1000, 5000)  # Price range for train tickets
    
    return 1000  # Default value if no category matches

MIN_BUDGET_PER_DAY = 7500

def generate_itinerary(user_input, starting_city, destination_city, days, mode_of_transport, budget=None):
    try:
        response_messages = []

        # Validate inputs
        if not starting_city or not destination_city:
            return {"status": "error", "messages": ["Starting and destination cities are required."]}

        if days > 7:
            return {"status": "error", "messages": ["Sorry, the trip duration cannot exceed 7 days."]}

        min_budget = days * MIN_BUDGET_PER_DAY
        if budget is not None and budget < min_budget:
            return {"status": "error", "messages": [f"Sorry, the minimum budget for a {days}-day trip is Rs{min_budget}. Please increase your budget."]}

        # Initialize total cost
        total_cost = 0
        response_messages.append(f"Generated Itinerary from {starting_city.title()} to {destination_city.title()} ({days} days):")
        response_messages.append("----------------------")

        # Get city-specific recommendations
        city_hotels = [name for name in hotel_names if destination_city.lower() in name.lower()]
        city_restaurants = [name for name in restaurant_names if destination_city.lower() in name.lower()]
        city_attractions = [name for name in attraction_names if destination_city.lower() in name.lower()]

        if not city_hotels or not city_restaurants or not city_attractions:
            return {"status": "error", "messages": [f"Sorry, we couldn't find enough recommendations for {destination_city}."]}

        # Generate itinerary for each day
        for day in range(1, days + 1):
            response_messages.append(f"Day {day}")

            # Transport
            if day == 1:
                if mode_of_transport in ["bus", "train"]:
                    transport = find_top_similarities(
                        bus_embeddings if mode_of_transport == "bus" else train_embeddings,
                        bus_names if mode_of_transport == "bus" else train_names,
                        model.transformer.wte(tokenizer.encode(user_input, return_tensors='pt')).mean(dim=1).detach().numpy(),
                        top_n=1
                    )[0]
                    response_messages.append(f"Transport: {mode_of_transport.title()} - {transport}")
                else:
                    response_messages.append("Transport: Car - User-selected car")
            else:
                response_messages.append("Transport: Car - Rental option")

            # Accommodation
            accommodation = random.choice(city_hotels)
            accommodation_cost = random.randint(3000, 15000)
            response_messages.append(f"Accommodation: {accommodation} - Rs{accommodation_cost}")
            total_cost += accommodation_cost

            # Attractions
            attraction = random.choice(city_attractions)
            response_messages.append(f"Attraction 1: {attraction}")
            if len(city_attractions) > 1:
                second_attraction = random.choice(city_attractions)
                while second_attraction == attraction:
                    second_attraction = random.choice(city_attractions)
                response_messages.append(f"Attraction 2: {second_attraction}")

            # Restaurants
            restaurant1 = random.choice(city_restaurants)
            restaurant1_cost = random.randint(500, 3500)
            response_messages.append(f"Restaurant 1: {restaurant1} - Rs{restaurant1_cost}")

            restaurant2 = random.choice(city_restaurants)
            while restaurant2 == restaurant1:
                restaurant2 = random.choice(city_restaurants)
            restaurant2_cost = random.randint(500, 3500)
            response_messages.append(f"Restaurant 2: {restaurant2} - Rs{restaurant2_cost}")

            daily_cost = accommodation_cost + restaurant1_cost + restaurant2_cost
            total_cost += restaurant1_cost + restaurant2_cost

            response_messages.append(f"Total cost for Day {day}: Rs{daily_cost}")
            response_messages.append("----------------------")

        # Final budget check
        if budget and total_cost > budget:
            return {
                "status": "error",
                "messages": [f"Total trip cost exceeds budget of Rs{budget}. Total cost is Rs{total_cost}."]
            }

        # Return final itinerary
        response_messages.append(f"Total Trip Cost: Rs{total_cost}")

        return {"status": "success", "messages": response_messages}  # ✅ Returns a list, not a string
    except Exception as e:
        return {"status": "error", "messages": [f"An error occurred: {str(e)}"]}


# Function to retrieve details without specifying types
def retrieve_details(user_input):
    request_phrases = [
        "tell me about", "can you give details on", "what is", "where is",
        "information on", "details about", "describe", "info on"
    ]
    
    # Check if any of the request phrases are in the user's input
    if not any(phrase in user_input.lower() for phrase in request_phrases):
        return "Please specify what you need details on (e.g., a hotel, restaurant, or attraction name)."
    
    # Search for the amenity directly in amenities_data
    for amenity_type, items in amenities_data.items():
        for name, details in items.items():
            if str(name).lower() in str(user_input).lower():
                return details

    # If no valid match found
    return "Could not find details for the specified item in our data."

def retrieve_top_items(user_input, num_recommendations=5):
    # Normalize the input (case insensitive)
    user_input = user_input.strip().lower()

    # Define the set of supported cities
    supported_cities = {
        "kashmir", "murree", "islamabad", "lahore", "karachi", "hunza", 
        "skardu", "chitral", "gilgit", "multan", "abbottabad", "quetta", 
        "naran", "batakundi", "peshawar", "faisalabad"
    }

    # Determine category based on the input
    if "hotel" in user_input or "hotels" in user_input:
        category = "hotel"
    elif "restaurant" in user_input or "restaurants" in user_input:
        category = "restaurant"
    elif "attraction" in user_input or "attractions" in user_input:
        category = "attraction"
    elif "airbnb" in user_input or "airbnbs" in user_input:
        category = "airbnb"
    else:
        return "Please specify what type of top information you need (e.g., 'hotels', 'restaurants', 'attractions', 'Airbnbs')."

    # Extract city if present in the user input
    city_name = None
    for city in supported_cities:
        if city in user_input:
            city_name = city
            break  # Stop once we find a match

    # Check if the category exists in the dataset
    if category not in amenities_data.keys():
        return f"Sorry, we do not have data for {category}s."

    # Access the relevant category data from amenities_data
    category_data = amenities_data[category]

    # Filter and find the relevant data
    filtered_data = {}

    # Loop through the category data
    for name, description in category_data.items():
        description_lower = description.lower()

        # Check if the city is part of the description (if city is specified)
        if city_name and city_name.lower() not in description_lower:
            continue  # Skip if the city name is not in the description

        # Add the data to the filtered results
        filtered_data[name] = description

    # If no matching data found
    if not filtered_data:
        return f"Sorry, we couldn't find {category} recommendations for {city_name.title() if city_name else 'your query'}."

    # Sort and take top items based on name (you could add ratings here if available)
    sorted_items = sorted(filtered_data.items(), key=lambda item: item[0].lower(), reverse=True)
    top_items = sorted_items[:num_recommendations]

    # Format the output
    city_part = f" in {city_name.title()}" if city_name else ""
    result = [f"The top {category.title()}s{city_part}:"]

    for i, (name, description) in enumerate(top_items, start=1):
        result.append(f"\t{i}. {name} - {description}")

    return "\n".join(result)

def compare_two_options(user_input):
    # Normalize the input (lowercase and strip spaces)
    user_input = user_input.strip().lower()

    # Extract category and options using regex
    match = re.search(r"compare\s+([a-z]+)\s+([\w\s]+)\s+and\s+([\w\s]+)", user_input)

    if not match:
        return "Please specify two options to compare (e.g., 'compare hotel Yasir Broast Hotel and Windmills Hotel')."

    # Extract category and options from the match groups
    category = match.group(1).lower()
    option1 = match.group(2).strip().lower()  # Normalize options
    option2 = match.group(3).strip().lower()  # Normalize options

    # Validate category
    if category not in amenities_data:
        return f"Sorry, we do not have data for {category}s."

    # Check if both options exist in the specified category (case-insensitive)
    category_data = amenities_data[category]
    option1 = next((key for key in category_data if key.lower() == option1), None)
    option2 = next((key for key in category_data if key.lower() == option2), None)

    if not option1 or not option2:
        return f"Sorry, we couldn't find both {category} options you specified."

    # Get details for both options
    option1_details = category_data[option1]
    option2_details = category_data[option2]

    # Format the comparison output
    result = f"Comparing {option1} and {option2}:\n"
    result += f"\n{option1.capitalize()}: {option1_details}\n"
    result += f"\n{option2.capitalize()}: {option2_details}\n"

    return result

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/generate-itinerary', methods=['POST'])
def generate_itinerary_endpoint():
    data = request.json
    result = generate_itinerary(
        user_input=data.get('user_input', ''),
        starting_city=data.get('starting_city', ''),
        destination_city=data.get('destination_city', ''),
        days=data.get('days', 0),
        mode_of_transport=data.get('mode_of_transport', ''),
        budget=data.get('budget', None)
    )

    print("Backend Response:", json.dumps(result, indent=2))  # Debugging

    return jsonify(result) 

@app.route('/retrieve-details', methods=['POST'])
def retrieve_details_endpoint():
    data = request.json
    user_input = data.get('user_input')
    result = retrieve_details(user_input)
    return jsonify({"result": result})


@app.route('/retrieve-top-items', methods=['POST'])
def retrieve_top_items_endpoint():
    data = request.json
    user_input = data.get('user_input')
    num_recommendations = data.get('num_recommendations', 5)  
    result = retrieve_top_items(user_input, num_recommendations)
    return jsonify({"result": result})

@app.route('/compare-two-options', methods=['POST'])
def compare_two_options_endpoint():
    data = request.json
    user_input = data.get('user_input')
    result = compare_two_options(user_input)
    return jsonify({"result": result})

@app.route('/MiloChatbot', methods=['POST'])
@cross_origin()
def milo():
    user_input = request.json.get('user_input', '').strip().lower()
    
    if not user_input:
        return jsonify({"response": "Invalid input. Please provide more details."}), 400
    
    logging.basicConfig(level=logging.INFO)
    logging.info(f"User input: {user_input}")

    if user_input in ["exit", "quit", "goodbye", "bye"]:
        return jsonify({"response": "Goodbye! Have a safe trip!"})
    
    ## Finding the top results 
    elif "top" in user_input or "best" in user_input:
        match = re.search(r"(top|best)\s+(\d+)?\s*(hotels|restaurants|attractions|airbnb)\s+in\s+([\w\s]+)", user_input)
        
        if not match:
            return jsonify({"response": "Please specify what type of top information you need (e.g., 'top 5 hotels in Lahore')."})
        
        num_recommendations = int(match.group(2)) if match.group(2) else 5
        category = match.group(3).lower()
        city_name = match.group(4).strip().lower() if match.group(4) else None
        
        response = retrieve_top_items(user_input, num_recommendations)
        return jsonify({"response": response})
    
    ## Retrieving information about something
    elif any(phrase in user_input for phrase in ["tell me about", "can you give details on", "what is", "where is", "information on", "details about", "describe", "info on"]):
        try:
            response = retrieve_details(user_input)
            return jsonify({"response": response})
        except Exception as e:
            logging.error(f"Error in retrieve_details: {e}")
            return jsonify({"response": "Sorry, something went wrong while fetching the details. Please try again later."}), 500
    
    ## Generating an itinerary

    elif "plan a trip" in user_input or "plan from" in user_input or "generate an itinerary" in user_input or "give possible trip for" in user_input or "generate itinerary" in user_input:
        parsed_input = parse_user_input(user_input)
        if isinstance(parsed_input, str):
            return jsonify({"response": parsed_input})  # Error message from parsing
        
        start, dest, transport, days, budget = parsed_input
        
        if not start:
            start = request.json.get('start', '').strip().lower()
        if not dest:
            dest = request.json.get('dest', '').strip().lower()
        if not days:
            days = int(request.json.get('days', 0))
        if not transport:
            transport = request.json.get('transport', '').strip().lower()
        if not budget:
            budget_input = request.json.get('budget_input', 'no').strip().lower()
            if budget_input == "yes":
                budget = int(request.json.get('budget', 0))

        itinerary = generate_itinerary(user_input, start, dest, days, transport, budget=None)
        return jsonify({"response": itinerary})

    ## Comparing two things together
    elif "compare" in user_input:
        response = compare_two_options(user_input)
        return jsonify({"response": response})
    
    else:
        return jsonify({"response": "I'm here to help! You can ask about details on accommodations, restaurants, attractions, or plan/update your itinerary."})

    
@app.route('/')
def home():
    return "Welcome to the Flask App!"

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)