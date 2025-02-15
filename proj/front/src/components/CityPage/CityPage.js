// src/components/CityPage/CityPage.js
import React, { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import Hero from './Hero';
import TopAttractions from './TopAttractions';
import HotelsSection from './HotelsSection';
import RestaurantsSection from './CityRestaurants';
import PanoramaViewer from './panorama.js';
import './CityPage.css';

const CityPage = ({ cityName }) => {
  const location = useLocation();
  const [showPanorama, setShowPanorama] = useState(false);

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
        <button className="panorama-button" onClick={handlePanoramaClick}>
          View Panorama
        </button>

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
