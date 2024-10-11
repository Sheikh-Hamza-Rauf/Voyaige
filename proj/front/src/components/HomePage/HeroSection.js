import React, { useState } from 'react';
import './HeroSection.css';

const citiesInPakistan = [
  "Islamabad", "Lahore", "Karachi", "Murree", "Peshawar",
  "Skardu", "Hunza", "Quetta", "Multan", "Faisalabad",
];

const HeroSection = () => {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', { startingPoint, destination, startDate, endDate, guests });
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="main-title">Voyaige</h1>
        <h2 className="subtitle">Your Personal AI Trip Planner</h2>
        <h3 className="tagline">Discover Pakistan's Hidden Gems</h3>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-row">
          <div className="search-input">
            <i className="fas fa-map-marker-alt"></i>
            <select
              value={startingPoint}
              onChange={(e) => setStartingPoint(e.target.value)}
              placeholder="Starting Point"
            >
              <option value="" disabled>Starting Point</option>
              {citiesInPakistan.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="search-input">
            <i className="fas fa-map-marker-alt"></i>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where are you going?"
            >
              <option value="" disabled>Destination</option>
              {citiesInPakistan.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="search-input">
            <i className="far fa-calendar-alt"></i>
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="search-input">
            <i className="far fa-calendar-alt"></i>
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="search-input">
            <i className="fas fa-user-friends"></i>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4+ Persons</option>
            </select>
          </div>
        </div>
        <button type="submit" className="search-button">
          <span>Plan Now</span>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default HeroSection;
