import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hotelData from "./images/clean_hotel_data.json";
import "./BookHotel.css";
import defaultImage from "./images/hotel.jpg";
import Navbar from "../NavBar/Navbar";

const ConfirmationModal = ({ hotel, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <h2>Confirm Booking</h2>
        <p>Are you sure you want to book <strong>{hotel.name}</strong>?</p>
        <p><strong>Price:</strong> {hotel.price} Rs per night</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes, Book Now</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const BookHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [filter, setFilter] = useState({ name: "", price: "", city: "", sort: "rating" });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hotelsWithRatings = hotelData.map((hotel) => ({
      ...hotel,
      rating: (Math.random() * (5 - 3.5) + 3).toFixed(1),
    }));
    setHotels(hotelsWithRatings);
  }, []);

  const filteredHotels = hotels
    .filter(hotel =>
      (filter.name ? hotel.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      (filter.city ? hotel.city.toLowerCase().includes(filter.city.toLowerCase()) : true) &&
      (filter.price ? hotel.price <= filter.price : true)
    )
    .sort((a, b) => (filter.sort === "price" ? b.price - a.price : b.rating - a.rating));

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleClosePopUp = () => {
    setSelectedHotel(null);
  };

  const handleBooking = () => {
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    localStorage.setItem("selectedHotel", JSON.stringify(selectedHotel));
    setShowConfirmation(false);
    navigate("/BookingOptions");
  };

  return (
    <div className="book-hotel-container">
      <Navbar />
      <div className="back-arrow" onClick={() => navigate("/BookingOptions")}>←</div>

      <div className="trans">
        <h2>Book a Hotel</h2>

        <div className="filters">
          <input type="text" placeholder="Hotel Name" value={filter.name} onChange={(e) => setFilter({ ...filter, name: e.target.value })} />
          <input type="text" placeholder="Filter by city" value={filter.city} onChange={(e) => setFilter({ ...filter, city: e.target.value })} />
          <input type="number" placeholder="Max price" value={filter.price} onChange={(e) => setFilter({ ...filter, price: e.target.value })} />
          <select value={filter.sort} onChange={(e) => setFilter({ ...filter, sort: e.target.value })}>
            <option value="rating">Sort by Rating</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        <div className="hotel-list">
          {filteredHotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id} onClick={() => handleHotelSelect(hotel)}>
              <img src={(hotel.images && hotel.images[0]) || defaultImage} alt={hotel.name} className="hotel-image" />
              <h3>{hotel.name}</h3>
              <p>Rating: {hotel.rating} / 5</p>
              <p>Price: {hotel.price}Rs per night</p>
              <button className="book-btn">Book</button>
            </div>
          ))}
        </div>

        {selectedHotel && (
          <div className="hotel-popup">
            <div className="popup-content">
              <button className="close-btn" onClick={handleClosePopUp}>&times;</button>
              <h2>{selectedHotel.name}</h2>
              <div className="popup-images">
                {selectedHotel.images && selectedHotel.images.slice(0, 2).map((img, index) => (
                  <img key={index} src={img || defaultImage} alt={`Hotel ${index + 1}`} className="popup-image" />
                ))}
              </div>
              <p><strong>About:</strong> {selectedHotel.description || "No description available"}</p>
              <p><strong>Location:</strong> {selectedHotel.city}</p>
              <p><strong>Address:</strong> {selectedHotel.address || "Not available"}</p>
              <p><strong>Price:</strong> {selectedHotel.price}Rs per night</p>
              <p><strong>Rating:</strong> {selectedHotel.rating} / 5</p>
              <p><strong>Facilities:</strong> {selectedHotel.facilities ? selectedHotel.facilities.join(", ") : "No facilities listed"}</p>
              <button className="book-btn" onClick={handleBooking}>Book Now</button>
            </div>
          </div>
        )}

        {showConfirmation && selectedHotel && (
          <ConfirmationModal
            hotel={selectedHotel}
            onConfirm={confirmBooking}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BookHotel;
