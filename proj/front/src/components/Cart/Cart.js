import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, User, CreditCard, Printer, Mail, Home } from 'lucide-react';
import './Cart.css';
import Navbar from '../NavBar/Navbar';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dayDetails, setDayDetails] = useState({});

  useEffect(() => {
    // Get data from location state (sent from CheckoutPage)
    if (location.state?.tripData) {
      setTripData(location.state.tripData);
      setPaymentDetails(location.state.paymentDetails || {});
      
      // Get day details from local storage
      try {
        const storedDayDetails = localStorage.getItem('dayDetails');
        if (storedDayDetails) {
          setDayDetails(JSON.parse(storedDayDetails));
        }
      } catch (error) {
        console.error("Error parsing day details from localStorage:", error);
      }
      
      setLoading(false);
    } else {
      // If no data in state, could fetch from API using stored ID in localStorage or redirect
      setLoading(false);
    }
  }, [location]);

  // Function to format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return dateString || 'N/A';
    }
  };

  // Handle email itinerary
  const handleEmailItinerary = () => {
    // In a real application, this would call an API endpoint to send an email
    alert('Itinerary has been sent to your email!');
  };

  // Handle print itinerary
  const handlePrintItinerary = () => {
    window.print();
  };

  // Handle navigation back to homepage
  const handleBackToHome = () => {
    navigate('/');
  };

  // Display loading state
  if (loading) {
    return (
      <div className="itinerary-card">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  // Display fallback if no data available
  if (!tripData && !loading) {
    return (
      <div className="itinerary-card">
        <Navbar />
        <div className="no-data-container">
          <h2>No Itinerary Data Available</h2>
          <p>We couldn't find your itinerary details.</p>
          <button className="bttn home-bttn" onClick={handleBackToHome}>BACK TO HOMEPAGE</button>
        </div>
      </div>
    );
  }

  // Extract user and itinerary data from the trip data
  const summary = tripData?.summary || {};
  const days = tripData?.days || [];
  
  // Format payment date
  const paymentDate = formatDate(paymentDetails?.date || new Date());

  // Generate booking ID - in real app this would come from backend
  const bookingId = `TRP${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="itinerary-card">
      <Navbar />
      <div className="receipt-container print-section">
        <div className="header">
          <h1>Trip Confirmation</h1>
          <div className="booking-confirmation">
            <div className="confirmation-badge">
              <span>Payment Successful</span>
              <span className="confirmation-date">{paymentDate}</span>
            </div>
          </div>
          
          <div className="user-info">
            <div className="info-row">
              <span><strong>Booking ID:</strong> {bookingId}</span>
              <span><strong>Payment Date:</strong> {paymentDate}</span>
            </div>
            <div className="info-row">
              <span><strong>Amount Paid:</strong> {paymentDetails?.amount?.toLocaleString() || 'N/A'}</span>
              <span><strong>Status:</strong> {paymentDetails?.status || 'Paid'}</span>
            </div>
            <div className="info-row trip-overview">
              <div className="trip-route">
                <span className="from">{summary.from || 'Origin'}</span>
                <span className="separator">→</span>
                <span className="to">{summary.to || 'Destination'}</span>
              </div>
            </div>
            <div className="info-row">
              <div className="trip-dates">
                <Calendar size={14} />
                <span>
                  {formatDate(summary.startDate)} - {formatDate(summary.endDate)}
                </span>
              </div>
            </div>
            <div className="info-row">
              <div className="trip-guests">
                <User size={14} />
                <span>Budget: {tripData.summary.guests === 1 ? 'Economic' : tripData.summary.guests === 2 ? 'Normal' : tripData.summary.guests === 3 ? 'Deluxe' : 'N/A'} • {tripData.summary.duration} {tripData.summary.duration > 1 ? 'Days' : 'Day'}</span>

              </div>
            </div>
          </div>
        </div>

        <div className="payment-summary">
          <h2>Payment Summary</h2>
          <div className="payment-details">
            <div className="payment-method">
              <CreditCard size={18} />
              <span>Card Payment</span>
            </div>
            
            <div className="cost-breakdown">
  {days.map((day, index) => {
    // Get details for this day from localStorage
    const dayDetail = dayDetails[day.dayNumber] || {};

    return (
      <div key={index} className="cost-item">
        <div>
          <div>Day {day.dayNumber}: {day.title}</div>
          <div className="day-detail-summary">
            <span>Attraction: {dayDetail.attraction || 'No selected'}</span>
            <span> • Lunch: {dayDetail.lunch || 'No selected'}</span>
            <span> • Dinner: {dayDetail.dinner || 'No selected'}</span>
          </div>
        </div>
        <span className="cost">{day.totalCost?.toLocaleString()}</span>
      </div>
    );
  })}

  <div className="cost-divider"></div>

  {tripData.discountPercentage > 0 && (
    <div className="discount cost-item">
      <span>Points Discount ({tripData.discountPercentage}%)</span>
      <span className="cost-discount">
        -{((days.reduce((sum, day) => sum + (day.totalCost || 0), 0) * tripData.discountPercentage) / 100).toLocaleString()}
      </span>
    </div>
  )}

  {paymentDetails?.promoDiscount > 0 && (
    <div className="discount cost-item">
      <span>Promo Discount ({paymentDetails.promoApplied}: {paymentDetails.promoDiscount}%)</span>
      <span className="cost-discount">
        -{((days.reduce((sum, day) => sum + (day.totalCost || 0), 0) * paymentDetails.promoDiscount) / 100).toLocaleString()}
      </span>
    </div>
  )}

  <div className="total cost-item">
    <span><strong>Total Amount Paid</strong></span>
    <span className="cost-total">{paymentDetails?.amount?.toLocaleString() || 'N/A'}</span>
  </div>
</div>

          </div>
        </div>
      </div>

      <div className="button-group">
       
        <button className="bttn print-bttn" onClick={handlePrintItinerary}>
          <Printer size={16} /> PRINT COPY
        </button>
        <button className="bttn home-bttn" onClick={handleBackToHome}>
          <Home size={16} /> BACK TO HOMEPAGE
        </button>
      </div>
    </div>
  );
};

export default Cart;