import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import transportImg from "./images/transport.png";
import hotelImg from "./images/hotel.jpg";
import airbnbImg from "./images/airbnb.jpg";
import "./BookingOptions.css";
import { FaEdit } from "react-icons/fa";

const BookingOptions = () => {
  // State for selected hotel and transport (load from localStorage)
  const [selectedHotel, setSelectedHotel] = useState(
    JSON.parse(localStorage.getItem("selectedHotel")) || null
  );
  const [selectedTransport, setSelectedTransport] = useState(
    JSON.parse(localStorage.getItem("selectedTransport")) || null
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { tripDetails, dayIndex, dayData } = location.state || {};

  // Handle editing the hotel selection
  const handleEditHotel = () => {
    navigate("/BookHotel");
  };

  // Confirm Booking and Send Data Back to UserCustomization
  const handleConfirmBooking = () => {
    const updatedDayData = {
      ...dayData,
      transport: selectedTransport,
      accommodation: selectedHotel,
      cost: calculateTotalPrice(),
    };

    const bookingData = {
      selectedHotel,
      selectedTransport,
      totalPrice: calculateTotalPrice(),
      tripDetails,
      dayIndex,
      updatedDayData,
    };

    // Navigate back to UserCustomization with all booking data
    navigate("/UserCustomization", { state: { bookingData } });
  };

  // Update localStorage whenever hotel or transport is selected
  useEffect(() => {
    if (selectedHotel) {
      localStorage.setItem("selectedHotel", JSON.stringify(selectedHotel));
    }
    if (selectedTransport) {
      localStorage.setItem("selectedTransport", JSON.stringify(selectedTransport));
    }
  }, [selectedHotel, selectedTransport]);

  // Calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (selectedHotel?.price) totalPrice += parseFloat(selectedHotel.price) || 0;
    if (selectedTransport?.price) totalPrice += parseFloat(selectedTransport.price) || 0;
    return totalPrice;
  };

  return (
    <div className="container">
      <Navbar />

      {/* Back Arrow Icon */}
      <div className="back-arrow" onClick={() => navigate("/UserCustomization")}>
        ←
      </div>

      {/* Centered Heading */}
      <div className="center-heading">
      </div>

      {/* Booking Options */}
      <div className="booking-options">
        <div className="option-card">
          <h3>1. Customize Transport</h3>
          <img src={transportImg} alt="Transport" />
          {selectedTransport ? (
            <div className="booked-transport">
              <p><strong>Transport Selected:</strong> {selectedTransport.name || selectedTransport.car_name || selectedTransport.bus_name || selectedTransport.train_name}</p>
              <p>Departure: {selectedTransport.departure_time || "N/A"}</p>
              <p>Price: {selectedTransport.price ? `${selectedTransport.price} PKR` : "Price Not Available"}</p>
              <button className="edit-btn" onClick={() => navigate("/BookTransport")}>
                <FaEdit /> Edit
              </button>
            </div>
          ) : (
            <Link to="/BookTransport" className="explore-btn">
              Explore
            </Link>
          )}
        </div>

        <div className="option-card">
          <h3>2. Book a Hotel</h3>
          <img src={hotelImg} alt="Hotel" />
          {selectedHotel ? (
            <div className="booked-hotel">
              <p><strong>Hotel Booked:</strong> {selectedHotel.name}</p>
              <p>Rating: {selectedHotel.rating} / 5</p>
              <p>Price: {selectedHotel.price} Rs per night</p>
              <p>Status: <span style={{ color: "green" }}>✔</span> Booked</p>
              <button className="edit-btn" onClick={handleEditHotel}>
                <FaEdit /> Edit
              </button>
            </div>
          ) : (
            <Link to="/BookHotel" className="explore-btn">
              Explore
            </Link>
          )}
        </div>

        <div className="option-card">
          <h3>3. Book an Airbnb</h3>
          <img src={airbnbImg} alt="Airbnb" />
          <Link to="/BookAirbnb" className="explore-btn">
            Explore
          </Link>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="confirm-btn-container">
        <button className="confirm-btn" onClick={handleConfirmBooking}>
          Confirm: {calculateTotalPrice()} PKR ➔
        </button>
      </div>
    </div>
  );
};

export default BookingOptions;
