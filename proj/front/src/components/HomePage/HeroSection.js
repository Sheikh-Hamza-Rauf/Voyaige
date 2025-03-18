import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HeroSection.css';

const citiesInPakistan = [
  "Islamabad", "Lahore", "Karachi", "Murree", "Peshawar",
  "Skardu", "Hunza", "Quetta", "Multan", "Faisalabad",
  "Kashmir", "Abbottabad", "Gilgit", "Naran", "Batakundi"
];

const images = [
  'https://images8.alphacoders.com/422/422588.jpg',
  'https://www.wns.co.za/Portals/0/Images/HeaderBanner/desktop/1087/53/travel_HD.jpg',
  'https://firstta.com/images/reserval.png'
];

const HeroSection = () => {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setIsLoggedIn(true);
      setEmail(user.email);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSaveCustomization = async (customizationData) => {
    sessionStorage.removeItem('currentTripId');
    try {
      const response = await axios.post("http://localhost:5000/api/users/customizations", customizationData);

      if (response.status === 201 || response.status === 200) {
        navigate('/UserCustomization', { state: { customizationData } });
      } else {
        alert("Failed to save customization.");
      }
    } catch (error) {
      console.error("Error saving customization:", error.response?.data || error.message);
      alert("Error while saving customization.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  
    if (!isLoggedIn) {
      setError("Please sign in to proceed!");
      return;
    }
  
    if (!startingPoint || !destination || !startDate || !endDate || !guests) {
      setError("Please fill in all required fields before proceeding.");
      return;
    }
  
    if (startingPoint.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setError("Starting point and destination cannot be the same.");
      return;
    }
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date for comparison
  
    const tripStart = new Date(startDate);
    const tripEnd = new Date(endDate);
  
    if (isNaN(tripStart) || isNaN(tripEnd)) {
      setError("Invalid date format. Please enter a valid trip start and end date.");
      return;
    }
  
    // Ensure trip starts at least one day after today
    const minStartDate = new Date();
    minStartDate.setDate(today.getDate() + 1);
  
    if (tripStart < minStartDate) {
      setError("Trip start date must be at least one day after today.");
      return;
    }
  
    if (tripEnd <= tripStart) {
      setError("Trip end date must be after the start date.");
      return;
    }
  
    // Ensure trip duration is at least 3 days
    const tripDuration = (tripEnd - tripStart) / (1000 * 60 * 60 * 24);
    if (tripDuration < 3) {
      setError("Trip duration must be at least 3 days.");
      return;
    }
  
    // Ensure trip duration does not exceed a realistic limit (e.g., 365 days)
    if (tripDuration > 365) {
      setError("Trip duration cannot be longer than 365 days.");
      return;
    }
  
    // Guests must be a number greater than 0 and reasonable
    if (isNaN(guests) || guests < 1 || guests > 100) {
      setError("Please select a valid number of guests (1-100).");
      return;
    }
  
    setError(""); // Clear any previous error
    const customizationData = {
      email,
      startingPoint,
      destination,
      startDate,
      endDate,
      guests,
    };
  
    handleSaveCustomization(customizationData);
  };
  
  return (
    <div className='heroo'>
      <h1 className="titttle" style={{ fontWeight: '800', textAlign: 'center', fontSize: '3rem', marginTop: '5rem', marginBottom: '1rem' }}>
        <span> Where to?</span>
      </h1>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-row">
          <div className="search-input">
            <select value={startingPoint} onChange={(e) => setStartingPoint(e.target.value)}>
              <option value="" disabled>Starting Point</option>
              {citiesInPakistan.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="search-input">
            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value="" disabled>Destination</option>
              {citiesInPakistan.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="search-input">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="search-input">
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="search-input">
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            <option value="1">Economy</option>
              <option value="2">Normal</option>
              <option value="3">Deluxe</option>
              
            </select>
          </div>
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type="submit" className="search-button">
          <span>Plan Now</span>
        </button>
      </form>
    </div>
  );
};

export default HeroSection;
