import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import NavBar from "../NavBar/Navbar";
import "./Restaurants.css";

const restaurantImages = [
  require("./restaurant.jpg"),
  require("./restaurant1.jpg"),
  require("./restaurant2.jpg"),
  require("./restaurant3.jpg"),
  require("./restaurant4.jpg"),
  require("./restaurant5.jpg"),
  require("./restaurant6.jpg"),
  require("./restaurant7.jpg"),
  require("./restaurant8.jpg"),
  require("./restaurant9.jpg"),
  require("./restaurant10.jpg"),
  require("./restaurant11.jpg")
];

const getRandomImage = () => restaurantImages[Math.floor(Math.random() * restaurantImages.length)];

const Restaurants = () => {
  const [restaurantsByCity, setRestaurantsByCity] = useState({});
  const scrollRefs = useRef({}); // Store refs for each city's scrollable row

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/cleaned_restaurants.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log("Raw CSV Data:", result.data); // Debugging

            if (result.data.length === 0) {
              console.error("No data found in CSV!");
              return;
            }

            console.log("CSV Headers:", Object.keys(result.data[0])); // Check column names

            const enrichedRestaurants = result.data.map((restaurant) => ({
              city: restaurant.City || "Unknown City",
              id: restaurant["Restaurant ID"] || Math.random(),
              name: restaurant.Name || "Unknown Restaurant",
              rating: parseFloat(restaurant["Average Rating"]) || "N/A",
              phone: restaurant["Phone Number"] || "N/A",
              hours: restaurant["Open Hours"] || "Not Available",
              services: restaurant["Service Options"] || "Not Available",
              image: getRandomImage(),
            }));

            const groupedRestaurants = enrichedRestaurants.reduce((acc, restaurant) => {
              if (!acc[restaurant.city]) acc[restaurant.city] = [];
              acc[restaurant.city].push(restaurant);
              return acc;
            }, {});

            Object.keys(groupedRestaurants).forEach((city) => {
              groupedRestaurants[city] = groupedRestaurants[city]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 10);
            });

            setRestaurantsByCity(groupedRestaurants);
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  const scroll = (city, direction) => {
    if (scrollRefs.current[city]) {
      const scrollAmount = 320; // Adjust based on card width + gap
      scrollRefs.current[city].scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="restaurants-container">
      <NavBar />
      {Object.entries(restaurantsByCity).map(([city, restaurants]) => (
        <div key={city} className="city-section">
          <h2 className="city-heading">Restaurants in {city}</h2>
          <div className="scroll-container">
            <button className="scroll-btn left" onClick={() => scroll(city, "left")}>←</button>

            <div className="restaurants-row" ref={(el) => (scrollRefs.current[city] = el)}>
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card">
                  <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                  <h3>{restaurant.name}</h3>
                  <p>⭐ <strong>{restaurant.rating}</strong></p>
                  <p>📍 <strong>Location:</strong> {city}</p>
                  <p>📞 <strong>Contact:</strong> {restaurant.phone}</p>
                  <p>🕒 <strong>Hours:</strong> {restaurant.hours}</p>
                  <p>🍽️ <strong>Services:</strong> {restaurant.services}</p>
                </div>
              ))}
            </div>

            <button className="scroll-btn right" onClick={() => scroll(city, "right")}>→</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
