import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HeroSection.css';

const citiesInPakistan = [
  "Islamabad", "Lahore", "Karachi", "Murree", "Peshawar",
  "Skardu", "Hunza", "Quetta", "Multan", "Faisalabad", 
  "Murree", "Kashmir", "Abbottabad", "Gilgit", "Naran",
  "Batakundi"
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
      setEmail(user.email); // Store the email from the user object
    } else {
      setIsLoggedIn(false);
    }
    console.log("User status:", isLoggedIn ? "Logged in" : "Not logged in");
  }, []);

  const handleSaveCustomization = async (customizationData) => {
    console.log("Sending customization data:", customizationData);
    try {
      const response = await axios.post('http://localhost:5000/api/users/customizations', customizationData);

      console.log("Response: ", response.data);
      if (response.status === 201 || response.status === 200) {
        
        navigate('/UserCustomization', { state: { customizationData } });
      } else {
        alert("Failed to save customization.");
      }
    } catch (error) {
      console.error("Error saving customization:", error);
      alert("Error while saving customization.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please sign in to proceed!");
      return;
    }

    if (!startingPoint || !destination || !startDate || !endDate || !guests) {
      setError('Please fill in all required fields before proceeding.');
      return;
    }

    setError('');
    const customizationData = {
      email,  // Email is taken from useEffect state
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
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4+ Persons</option>
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
