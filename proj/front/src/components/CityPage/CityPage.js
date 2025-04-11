import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import Hero from './Hero';
import TopAttractions from './TopAttractions';
import HotelsSection from './HotelsSection';
import RestaurantsSection from './RestaurantsSection';
import PanoramaViewer from './panorama.js';
import './CityPage.css';

const CityPage = ({ cityName }) => {
  const location = useLocation();
  const [showPanorama, setShowPanorama] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // State for tooltip

  const handlePanoramaClick = () => {
    setShowPanorama(true);
  };

  const closePanorama = () => {
    setShowPanorama(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="City-page">
      <Navbar />
      <main className="main-content">
        <Hero cityName={cityName} />

        <div 
          className="panorama-icon-wrapper" 
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img 
            src={`${process.env.PUBLIC_URL}/images/panorama-icon.png`} 
            alt="360 Panorama" 
            className="panorama-icon" 
            onClick={handlePanoramaClick} 
          />
          {showTooltip && (
            <div className="tooltip">View Panorama of City</div>
          )}
        </div>

        <PanoramaViewer 
          cityName={cityName} 
          showPanorama={showPanorama} 
          onClose={closePanorama} 
        />

        <TopAttractions cityName={cityName} />
        <HotelsSection cityName={cityName} />
        <RestaurantsSection cityName={cityName} />
      </main>
    </div>
  );
};

export default CityPage;
