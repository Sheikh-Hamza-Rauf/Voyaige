import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm/Login';
import SignupForm from './components/SignupForm/Signup';
import Home from './components/HomePage/Homepage';
import CityPage from './components/CityPage/CityPage';
import Footer from './components/CityPage/Footer';
import PlanSelection from './components/HomePage/PlanSelection';
import MiloChatbot from './components/ChatbotPage/MiloChatbot';

import './App.css';

function App() {
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
