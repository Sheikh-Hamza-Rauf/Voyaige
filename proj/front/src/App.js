/*
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm/Login';
import SignupForm from './components/SignupForm/Signup';
import Home from './components/HomePage/Homepage';
import HeroSection from "./components/HomePage/HeroSection";
import City from "./components/CityPage/City";
import CityPage from './components/CityPage/CityPage';
import Footer from './components/CityPage/Footer';
import PlanSelection from './components/HomePage/PlanSelection';
import MiloChatbot from './components/ChatbotPage/MiloChatbot';
import Challenges from "./components/HomePage/Challenges";
import CrosswordGrid from "./components/HomePage/CrosswordGrid";
import Quiz from "./components/HomePage/quiz"; 
import ItineraryForm from "./components/RecommendationForm/ItineraryForm";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import TripDetails from "./components/HomePage/PreplannedTrip/Tripdetail";
import AllTrips from "./components/HomePage/PreplannedTrip/AllTrips";
import ToursSection from "./components/HomePage/PreplannedTrip/ToursSection";
import UserCustomization from "./components/Booking/UserCustomization/UserCustomization"
import BookingOptions from "./components/Booking/BookingOptions"
import BookHotel from "./components/Booking/BookHotel";
import BookTransport from "./components/Booking/BookTransport";
import Hotel from "./components/HotelsPage/Hotels";
import Restaurants from "./components/RestaurantsPage/Restaurants";
import Cart from "./components/Cart/Cart";
import UserProfile from "./components/UserProfile/Profile";
import LoadingScreen from "./components/Loader/LoadingScreen";
import ChekoutPage from "./components/ChekoutPage/ChekoutPage";
import Confirmation from "./components/Confirmation/Confirmation"; 
const stripePromise = loadStripe('pk_test_51MqErmDG40mBr38yGJ5Efis4h3Sy1yPqbDVzGI0cVtt8t4dPVgK2B8nUf7pTJzhuY5I6JnI8Qpn1yReQRT9M5KL000i6zT7fco');

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
            <Route path="/city" element={<City />} /> 
            <Route path="/city/:cityName" element={<CityPageWrapper />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/UserCustomization" element={<UserCustomization/>}/>
            <Route path="/bookoption" element={<BookingOptions/>}  />
            <Route path="/BookHotel" element={<BookHotel/> } />
            <Route path="/BookTransport" element={<BookTransport/>} />
            <Route path="/PlanSelection" element={<PlanSelection />} />
            <Route path="/MiloChatbot" element={<MiloChatbot />} /> 
            <Route path="/form-plan" element={<ItineraryForm />} />
            <Route path="/" element={<Challenges />} />
            <Route path="/crossword" element={<CrosswordGrid />} />
            <Route path="/hotels" element={<Hotel />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/quiz"
              element={<Quiz onPointsUpdate={handlePointsUpdate} />} // Pass callback to Quiz
            />
            <Route path="/" element={<ToursSection />} />
             <Route path="/all-trips" element={<AllTrips />} />
            <Route path="/trip-details" element={<TripDetails />} />
            <Route 
              path="/checkout" 
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutPage />
                </Elements>
              } 
            />
            <Route path ="/cart" element = {<Cart/>} ></Route>

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

const ConditionalFooter = () => {
  const location = useLocation();
  const excludedRoutes = ["/login", "/signup"]; // Exclude on login/signup pages

  return !excludedRoutes.includes(location.pathname) ? <Footer /> : null;
};

export default App;
*/

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm/Login';
import SignupForm from './components/SignupForm/Signup';
import Home from './components/HomePage/Homepage';
import City from "./components/CityPage/City";
import CityPage from './components/CityPage/CityPage';
import Footer from './components/CityPage/Footer';
import PlanSelection from './components/HomePage/PlanSelection';
import MiloChatbot from './components/ChatbotPage/MiloChatbot';
import Challenges from "./components/HomePage/Challenges";
import CrosswordGrid from "./components/HomePage/CrosswordGrid";
import Quiz from "./components/HomePage/quiz"; 
import ItineraryForm from "./components/RecommendationForm/ItineraryForm";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import TripDetails from "./components/HomePage/PreplannedTrip/Tripdetail";
import AllTrips from "./components/HomePage/PreplannedTrip/AllTrips";
import ToursSection from "./components/HomePage/PreplannedTrip/ToursSection";
import UserCustomization from "./components/Booking/UserCustomization/UserCustomization"
import BookingOptions from "./components/Booking/BookingOptions"
import BookHotel from "./components/Booking/BookHotel";
import BookTransport from "./components/Booking/BookTransport";
import Hotel from "./components/HotelsPage/Hotels";
import Restaurants from "./components/RestaurantsPage/Restaurants";
import Cart from "./components/Cart/Cart";
import LoadingScreen from "./components/Loader/LoadingScreen";
import ChekoutPage from "./components/ChekoutPage/ChekoutPage";
import Confirmation from "./components/Confirmation/Confirmation"; 
import UserProfile from "./components/UserProfile/Profile";
import Checkout2 from "./components/CheckoutPage/Checkout2";
const stripePromise = loadStripe('pk_test_51MqErmDG40mBr38yGJ5Efis4h3Sy1yPqbDVzGI0cVtt8t4dPVgK2B8nUf7pTJzhuY5I6JnI8Qpn1yReQRT9M5KL000i6zT7fco');

function App() {
  const [points, setPoints] = useState(0);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handlePointsUpdate = (earnedPoints) => {
    setPoints(prevPoints => prevPoints + earnedPoints);
  };

 /* if (loading) return <LoadingScreen />;*/

  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/city" element={<City />} /> 
          <Route path="/city/:cityName" element={<CityPageWrapper />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/UserCustomization" element={<UserCustomization />} />
          <Route path="/bookoption" element={<BookingOptions />} />
          <Route path="/BookHotel" element={<BookHotel />} />
          <Route path="/BookTransport" element={<BookTransport />} />
          <Route path="/PlanSelection" element={<PlanSelection />} />
          <Route path="/MiloChatbot" element={<MiloChatbot />} /> 
          <Route path="/form-plan" element={<ItineraryForm />} />
          <Route path="/" element={<Challenges />} />
          <Route path="/crossword" element={<CrosswordGrid />} />
          <Route path="/hotels" element={<Hotel />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/quiz" element={<Quiz onPointsUpdate={handlePointsUpdate} />} />
          <Route path="/" element={<ToursSection />} />
                       <Route path="/all-trips" element={<AllTrips />} />
                      <Route path="/trip-details" element={<TripDetails />} />
          <Route 
            path="/checkout" 
            element={
              <Elements stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
            } 
          />
            <Route 
            path="/chekout" 
            element={
              <Elements stripe={stripePromise}>
                <ChekoutPage />
              </Elements>
            } 
          />
          <Route 
            path="/checkout2" 
            element={
              <Elements stripe={stripePromise}>
                <Checkout2 />
              </Elements>
            } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />


        </Routes>
      </div>
      <ConditionalFooter />
    </div>
  );
}

// Wrapper component to handle city name from both URL params and state
const CityPageWrapper = () => {
  const location = useLocation();
  const cityName = location.state?.cityName || 'Islamabad'; // Default to Islamabad if no city specified

  return <CityPage cityName={cityName} />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const excludedRoutes = ["/login", "/signup"];
  return !excludedRoutes.includes(location.pathname) ? <Footer /> : null;
};

export default App;
