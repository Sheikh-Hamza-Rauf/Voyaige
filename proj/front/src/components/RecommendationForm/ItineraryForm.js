// src/components/ItineraryForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ItineraryForm.css'
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested allocation_percentages
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);

    // Prepare the payload
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
        const response = await axios.post('http://127.0.0.1:5002/api/ItineraryForm', payload)

        setItinerary(response.data.itinerary);
        setError(null); // Reset error state if the request is successful
      } catch (err) {
        console.log("Error occurred in itinerary generation:", err);
        const errorMessage = err.response?.data?.error || err.message || 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
      
  };

  return (
  
    <div className="itinerary-form-container">
        <Navbar/>
      <h2>Plan Your Trip</h2>
      <form className="itinerary-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="starting_point">Starting Point</label>
          <input
            type="text"
            id="starting_point"
            name="starting_point"
            value={formData.starting_point}
            onChange={handleChange}
            required
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


        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Itinerary'}  
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {itinerary && (
        <div className="itinerary-result">
          <h3>Generated Itinerary</h3>
          <p><strong>Destination:</strong> {itinerary.destination}</p>
          <p><strong>Duration:</strong> {itinerary.duration} Days</p>
          <p><strong>Number of Travelers:</strong> {itinerary.num_travelers}</p>
          <p><strong>Area of Interest:</strong> {itinerary.area_of_interest}</p>
          <p><strong>Total Budget:</strong> {itinerary.total_budget} PKR</p>
          <p><strong>Hotel:</strong> {itinerary.hotel.hotel_name}</p>
          <p><strong>Location:</strong> {itinerary.hotel.hotel_address}</p>
          <p><strong>Price per night:</strong> {itinerary.hotel.hotel_price} PKR</p>
          <p><strong>Transport Budget:</strong> {itinerary.transport_budget} PKR</p>

          {itinerary.days.map((day) => (
            <div key={day.day} className="day-itinerary">
              <h4>Day {day.day}:</h4>
              <div>
                <strong>Attractions:</strong>
                <ul>
                  {day.attractions.map((attr, index) => (
                    <li key={index}>{attr.name} {attr.category && `- ${attr.category}`}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Dining:</strong>
                <p>Lunch at {day.dining.lunch}</p>
                <p>Dinner at {day.dining.dinner}</p>
              </div>
            </div>
          ))}

          <p><strong>Estimated Total Cost:</strong> {itinerary.total_cost} PKR</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryForm;
