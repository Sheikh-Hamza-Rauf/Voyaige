import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import "./Restaurants.css";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Simulating fetching data from the given path
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("./new_restaurant_db.restaurants_data.json");
        const data = await response.json();

        // Selecting 5 random restaurants
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 5);

        // Assign random ratings above 4.0
        const updatedRestaurants = shuffled.map((restaurant) => ({
          ...restaurant,
          rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        }));

        setRestaurants(updatedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-10">
    <Navbar />
      <h2 className="text-3xl font-semibold text-center mb-6">Top Restaurant Picks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
            <p className="text-gray-600">{restaurant.location}</p>
            <p className="text-yellow-500 font-bold mt-2">⭐ {restaurant.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
