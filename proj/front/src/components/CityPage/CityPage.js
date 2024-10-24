import React from 'react';
import Navbar from '../NavBar/Navbar';
import Hero from './Hero';
import TopAttractions from './TopAttractions';
import HotelsSection from './HotelsSection';
import './CityPage.css';

// Add cityName as a prop parameter
const CityPage = ({ cityName }) => {
    return (
        <div className="City-page">
            <Navbar />
            <main className="main-content">
                {/* Pass cityName to each component */}
                <Hero cityName={cityName} />
                <div className="content-wrapper">
                    <TopAttractions cityName={cityName} />
                    <HotelsSection cityName={cityName} />
                </div>
            </main>
        </div>
    );
};

export default CityPage;