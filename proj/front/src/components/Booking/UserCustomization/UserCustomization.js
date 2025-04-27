import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../NavBar/Navbar';
import './UserCustomization.css';


const UserCustomization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customizationData, bookingData } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [tripId, setTripId] = useState(null);
  const [error, setError] = useState(null);

    console.log(customizationData);
    console.log(bookingData);
  // Trip summary details
  const [tripSummary, setTripSummary] = useState({
    startingPoint: '',
    destination: '',
    startDate: '',
    endDate: '',
    guests: 1,
    numberOfDays: 0
  });

  // Trip-level details (hotel and transport)
  const [tripDetails, setTripDetails] = useState({
    hotel: null,
    transport: null
  });

  // Day-by-day details for food and attractions
  const [dayDetails, setDayDetails] = useState({});

  // City options for various destinations
  const cityOptions = {
    "Islamabad": {
      lunch: ["Monal Restaurant", "Tandoori Restaurant", "Chaaye Khana"],
      dinner: ["Savour Foods", "Kabul Restaurant", "Dynasty Restaurant"],
      attractions: ["Faisal Mosque", "Daman-e-Koh", "Pakistan Monument"]
    },
    "Lahore": {
      lunch: ["Haveli Restaurant", "Andaaz Restaurant", "Spice Bazaar"],
      dinner: ["Cooco's Den", "Village Restaurant", "Fujiyama Restaurant"],
      attractions: ["Badshahi Mosque", "Lahore Fort", "Shalimar Gardens"]
    },
    "Karachi": {
      lunch: ["BBQ Tonight", "Kolachi Restaurant", "Kababjees"],
      dinner: ["Port Grand", "Okra Restaurant", "Cafe Flo"],
      attractions: ["Clifton Beach", "Mazar-e-Quaid", "Mohatta Palace"]
    },
    "Murree": {
      lunch: ["Gloria Jeans", "Lockwood Restaurant", "Red Onion"],
      dinner: ["Usmania Restaurant", "Pines View", "Cecil Restaurant"],
      attractions: ["Mall Road", "Patriata Chair Lift", "Kashmir Point"]
    },
    "Peshawar": {
      lunch: ["Charsi Tikka", "Chief Burger", "Cafe Crunch"],
      dinner: ["Shiraz Restaurant", "Namak Mandi", "Khyber Restaurant"],
      attractions: ["Qissa Khwani Bazaar", "Peshawar Museum", "Bala Hisar Fort"]
    },
    "Skardu": {
      lunch: ["Shangri-La Resort Restaurant", "K2 Restaurant", "Indus View Restaurant"],
      dinner: ["Mashabrum Hotel Restaurant", "Baltistan Continental", "Snow Leopard Inn"],
      attractions: ["Shangrila Resort", "Upper Kachura Lake", "Deosai National Park"]
    },
    "Hunza": {
      lunch: ["Cafe de Hunza", "Hidden Paradise Restaurant", "Eagle's Nest"],
      dinner: ["Hunza Serena Inn", "Karimabad Restaurant", "Panorama Restaurant"],
      attractions: ["Baltit Fort", "Attabad Lake", "Passu Cones"]
    },
    "Quetta": {
      lunch: ["Pishin Restaurant", "Lehri Sajji House", "Cafe Monal"],
      dinner: ["Usmania Restaurant", "Lal Kabab", "Quetta Continental"],
      attractions: ["Hanna Lake", "Hazarganji Chiltan National Park", "Quetta Geological Museum"]
    },
    "Multan": {
      lunch: ["Chen One Restaurant", "Multan Khaas", "Bundu Khan"],
      dinner: ["Savoury Restaurant", "Village Restaurant", "Multan Continental"],
      attractions: ["Shrine of Shah Rukn-e-Alam", "Multan Fort", "Ghanta Ghar"]
    },
    "Faisalabad": {
      lunch: ["La Atrium", "Lasania Restaurant", "Sandal Bar"],
      dinner: ["Lasania Bar-B-Q", "Khan Baba Restaurant", "Pearl Continental"],
      attractions: ["Clock Tower", "Jinnah Garden", "Lyallpur Museum"]
    },
    // Default options for any city not in the list
    "Default": {
      lunch: ["Local Restaurant 1", "Local Restaurant 2", "Local Restaurant 3"],
      dinner: ["Evening Dining 1", "Evening Dining 2", "Evening Dining 3"],
      attractions: ["Local Attraction 1", "Local Attraction 2", "Local Attraction 3"]
    }
  };
  
  // Load or create trip data on component mount
 // Load or create trip data on component mount
useEffect(() => {
  const loadOrCreateTrip = async () => {
    try {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        console.error('User not logged in.');
        return;
      }
      const user = JSON.parse(storedUser);
      
      //  Check for user email instead of _id
      if (!user.email) {
        console.error('User object is missing the email field.');
        return;
      }

      if (customizationData) {
        const { startingPoint, destination, startDate, endDate, guests } = customizationData;
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end - start;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        const numberOfDays = daysDiff > 0 ? daysDiff : 0;
        
        const existingTripId = sessionStorage.getItem('currentTripId');
        
        if (existingTripId) {
          const response = await axios.get(`https://voyaige-production.up.railway.app/api/trips/${existingTripId}`);
          const tripData = response.data;
          
          setTripId(existingTripId);
          setTripSummary({
            startingPoint: tripData.startingPoint,
            destination: tripData.destination,
            startDate: tripData.startDate,
            endDate: tripData.endDate,
            guests: tripData.guests,
            numberOfDays: tripData.numberOfDays
          });
          setTripDetails({
            hotel: tripData.hotel || null,
            transport: tripData.transport || null
          });
          setDayDetails(tripData.dayDetails || {});
          
        } else {
          // ✅ Send userEmail instead of userId
          const response = await axios.post(`https://voyaige-production.up.railway.app/api/trips`, {
            userEmail: user.email,
            startingPoint,
            destination,
            startDate,
            endDate,
            guests,
            numberOfDays,
            hotel: null,
            transport: null,
            dayDetails: {},
            status: 'draft'
          });
          
          const newTripId = response.data.tripId;
          setTripId(newTripId);
          sessionStorage.setItem('currentTripId', newTripId);
          
          setTripSummary({
            startingPoint,
            destination,
            startDate,
            endDate,
            guests,
            numberOfDays
          });
        }
      } else if (location.state?.tripId) {
        const response = await axios.get(`https://voyaige-production.up.railway.app/api/trips/${location.state.tripId}`);
        const tripData = response.data;
        
        setTripId(tripData._id);
        sessionStorage.setItem('currentTripId', tripData._id);
        
        setTripSummary({
          startingPoint: tripData.startingPoint,
          destination: tripData.destination,
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          guests: tripData.guests,
          numberOfDays: tripData.numberOfDays
        });
        setTripDetails({
          hotel: tripData.hotel || null,
          transport: tripData.transport || null
        });
        setDayDetails(tripData.dayDetails || {});
        
      } else {
        const existingTripId = sessionStorage.getItem('currentTripId');
        
        if (existingTripId) {
          const response = await axios.get(`https://voyaige-production.up.railway.app/api/trips/${existingTripId}`);
          const tripData = response.data;
          
          setTripId(existingTripId);
          setTripSummary({
            startingPoint: tripData.startingPoint,
            destination: tripData.destination,
            startDate: tripData.startDate,
            endDate: tripData.endDate,
            guests: tripData.guests,
            numberOfDays: tripData.numberOfDays
          });
          setTripDetails({
            hotel: tripData.hotel || null,
            transport: tripData.transport || null
          });
          setDayDetails(tripData.dayDetails || {});
        } else {
          navigate('/');
          return;
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading trip data:", error);
      setError("Failed to load trip data. Please try again.");
      setIsLoading(false);
    }
  };

  loadOrCreateTrip();
}, [customizationData, location.state, navigate, location.pathname]);


// Handle booking data updates (when returning from BookOption page) — UNCHANGED
useEffect(() => {
  const updateBookingDetails = async () => {
    if (bookingData && tripId) {
      const { selectedHotel, selectedTransport } = bookingData;
      
      try {
        const updatedDetails = {
          ...tripDetails,
          hotel: selectedHotel || tripDetails.hotel,
          transport: selectedTransport || tripDetails.transport
        };
        
        setTripDetails(updatedDetails);
        
        await axios.patch(`https://voyaige-production.up.railway.app/api/trips/${tripId}`, {
          hotel: selectedHotel || tripDetails.hotel,
          transport: selectedTransport || tripDetails.transport
        });
      } catch (error) {
        console.error("Error updating booking details:", error);
        setError("Failed to update booking details. Please try again.");
      }
    }
  };
  
  updateBookingDetails();
}, [bookingData, tripId]);

  // Navigate to BookOption page
  const handleEditTripDetails = () => {
    navigate('/bookoption', { 
      state: { 
        customizationData: {
          startingPoint: tripSummary.startingPoint,
          destination: tripSummary.destination,
          startDate: tripSummary.startDate,
          endDate: tripSummary.endDate,
          guests: tripSummary.guests
        },
        currentDetails: tripDetails,
        tripId: tripId
      } 
    });
  };

  // Handle change for lunch, dinner, and attractions
  const handleDetailChange = async (day, type, value) => {
    try {
      // Update in state
      const updatedDayDetails = {
        ...dayDetails,
        [day]: {
          ...dayDetails[day],
          [type]: value
        }
      };
      
      setDayDetails(updatedDayDetails);
      
      // Update in the database
      await axios.patch(`https://voyaige-production.up.railway.app/api/trips/${tripId}`, {
        dayDetails: updatedDayDetails
      });
    } catch (error) {
      console.error("Error updating day details:", error);
      setError("Failed to update day options. Please try again.");
    }
  };

  // Helper function to safely access nested properties
  const getPropertyValue = (obj, property, fallback = 'N/A') => {
    if (!obj) return fallback;
    
    const properties = property.split('.');
    let value = obj;
    
    for (const prop of properties) {
      if (value && typeof value === 'object' && prop in value) {
        value = value[prop];
      } else {
        return fallback;
      }
    }
    
    return value || fallback;
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Get options for the current destination
  const getOptionsForDestination = () => {
    return cityOptions[tripSummary.destination] || cityOptions["Default"];
  };

  // Calculate total cost including food and attractions
  const calculateTotalCost = () => {
    let totalCost = 0;
    let hotelCost = 0;
    let transportCost = 0;
    let foodCost = 0;
    let attractionsCost = 0;
    
    // Fixed costs for hotel and transport (per trip)
    if (tripDetails.hotel && tripDetails.hotel.price) {
      const price = parseFloat(tripDetails.hotel.price);
      if (!isNaN(price)) {
        hotelCost = price;
        totalCost += price;
      }
    }
    
    if (tripDetails.transport && tripDetails.transport.price) {
      const price = parseFloat(tripDetails.transport.price);
      if (!isNaN(price)) {
        transportCost = price;
        totalCost += price;
      }
    }
    
    // Dynamic costs for food based on number of guests
    let LUNCH_COST;
    let DINNER_COST;
    
    // Set lunch and dinner costs based on number of guests
    switch (tripSummary.guests) {
      case 1:
        LUNCH_COST = 1500; // PKR
        DINNER_COST = 2000; // PKR
        break;
      case 2:
        LUNCH_COST = 2000; // PKR
        DINNER_COST = 3000; // PKR
        break;
      case 3:
        LUNCH_COST = 3000; // PKR
        DINNER_COST = 4000; // PKR
        break;
      default:
        // Fallback for other guest numbers
        LUNCH_COST = 1000; // PKR
        DINNER_COST = 1500; // PKR
    }
    
    const ATTRACTION_COST = 500; // PKR per person
    
    // Calculate daily food and attraction costs
    Object.values(dayDetails).forEach(day => {
      // Add lunch cost if selected
      if (day.lunch) {
        foodCost += LUNCH_COST;
        totalCost += LUNCH_COST;
      }
      
      // Add dinner cost if selected
      if (day.dinner) {
        foodCost += DINNER_COST;
        totalCost += DINNER_COST;
      }
      
      // Add attractions cost if selected (per person)
      if (day.attraction) {
        const attractionFee = ATTRACTION_COST * tripSummary.guests;
        attractionsCost += attractionFee;
        totalCost += attractionFee;
      }
    });
    
    return { totalCost, hotelCost, transportCost, foodCost, attractionsCost };
  };

  // Create an array of days
  const getDaysArray = () => {
    const days = [];
    for (let i = 0; i < tripSummary.numberOfDays; i++) {
      const dayNumber = i + 1;
      const dayDate = new Date(tripSummary.startDate);
      dayDate.setDate(dayDate.getDate() + i);
      days.push({ dayNumber, dayDate });
    }
    return days;
  };

// Build itinerary day details for checkout
// Build itinerary day details for checkout
const buildItineraryDays = () => {
  return getDaysArray().map(({ dayNumber }) => {
    const details = dayDetails[dayNumber] || {};
    const dayTitle = `Day ${dayNumber}: ${getPropertyValue(tripDetails.transport, 'type', 'Trip')} + Hotel`;
    
    // Calculate day cost
    let dayCost = 0;
    
    // Add hotel cost (divided by number of days)
    if (tripDetails.hotel && tripDetails.hotel.price) {
      const hotelPrice = parseFloat(tripDetails.hotel.price);
      if (!isNaN(hotelPrice)) {
        dayCost += hotelPrice / tripSummary.numberOfDays;
      }
    }
    
    // Add transport cost (divided by number of days)
    if (tripDetails.transport && tripDetails.transport.price) {
      const transportPrice = parseFloat(tripDetails.transport.price);
      if (!isNaN(transportPrice)) {
        dayCost += transportPrice / tripSummary.numberOfDays;
      }
    }
    
    // Get dynamic meal costs based on number of guests
    let LUNCH_COST;
    let DINNER_COST;
    
    // Set lunch and dinner costs based on number of guests
    switch (tripSummary.guests) {
      case 1:
        LUNCH_COST = 1500; // PKR
        DINNER_COST = 2000; // PKR
        break;
      case 2:
        LUNCH_COST = 2000; // PKR
        DINNER_COST = 3000; // PKR
        break;
      case 3:
        LUNCH_COST = 3000; // PKR
        DINNER_COST = 4000; // PKR
        break;
      default:
        // Fallback for other guest numbers
        LUNCH_COST = 1000; // PKR
        DINNER_COST = 1500; // PKR
    }
    
    const ATTRACTION_COST = 500; // PKR per person
    
    // Add food and attraction costs using the same dynamic pricing as calculateTotalCost
    if (details.lunch) dayCost += LUNCH_COST;
    if (details.dinner) dayCost += DINNER_COST;
    if (details.attraction) dayCost += ATTRACTION_COST * tripSummary.guests;
    
    return {
      dayNumber,
      title: dayTitle,
      transportMode: getPropertyValue(tripDetails.transport, 'type', 'Transport'),
      hotel: getPropertyValue(tripDetails.hotel, 'name', 'Hotel'),
      lunch: details.lunch || null,
      dinner: details.dinner || null,
      attraction: details.attraction || null,
      totalCost: Math.round(dayCost) // Round to nearest integer
    };
  });
};
// Handle proceed to checkout
// Handle proceed to checkout
const handleProceedToCheckout = async () => {
  try {
    const { totalCost } = calculateTotalCost();
    
    // Calculate user discount based on points (mock implementation)
    // In a real app, you would fetch this from user data
    const userPointsDiscount = 0; // Default no discount
    
    // Build the daily breakdown with corrected costs
    const daysData = buildItineraryDays();
    
    // Create trip data object for checkout
    const tripData = {
      summary: {
        from: tripSummary.startingPoint,
        to: tripSummary.destination,
        startDate: tripSummary.startDate,
        endDate: tripSummary.endDate,
        guests: tripSummary.guests,
        duration: tripSummary.numberOfDays
      },
      days: daysData,
      discountPercentage: userPointsDiscount,
      totalCost // This should match what's calculated in the checkout page now
    };
    
    // Verify the total cost matches the sum of all days' costs
    const sumOfDayCosts = daysData.reduce((sum, day) => sum + day.totalCost, 0);
    console.log("Sum of all day costs:", sumOfDayCosts);
    console.log("Total calculated cost:", totalCost);
    
    // Update trip status to 'checkout' in database
    await axios.patch(`https://voyaige-production.up.railway.app/api/trips/${tripId}`, {
      status: 'checkout',
      checkoutData: tripData
    });
    
    // Navigate to checkout page with tripId
    navigate('/checkout', { 
      state: { 
        tripId: tripId 
      } 
    });
  } catch (error) {
    console.error("Error proceeding to checkout:", error);
    setError("Failed to proceed to checkout. Please try again.");
  }
};

// Show loading spinner while data is being fetched
if (isLoading) {
  return (
    <div className="customization-container">
      <Navbar />
      <div className="content-wrapper loading-container">
        
        <p>Loading your trip details...</p>
      </div>
    </div>
  );
}

// Show error message if there was an error
if (error) {
  return (
    <div className="customization-container">
      <Navbar />
      <div className="content-wrapper error-container">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="customization-container">
    <Navbar />
    <div className="content-wrapper">
      <h2 className="customization-title">Your Trip Details</h2>
      
      <div className="trip-summary">
        <h3>Trip Summary</h3>
        <div className="summary-details">
          <div className="summary-col">
            <p><span>From:</span> {tripSummary.startingPoint}</p>
            <p><span>To:</span> {tripSummary.destination}</p>
            <p>
              <span>Budget:</span> 
              {tripSummary.guests === 1 ? " Economic" : tripSummary.guests === 2 ? " Normal" : tripSummary.guests === 3 ? " Luxury" : " N/A"}
            </p>
          </div>
          <div className="summary-col">
            <p><span>Start:</span> {formatDate(tripSummary.startDate)}</p>
            <p><span>End:</span> {formatDate(tripSummary.endDate)}</p>
            <p><span>Duration:</span> {tripSummary.numberOfDays} {tripSummary.numberOfDays === 1 ? 'Day' : 'Days'}</p>
          </div>
        </div>
      </div>
      
      {/* Trip-level Accommodation & Transport */}
      <div className="trip-accommodations">
        <div className="section-header">
          <h3>Accommodation & Transport</h3>
          <button className="edit-button" onClick={handleEditTripDetails}>
            <i className="fas fa-edit"></i> Edit
          </button>
        </div>
        
        <div className="trip-details-container">
          <div className="trip-detail-card">
            <div className="detail-icon">
              <i className="fas fa-hotel"></i>
            </div>
            <div className="detail-content">
              <h4>Hotel</h4>
              {tripDetails.hotel ? (
                <div className="detail-info">
                  <p className="detail-name">{getPropertyValue(tripDetails.hotel, 'name')}</p>
                  <p className="detail-price">{getPropertyValue(tripDetails.hotel, 'price')} PKR</p>
                  <p className="detail-rating">Rating: {getPropertyValue(tripDetails.hotel, 'rating')}/5</p>
                  {tripDetails.hotel.address && (
                    <p className="detail-address">{tripDetails.hotel.address}</p>
                  )}
                </div>
              ) : (
                <div className="no-detail-info">
                  <p>No hotel selected</p>
                  <button className="small-add-button" onClick={handleEditTripDetails}>
                    Add Hotel
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="trip-detail-card">
            <div className="detail-icon">
              <i className="fas fa-bus"></i>
            </div>
            <div className="detail-content">
              <h4>Transport</h4>
              {tripDetails.transport ? (
                <div className="detail-info">
                  <p className="detail-type">{getPropertyValue(tripDetails.transport, 'type', 'Vehicle')}</p>
                  <p className="detail-name">{
                    getPropertyValue(tripDetails.transport, 'name') || 
                    getPropertyValue(tripDetails.transport, 'car_name') || 
                    getPropertyValue(tripDetails.transport, 'bus_name') || 
                    getPropertyValue(tripDetails.transport, 'train_name')
                  }</p>
                  <p className="detail-price">{getPropertyValue(tripDetails.transport, 'price')} PKR</p>
                  <p className="detail-time">
                    {getPropertyValue(tripDetails.transport, 'departure_time')}
                    {tripDetails.transport.arrival_time && ` - ${tripDetails.transport.arrival_time}`}
                  </p>
                </div>
              ) : (
                <div className="no-detail-info">
                  <p>No transport selected</p>
                  <button className="small-add-button" onClick={handleEditTripDetails}>
                    Add Transport
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Day-by-Day Itinerary */}
      {tripSummary.numberOfDays > 0 && (
        <div className="days-section">
          <h3>Day-by-Day Itinerary</h3>
          <div className="days-grid">
            {getDaysArray().map(({ dayNumber, dayDate }, index) => {
              const details = dayDetails[dayNumber] || {};
              const options = getOptionsForDestination();
              
              return (
                <div key={index} className="day-card">
                  <div className="day-header">
                    <div className="day-number">DAY {dayNumber}</div>
                    <div className="day-date">{formatDate(dayDate)}</div>
                  </div>
                  
                  <div className="food-attractions-section">
                    <div className="select-container">
                      <label htmlFor={`lunch-day-${dayNumber}`}>Lunch:</label>
                      <select
                        id={`lunch-day-${dayNumber}`}
                        value={details.lunch || ''}
                        onChange={(e) => handleDetailChange(dayNumber, 'lunch', e.target.value)}
                        className="custom-select"
                      >
                        <option value="">Select Lunch Place</option>
                        {options.lunch.map((place, i) => (
                          <option key={i} value={place}>{place}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="select-container">
                      <label htmlFor={`dinner-day-${dayNumber}`}>Dinner:</label>
                      <select
                        id={`dinner-day-${dayNumber}`}
                        value={details.dinner || ''}
                        onChange={(e) => handleDetailChange(dayNumber, 'dinner', e.target.value)}
                        className="custom-select"
                      >
                        <option value="">Select Dinner Place</option>
                        {options.dinner.map((place, i) => (
                          <option key={i} value={place}>{place}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="select-container">
                      <label htmlFor={`attraction-day-${dayNumber}`}>Attraction:</label>
                      <select
                        id={`attraction-day-${dayNumber}`}
                        value={details.attraction || ''}
                        onChange={(e) => handleDetailChange(dayNumber, 'attraction', e.target.value)}
                        className="custom-select"
                      >
                        <option value="">Select Attraction</option>
                        {options.attractions.map((place, i) => (
                          <option key={i} value={place}>{place}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="selected-options">
                      {details.lunch && (
                        <div className="selected-item">
                          <span className="icon lunch-icon"><i className="fas fa-utensils"></i></span>
                          <span className="item-name">{details.lunch}</span>
                        </div>
                      )}
                      
                      {details.dinner && (
                        <div className="selected-item">
                          <span className="icon dinner-icon"><i className="fas fa-moon"></i></span>
                          <span className="item-name">{details.dinner}</span>
                        </div>
                      )}
                      
                      {details.attraction && (
                        <div className="selected-item">
                          <span className="icon attraction-icon"><i className="fas fa-map-marker-alt"></i></span>
                          <span className="item-name">{details.attraction}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Calculate and display total trip cost */}
      {(tripDetails.hotel || tripDetails.transport || Object.keys(dayDetails).length > 0) && (
        <div className="trip-cost-summary">
          <h3>Total Trip Cost</h3>
          {(() => {
            const { totalCost, hotelCost, transportCost, foodCost, attractionsCost } = calculateTotalCost();
            
            return (
              <div className="cost-breakdown">
                <div className="cost-grid">
                  <div className="cost-itemm">
                    <span className="cost-labell">Hotel:</span>
                    <span className="cost-value">{hotelCost.toLocaleString()} PKR</span>
                  </div>
                  <div className="cost-itemm">
                    <span className="cost-labell">Transport:</span>
                    <span className="cost-value">{transportCost.toLocaleString()} PKR</span>
                  </div>
                  <div className="cost-itemm">
                    <span className="cost-labell">Food:</span>
                    <span className="cost-value">{foodCost.toLocaleString()} PKR</span>
                  </div>
                  <div className="cost-itemm">
                    <span className="cost-labell">Attractions:</span>
                    <span className="cost-value">{attractionsCost.toLocaleString()} PKR</span>
                  </div>
                </div>
                <div className="total-cost">
                  <span>Total Cost:</span> {totalCost.toLocaleString()} PKR
                </div>
              </div>
            );
          })()}
        </div>
      )}
      
      <div className="action-buttons">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button 
          className="save-button"
          onClick={handleProceedToCheckout}
          disabled={!tripDetails.hotel || !tripDetails.transport || tripSummary.numberOfDays === 0}
        >
          Pay
        </button>
      </div>
    </div>
  </div>
);
};

export default UserCustomization;