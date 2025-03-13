import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import hotelData from "./clean_hotel_data.json";
import "./Hotels.css";
import NavBar from "../NavBar/Navbar";

const hotelImages = [
  require("./hotel.jpg"),
  require("./hotel1.jpg"),
  require("./hotel2.jpg"),
  require("./hotel3.jpg"),
  require("./hotel4.jpg"),
  require("./hotel5.jpeg"),
  require("./hotel6.jpg"),
  require("./hotel7.jpg"),
  require("./hotel8.jpeg"),
  require("./hotel9.jpg"),
  require("./hotel10.jpg"),
  require("./hotel11.jpeg"),
  require("./hotel12.jpg"),
  require("./hotel13.jpg"),
  require("./hotel14.jpg"),
  require("./hotel15.jpeg"),
];

const getRandomImage = () => hotelImages[Math.floor(Math.random() * hotelImages.length)];
const getRandomRating = () => (3.5 + Math.random() * Math.random() * 1.5).toFixed(1);

const Hotels = () => {
  const [hotelsByCity, setHotelsByCity] = useState({});
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetch("./ratings.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const ratingsMap = {};
            result.data.forEach(({ name, rating, category }) => {
              ratingsMap[name] = { rating: parseFloat(rating), category };
            });
            setRatings(ratingsMap);
          },
        });
      });
  }, []);

  useEffect(() => {
    if (Object.keys(ratings).length === 0) return;

    const enrichedHotels = hotelData.map((hotel) => ({
      ...hotel,
      rating: ratings[hotel.name]?.rating || getRandomRating(),
      category: ratings[hotel.name]?.category || hotel.category,
    }));

    const groupedHotels = enrichedHotels.reduce((acc, hotel) => {
      const { city } = hotel;
      if (!acc[city]) acc[city] = [];
      acc[city].push(hotel);
      return acc;
    }, {});

    Object.keys(groupedHotels).forEach((city) => {
      groupedHotels[city] = groupedHotels[city]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);
    });

    setHotelsByCity(groupedHotels);
  }, [ratings]);

  const scroll = (id, direction) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <div className="hotels-container">
      <NavBar />
      {Object.entries(hotelsByCity).map(([city, hotels]) => (
        <div key={city} className="city-section">
          <h2 className="city-title">Hotels in {city}</h2>
          <div className="scroll-container">
            <button className="scroll-btn left" onClick={() => scroll(city, "left")}>←</button>
            <div className="hotels-row" id={city}>
              {hotels.map((hotel) => (
                <div key={hotel.id} className="hotel-card">
                  <img src={getRandomImage()} alt={hotel.name} className="hotel-image" />
                  <h3>{hotel.name}</h3>
                  <p>⭐ {hotel.rating} ({hotel.category})</p>
                  <p>📍<strong>Location:</strong> {hotel.city}, {hotel.state || hotel.country}</p>
                  <p>💰<strong>Price:</strong> {hotel.price || "N/A"}Rs per night</p>
                  <p>🏊<strong>Facilities:</strong> {hotel.facilities?.join(", ") || "Not Available"}</p>
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

export default Hotels;