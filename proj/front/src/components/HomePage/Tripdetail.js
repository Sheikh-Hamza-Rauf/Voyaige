import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Tripdetail.css';
import Navbar from '../NavBar/Navbar';

const TripDetails = () => {
  const location = useLocation();
  const { cityData, tripTitle, tripImage } = location.state || {};
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Split array based on days
  const splitDataByDays = (items, days) => {
    const itemsPerDay = Math.ceil(items.length / days);
    return Array.from({ length: days }, (_, i) =>
      items.slice(i * itemsPerDay, (i + 1) * itemsPerDay)
    );
  };

  return (
    <div className="trip-details">
      <Navbar />
      {tripImage && (
        <div className="trip-image-container">
          <img src={tripImage} alt={tripTitle} className="trip-image" />
        </div>
      )}
      {tripTitle && <h1 className="trip-title">{tripTitle}</h1>}

      {cityData?.map((city, index) => {
        const splitRestaurants = splitDataByDays(city.restaurants || [], city.days);
        const splitAttractions = splitDataByDays(city.attractions || [], city.days);

        return (
          <div className="city-section" key={index}>
            <h2 className="city-name">{city.days} Days in {city.cityName}</h2>
            
            {Array.from({ length: city.days }, (_, dayIndex) => (
              <div key={dayIndex} className="day-section">
                <h3>Day {dayIndex + 1}</h3>
                
                {/* Restaurants for this day */}
                <h4>Restaurants</h4>
                <div className="list-container">{splitRestaurants[dayIndex]?.map((restaurant, idx) => (
                    <div
                      key={idx}
                      className="list-item"
                      onMouseEnter={() => setHoveredItem(restaurant)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span>{restaurant.name}</span>
                      {hoveredItem === restaurant && (
                        <div className="hover-card">
                          <img src={restaurant.image} alt={restaurant.name} />
                          <div className="hover-card-content">
                            <h4>{restaurant.name}</h4>
                            {restaurant.address && <p>{restaurant.address}</p>} {/* Display restaurant address */}
                            {restaurant.description && <p>{restaurant.description}</p>}
                            <p>⭐ {restaurant.rating} ({restaurant.reviews} reviews)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                
                {/* Attractions for this day */}
                <h4>Attractions</h4>
                <div className="list-container">
                  {splitAttractions[dayIndex]?.map((attraction, idx) => (
                    <div
                      key={idx}
                      className="list-item"
                      onMouseEnter={() => setHoveredItem(attraction)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span>{attraction.name}</span>
                      {hoveredItem === attraction && (
                        <div className="hover-card">
                          <img src={attraction.image} alt={attraction.name} />
                          <div className="hover-card-content">
                            <h4>{attraction.name}</h4>
                            {attraction.description && <p>{attraction.description}</p>}
                            <p>⭐ {attraction.rating} ({attraction.reviews} reviews)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Hotels (Only listed once) */}
            <h3>Hotels</h3>
            <div className="list-container">
              {city.hotels?.map((hotel, idx) => (
                <div
                  key={idx}
                  className="list-item"
                  onMouseEnter={() => setHoveredItem(hotel)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="hotel-name">{hotel.name}</span>
                  <span className="hotel-price">{hotel.price || "N/A"}</span>
                  {hoveredItem === hotel && (
                    <div className="hover-card">
                      <img src={hotel.image} alt={hotel.name} />
                      <div className="hover-card-content">
                        <h4>{hotel.name}</h4>
                        {hotel.address && <p>{hotel.address}</p>}
                        {hotel.description && <p>{hotel.description}</p>}
                        <p>⭐ {hotel.rating} ({hotel.reviews} reviews)</p>
                        {hotel.price && <p>💰 {hotel.price}</p>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <button className="booking">BOOK NOW</button>
    </div>
  );
};

export default TripDetails;
