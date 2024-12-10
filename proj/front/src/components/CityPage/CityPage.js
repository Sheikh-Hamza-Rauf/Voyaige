import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import Hero from './Hero';
import TopAttractions from './TopAttractions';
import HotelsSection from './HotelsSection';
import RestaurantsSection from './CityRestaurants'
import './CityPage.css';

// Add cityName as a prop parameter
const CityPage = ({ cityName }) => {
  const location = useLocation();
  const hotelsRef = useRef(null);
  const attractionsRef = useRef(null);
  const restaurantsRef = useRef(null);

  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);

    // Scroll to a specific section if scrollTo is in location state
    if (location.state && location.state.scrollTo) {
      const section = location.state.scrollTo;
      if (section === 'HotelsSection' && hotelsRef.current) {
        hotelsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'TopAttractions' && attractionsRef.current) {
        attractionsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'RestaurantsSection' && restaurantsRef.current) {
        restaurantsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="City-page">
      <Navbar />
      <main className="main-content">
        {/* Pass cityName to each component */}
        <Hero cityName={cityName} />
        <div className="content-wrapper">
          <div id="TopAttractions" ref={attractionsRef}>
            <TopAttractions cityName={cityName} />
          </div>
          <div id="HotelsSection" ref={hotelsRef}>
            <HotelsSection cityName={cityName} />
          </div>
          <div id="RestaurantsSection" ref={restaurantsRef}>
            <RestaurantsSection cityName={cityName} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CityPage;
