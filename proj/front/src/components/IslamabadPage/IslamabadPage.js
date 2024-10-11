import React from 'react';
import Navbar from '../NavBar/Navbar';
import Hero from './Hero';
import TopAttractions from './TopAttractions';
import HotelsSection from './HotelsSection';


import './IslamabadPage.css';

const IslamabadPage = () => {
    return (
        <div className="islamabad-page">
            <Navbar />
            <main className="main-content">
                <Hero />
                <div className="content-wrapper">
                    <TopAttractions />
                    <HotelsSection />
                </div>
            </main>
          
        </div>
    );
};

export default IslamabadPage;