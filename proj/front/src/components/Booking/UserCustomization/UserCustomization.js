import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../NavBar/Navbar';
import './UserCustomization.css';

const UserCustomization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customizationData, bookingData } = location.state || {};

  const {
    startingPoint = '',
    destination = '',
    startDate = '',
    endDate = '',
    guests = 1
  } = customizationData || {};

  const [selectedStartingPoint] = useState(startingPoint);
  const [selectedDestination] = useState(destination);
  const [selectedStartDate] = useState(startDate);
  const [selectedEndDate] = useState(endDate);
  const [selectedGuests] = useState(guests);
  const [numberOfDays, setNumberOfDays] = useState(0);

  // State to store booked hotel and transport details for each day
  const [dayDetails, setDayDetails] = useState({});

  const citiesInPakistan = [
    "Islamabad", "Lahore", "Karachi", "Murree", "Peshawar",
    "Skardu", "Hunza", "Quetta", "Multan", "Faisalabad", 
    "Murree", "Kashmir", "Abbottabad", "Gilgit", "Naran",
    "Batakundi"
  ];

  // Calculate number of days for the trip
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate);
      const end = new Date(selectedEndDate);
      const timeDiff = end - start;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      setNumberOfDays(daysDiff > 0 ? daysDiff : 0);
    }
  }, [selectedStartDate, selectedEndDate]);

  // Load day details from localStorage on component mount
  useEffect(() => {
    const savedDetails = localStorage.getItem('dayDetails');
    if (savedDetails) {
      setDayDetails(JSON.parse(savedDetails));
    }
  }, []);

  // Update localStorage whenever dayDetails state changes
  useEffect(() => {
    localStorage.setItem('dayDetails', JSON.stringify(dayDetails));
  }, [dayDetails]);

  // Receive booking data and update state
  useEffect(() => {
    if (bookingData) {
      console.log("Received Booking Data:", bookingData);
      const { dayIndex, selectedHotel, selectedTransport } = bookingData;
      
      setDayDetails(prevDetails => ({
        ...prevDetails,
        [dayIndex]: {
          hotel: selectedHotel,
          transport: selectedTransport
        }
      }));
    }
  }, [bookingData]);

  // Navigate to BookOption page
  const handleEditClick = (day) => {
    navigate('/bookoption', { state: { day, customizationData } });
  };

  return (
    <div className="customization-container">
      <Navbar />
      <h2 className="customization-title">Your Trip Details</h2>
      <form className="search-form-customization">
        <div className="search-row-customization">
          <div className="search-input-customization">
            <select value={selectedStartingPoint} disabled>
              <option value="" disabled>Starting Point</option>
              {citiesInPakistan.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="search-input-customization">
            <select value={selectedDestination} disabled>
              <option value="" disabled>Destination</option>
              {citiesInPakistan.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="search-input-customization">
            <input type="date" value={selectedStartDate} disabled />
          </div>
          <div className="search-input-customization">
            <input type="date" value={selectedEndDate} disabled />
          </div>
          <div className="search-input-customization">
            <select value={selectedGuests} disabled>
              <option value="1" disabled>1 Person</option>
              <option value="2" disabled>2 Persons</option>
              <option value="3" disabled>3 Persons</option>
              <option value="4" disabled>4+ Persons</option>
            </select>
          </div>
        </div>
      </form>

      {/* Display Day Cards */}
      {numberOfDays > 0 && (
        <div className="days-section">
          {[...Array(numberOfDays)].map((_, index) => {
            const dayNumber = index + 1;
            const details = dayDetails[dayNumber] || {};

            return (
              <div key={index} className="day-card">
                <div className="day-number">DAY {dayNumber}</div>
                <div className="day-line"></div>
                <i 
                  className="edit-icon fas fa-edit" 
                  onClick={() => handleEditClick(dayNumber)}
                ></i>
                <p>Details for Day {dayNumber}</p>
                
                {/* Display Booking Details for the Day */}
                {details.hotel && (
                  <div className="booking-details">
                    <strong>Hotel:</strong> {details.hotel.name} <br />
                    <strong>Price:</strong> {details.hotel.price} PKR <br />
                    <strong>Rating:</strong> {details.hotel.rating}/5 <br />
                  </div>
                )}
                {details.transport && (
                  <div className="booking-details">
                    <strong>Transport:</strong> {details.transport.name || details.transport.car_name || details.transport.bus_name || details.transport.train_name} <br />
                    <strong>Price:</strong> {details.transport.price} PKR <br />
                    <strong>Departure:</strong> {details.transport.departure_time} <br />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserCustomization;
