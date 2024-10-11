import React, { useState } from "react";
import HeroSection from "./HeroSection";
import "./Homepage.css";
import NavBar from "../NavBar/Navbar";
import ToursSection from "./ToursSection";
import PopularDestinations from "./PopularDestinations"
import AiBanner from "./AiBanner";

// const citiesInPakistan = [
//   "Islamabad",
//   "Lahore",
//   "Karachi",
//   "Murree",
//   "Peshawar",
//   "Skardu",
//   "Hunza",
//   "Quetta",
//   "Multan",
//   "Faisalabad",
// ];

const Homepage = () => {
 

  const handleAIPlanTrip = () => {
    console.log("AI Trip Planning initiated");
    // Logic for AI trip planning here
  };

  return (
    <div className="homepage">
      <NavBar />
     <HeroSection />
    <AiBanner/>
     <ToursSection />
     <PopularDestinations />
     



    </div>
  );
};

export default Homepage;

