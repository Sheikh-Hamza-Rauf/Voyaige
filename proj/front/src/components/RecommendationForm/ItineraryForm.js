import React, { useState } from 'react';
import axios from 'axios';
import './ItineraryForm.css';
import Navbar from '../NavBar/Navbar';

const ItineraryForm = () => {
  const [formData, setFormData] = useState({
    starting_point: '',
    destination: '',
    duration_days: '',
    num_travelers: '',
    area_of_interest: '',
    budget: '',
    allocation_percentages: {
      hotel: 50,
      restaurants: 30,
      attractions: 20
    }
  });

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('allocation_percentages')) {
      const field = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        allocation_percentages: {
          ...prevState.allocation_percentages,
          [field]: Number(value)
        }
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);

    const payload = {
      starting_point: formData.starting_point,
      destination: formData.destination,
      duration_days: Number(formData.duration_days),
      num_travelers: Number(formData.num_travelers),
      area_of_interest: formData.area_of_interest,
      budget: Number(formData.budget),
      allocation_percentages: formData.allocation_percentages
    };

    try {
      const response = await axios.post('http://127.0.0.1:5002/api/ItineraryForm', payload);
      setItinerary(response.data.itinerary);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = () => {
    // Forward itinerary data to the booking page.
    console.log("Confirmed Itinerary:", itinerary);
    alert('Booking confirmed! Redirecting to payment page...');
    window.location.href = '/confirm-booking'; // Replace with your actual route
  };

  return (
    <div className="itinerary-form-container">
      <Navbar />
      <h2>Plan Your Dream Trip</h2>
      <form className="itinerary-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="starting_point">Starting Point</label>
            <input
              type="text"
              id="starting_point"
              name="starting_point"
              value={formData.starting_point}
              onChange={handleChange}
              placeholder="e.g., Islamabad"
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              placeholder="e.g., Murree"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration_days">Duration (Days)</label>
            <input
              type="number"
              id="duration_days"
              name="duration_days"
              value={formData.duration_days}
              onChange={handleChange}
              required
              min="1"
              placeholder="e.g., 5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="num_travelers">Number of Travelers</label>
            <input
              type="number"
              id="num_travelers"
              name="num_travelers"
              value={formData.num_travelers}
              onChange={handleChange}
              required
              min="1"
              placeholder="e.g., 4"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="area_of_interest">Area of Interest</label>
            <input
              type="text"
              id="area_of_interest"
              name="area_of_interest"
              value={formData.area_of_interest}
              onChange={handleChange}
              required
              placeholder="e.g., Urban Exploration"
            />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget (PKR)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              min="1"
              placeholder="e.g., 12000"
            />
          </div>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Generating Itinerary...' : 'Generate Itinerary'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {itinerary && (
        <div className="itinerary-result">
          <h3>Your Personalized Itinerary</h3>
          <div className="itinerary-summary">
            <p><strong>Destination:</strong> {itinerary.destination}</p>
            <p><strong>Duration:</strong> {itinerary.duration_days} Days</p>
            <p><strong>Travelers:</strong> {itinerary.num_travelers}</p>
            <p><strong>Total Budget:</strong> {itinerary.total_budget} PKR</p>
          </div>
          <div className="hotel-info">
            <h4>Accommodation</h4>
            <p><strong>{itinerary.hotel.name}</strong></p>
            <p><strong>Price per night:</strong> {itinerary.hotel.price} PKR</p>
          </div>
          <div className="transport-info">
            <h4>Transportation</h4>
            <p><strong>Mode:</strong> {itinerary.transportation.mode}</p>
            <p><strong>Estimated Cost:</strong> {itinerary.transportation.estimated_cost} PKR</p>
          </div>
          <div className="daily-itinerary">
            {itinerary.days.map((day) => (
              <div key={day.day} className="day-itinerary">
                <h4>Day {day.day}</h4>
                <div className="day-detail">
                  <p><strong>Attraction:</strong> {day.attraction.name || day.attraction}</p>
                  <p><strong>Lunch:</strong> {day.lunch}</p>
                  <p><strong>Dinner:</strong> {day.dinner}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cost-breakdown">
            <p><strong>Total Cost:</strong> {itinerary.cost_breakdown.total_cost} PKR</p>
            <p><strong>Status:</strong> {itinerary.cost_breakdown.status}</p>
          </div>
          <button className="confirm-button" onClick={confirmBooking}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default ItineraryForm;
