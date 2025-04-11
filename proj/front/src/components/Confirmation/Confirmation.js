import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, CreditCard, Printer, Home } from 'lucide-react';
import './Confirmation.css';
import Navbar from '../NavBar/Navbar';

const Confirmation = () => {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read confirmed itinerary solely from localStorage
  useEffect(() => {
    const storedItinerary = localStorage.getItem('confirmedItinerary');
    if (storedItinerary) {
      setItinerary(JSON.parse(storedItinerary));
    }
    setLoading(false);
  }, []);

  // Format date (using current date as payment date)
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

  // Handle print and navigation actions
  const handlePrintItinerary = () => {
    window.print();
  };

  const handleBackToHome = () => {
    navigate('/');
  };

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

  if (!itinerary) {
    return (
      <div className="itinerary-card">
        <Navbar />
        <div className="no-data-container">
          <h2>No Itinerary Data Available</h2>
          <p>We couldn't find your itinerary details.</p>
          <button className="bttn home-bttn" onClick={handleBackToHome}>
            BACK TO HOMEPAGE
          </button>
        </div>
      </div>
    );
  }

  // Extract necessary details from the confirmed itinerary
  const { destination, duration_days, hotel, cost_breakdown, days, transportation } = itinerary;
  const paymentDate = formatDate(new Date().toISOString());
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
              <span>
                <strong>Total Amount:</strong> {cost_breakdown?.total_cost?.toLocaleString() || 'N/A'}
              </span>
              <span>
                <strong>Status:</strong> Paid
              </span>
            </div>
            <div className="info-row trip-overview">
              <div className="trip-route">
                <span className="from">{destination}</span>
                <span className="separator">→</span>
                <span className="to">{destination}</span>
              </div>
            </div>
            <div className="info-row">
              <div className="trip-dates">
                <Calendar size={14} />
                <span>{duration_days} {duration_days > 1 ? 'Days' : 'Day'}</span>
              </div>
            </div>
            <div className="info-row">
              <div className="trip-guests">
                <User size={14} />
                <span>Hotel: {hotel?.name || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-summary">
          <h2>Payment Summary</h2>
          <div className="payment-method">
            <CreditCard size={18} />
            <span>Card Payment</span>
          </div>
          <div className="cost-breakdown">
            <div className="cost-item">
              <span>Attraction Cost</span>
              <span className="cost">{cost_breakdown?.attraction_cost?.toLocaleString() || '0'}</span>
            </div>
            <div className="cost-item">
              <span>Hotel Cost</span>
              <span className="cost">{cost_breakdown?.hotel_cost?.toLocaleString() || '0'}</span>
            </div>
            <div className="cost-item">
              <span>Restaurant Cost</span>
              <span className="cost">{cost_breakdown?.restaurant_cost?.toLocaleString() || '0'}</span>
            </div>
            <div className="cost-item">
              <span>Transport Cost</span>
              <span className="cost">{cost_breakdown?.transport_cost?.toLocaleString() || '0'}</span>
            </div>
            <div className="cost-divider"></div>
            <div className="total cost-item">
              <span><strong>Total Amount Paid</strong></span>
              <span className="cost-total">{cost_breakdown?.total_cost?.toLocaleString() || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* New Trip Itinerary Section */}
        <div className="trip-summary">
          <h2>Trip Itinerary</h2>
          {days && days.map((day, index) => (
            <div key={index} className="day-item">
              <h3>Day {day.day}</h3>
              <div className="day-detail">
                <span><strong>Attraction:</strong> {day.attraction?.name} ({day.attraction?.city})</span>
              </div>
              <div className="day-detail">
                <span><strong>Lunch:</strong> {day.lunch}</span>
              </div>
              <div className="day-detail">
                <span><strong>Dinner:</strong> {day.dinner}</span>
              </div>
            </div>
          ))}
          <div className="overall-summary">
            <h3>Overall Trip Details</h3>
            <div className="summary-detail">
              <span><strong>Hotel:</strong> {hotel?.name}</span>
            </div>
            <div className="summary-detail">
              <span><strong>Transportation:</strong> {transportation?.mode} (Estimated Cost: {transportation?.estimated_cost?.toLocaleString() || '0'})</span>
            </div>
            <div className="summary-detail">
              <span><strong>Total Budget:</strong> {cost_breakdown?.budget?.toLocaleString() || '0'}</span>
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

export default Confirmation;
