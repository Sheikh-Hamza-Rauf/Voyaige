
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm/Login';
import SignupForm from './components/SignupForm/Signup';
import Home from './components/HomePage/Homepage';
import CityPage from './components/CityPage/CityPage';
import Footer from './components/CityPage/Footer';
import PlanSelection from './components/HomePage/PlanSelection';
import MiloChatbot from './components/ChatbotPage/MiloChatbot';
import Challenges from "./components/HomePage/Challenges";
import CrosswordGrid from "./components/HomePage/CrosswordGrid";
import Quiz from "./components/HomePage/quiz"; 

import './App.css';

function App() {
  const [points, setPoints] = useState(0); // State to track total points

  // Callback to handle points received from Quiz
  const handlePointsUpdate = (earnedPoints) => {
    console.log("Points received from Quiz:", earnedPoints); // Log the points for debugging
    setPoints((prevPoints) => prevPoints + earnedPoints); // Update points
  };
  return (
    <Router>
      <div className="App">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/city/:cityName" element={<CityPageWrapper />} />
            <Route path="/PlanSelection" element={<PlanSelection />} />
            <Route path="/MiloChatbot" element={<MiloChatbot />} /> 
            <Route path="/" element={<Challenges />} />
            <Route path="/crossword" element={<CrosswordGrid />} />
            <Route
              path="/quiz"
              element={<Quiz onPointsUpdate={handlePointsUpdate} />} // Pass callback to Quiz
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

// Wrapper component to handle city name from both URL params and state
const CityPageWrapper = () => {
  const location = useLocation();
  const cityName = location.state?.cityName || 'Islamabad'; // Default to Islamabad if no city specified

  return <CityPage cityName={cityName} />;
};

export default App;
