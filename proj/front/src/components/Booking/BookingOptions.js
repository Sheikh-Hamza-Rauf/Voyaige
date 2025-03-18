// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../NavBar/Navbar";
// import transportImg from "./images/transport.png";
// import hotelImg from "./images/hotel.jpg";
// import airbnbImg from "./images/airbnb.jpg";
// import "./BookingOptions.css";
// import { FaEdit } from "react-icons/fa";

// const BookingOptions = () => {
//   // State for selected hotel and transport (load from localStorage)
//   const [selectedHotel, setSelectedHotel] = useState(
//     JSON.parse(localStorage.getItem("selectedHotel")) || null
//   );
//   const [selectedTransport, setSelectedTransport] = useState(
//     JSON.parse(localStorage.getItem("selectedTransport")) || null
//   );

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { tripDetails, dayIndex, dayData } = location.state || {};

//   // Handle editing the hotel selection
//   const handleEditHotel = () => {
//     navigate("/BookHotel");
//   };

//   // Confirm Booking and Send Data Back to UserCustomization
//   const handleConfirmBooking = () => {
//     const updatedDayData = {
//       ...dayData,
//       transport: selectedTransport,
//       accommodation: selectedHotel,
//       cost: calculateTotalPrice(),
//     };

//     const bookingData = {
//       selectedHotel,
//       selectedTransport,
//       totalPrice: calculateTotalPrice(),
//       tripDetails,
//       dayIndex,
//       updatedDayData,
//     };

//     // Navigate back to UserCustomization with all booking data
//     navigate("/UserCustomization", { state: { bookingData } });
//   };

//   // Update localStorage whenever hotel or transport is selected
//   useEffect(() => {
//     if (selectedHotel) {
//       localStorage.setItem("selectedHotel", JSON.stringify(selectedHotel));
//     }
//     if (selectedTransport) {
//       localStorage.setItem("selectedTransport", JSON.stringify(selectedTransport));
//     }
//   }, [selectedHotel, selectedTransport]);

//   // Calculate total price
//   const calculateTotalPrice = () => {
//     let totalPrice = 0;
//     if (selectedHotel?.price) totalPrice += parseFloat(selectedHotel.price) || 0;
//     if (selectedTransport?.price) totalPrice += parseFloat(selectedTransport.price) || 0;
//     return totalPrice;
//   };

//   return (
//     <div className="container">
//       <Navbar />

//       {/* Back Arrow Icon */}
//       <div className="back-arrow" onClick={() => navigate("/UserCustomization")}>
//         ←
//       </div>

//       {/* Centered Heading */}
//       <div className="center-heading">
//       </div>

//       {/* Booking Options */}
//       <div className="booking-options">
//         <div className="option-card">
//           <h3>1. Customize Transport</h3>
//           <img src={transportImg} alt="Transport" />
//           {selectedTransport ? (
//             <div className="booked-transport">
//               <p><strong>Transport Selected:</strong> {selectedTransport.name || selectedTransport.car_name || selectedTransport.bus_name || selectedTransport.train_name}</p>
//               <p>Departure: {selectedTransport.departure_time || "N/A"}</p>
//               <p>Price: {selectedTransport.price ? `${selectedTransport.price} PKR` : "Price Not Available"}</p>
//               <button className="edit-btn" onClick={() => navigate("/BookTransport")}>
//                 <FaEdit /> Edit
//               </button>
//             </div>
//           ) : (
//             <Link to="/BookTransport" className="explore-btn">
//               Explore
//             </Link>
//           )}
//         </div>

//         <div className="option-card">
//           <h3>2. Book a Hotel</h3>
//           <img src={hotelImg} alt="Hotel" />
//           {selectedHotel ? (
//             <div className="booked-hotel">
//               <p><strong>Hotel Booked:</strong> {selectedHotel.name}</p>
//               <p>Rating: {selectedHotel.rating} / 5</p>
//               <p>Price: {selectedHotel.price} Rs per night</p>
//               <p>Status: <span style={{ color: "green" }}>✔</span> Booked</p>
//               <button className="edit-btn" onClick={handleEditHotel}>
//                 <FaEdit /> Edit
//               </button>
//             </div>
//           ) : (
//             <Link to="/BookHotel" className="explore-btn">
//               Explore
//             </Link>
//           )}
//         </div>

//         <div className="option-card">
//           <h3>3. Book an Airbnb</h3>
//           <img src={airbnbImg} alt="Airbnb" />
//           <Link to="/BookAirbnb" className="explore-btn">
//             Explore
//           </Link>
//         </div>
//       </div>

//       {/* Confirm Button */}
//       <div className="confirm-btn-container">
//         <button className="confirm-btn" onClick={handleConfirmBooking}>
//           Confirm: {calculateTotalPrice()} PKR ➔
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingOptions;



import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import transportImg from "./images/transport.png";
import hotelImg from "./images/hotel.jpg";
import "./BookingOptions.css";
import { FaEdit } from "react-icons/fa";

const BookingOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customizationData, currentDetails, tripId } = location.state || {};
  
  // Initialize state with current details from UserCustomization if available
  const [selectedHotel, setSelectedHotel] = useState(currentDetails?.hotel || null);
  const [selectedTransport, setSelectedTransport] = useState(currentDetails?.transport || null);
  const [error, setError] = useState("");

  // Validate that we have trip data
  useEffect(() => {
    if (!customizationData && !tripId) {
      setError("Missing trip information. Please go back and try again.");
    } else {
      setError("");
    }
  }, [customizationData, tripId]);

  // Handle booking transport
  const handleBookTransport = () => {
    if (!customizationData && !tripId) {
      setError("Cannot proceed without trip information.");
      return;
    }
    
    navigate("/BookTransport", { 
      state: { 
        customizationData,
        currentTransport: selectedTransport,
        tripId,
        returnTo: '/bookoption'
      } 
    });
  };

  // Handle booking hotel
  const handleBookHotel = () => {
    if (!customizationData && !tripId) {
      setError("Cannot proceed without trip information.");
      return;
    }
    
    navigate("/BookHotel", { 
      state: { 
        customizationData,
        currentHotel: selectedHotel,
        tripId,
        returnTo: '/bookoption'
      } 
    });
  };

  // Handle edit transport selection
  const handleEditTransport = () => {
    handleBookTransport();
  };

  // Handle edit hotel selection
  const handleEditHotel = () => {
    handleBookHotel();
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    
    if (selectedHotel?.price) {
      const hotelPrice = parseFloat(selectedHotel.price);
      if (!isNaN(hotelPrice)) {
        totalPrice += hotelPrice;
      }
    }
    
    if (selectedTransport?.price) {
      const transportPrice = parseFloat(selectedTransport.price);
      if (!isNaN(transportPrice)) {
        totalPrice += transportPrice;
      }
    }
    
    return totalPrice.toLocaleString();
  };

  // Listen for incoming data from child components
  useEffect(() => {
    if (location.state?.selectedHotel) {
      setSelectedHotel(location.state.selectedHotel);
    }
    
    if (location.state?.selectedTransport) {
      setSelectedTransport(location.state.selectedTransport);
    }
  }, [location.state]);

  // Confirm selections and navigate back to UserCustomization
  const handleConfirmBooking = () => {
    if (!selectedHotel && !selectedTransport) {
      setError("Please select at least one hotel or transport option before confirming.");
      return;
    }
    
    navigate("/UserCustomization", { 
      state: { 
        customizationData,
        bookingData: {
          selectedHotel,
          selectedTransport
        },
        tripId
      } 
    });
  };

  // Go back to UserCustomization without changes
  const handleGoBack = () => {
    navigate("/UserCustomization", { state: { tripId } });
  };

  return (
    <div className="container">
      <Navbar />

      {/* Back Arrow Icon */}
      <div className="back-arrow" onClick={handleGoBack}>
        ←
      </div>

      {/* Centered Heading */}
      <div className="center-heading">
        <h2>Book Your Trip Options</h2>
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Booking Options */}
      <div className="booking-options">
        <div className="option-card">
          <h3>1. Select Transport</h3>
          <img src={transportImg} alt="Transport" />
          {selectedTransport ? (
            <div className="booked-transport">
              <p><strong>Transport Selected:</strong> {selectedTransport.type || "Vehicle"}</p>
              <p>Name: {selectedTransport.name || 
                         selectedTransport.car_name || 
                         selectedTransport.bus_name || 
                         selectedTransport.train_name || 
                         "N/A"}</p>
              <p>Departure: {selectedTransport.departure_time || "N/A"}</p>
              <p>Price: {selectedTransport.price ? `${selectedTransport.price} PKR` : "Price Not Available"}</p>
              <button className="edit-btn" onClick={handleEditTransport}>
                <FaEdit /> Edit Selection
              </button>
            </div>
          ) : (
            <button onClick={handleBookTransport} className="explore-btn">
              Choose Transport
            </button>
          )}
        </div>

        <div className="option-card">
          <h3>2. Select Hotel</h3>
          <img src={hotelImg} alt="Hotel" />
          {selectedHotel ? (
            <div className="booked-hotel">
              <p><strong>Hotel Selected:</strong> {selectedHotel.name}</p>
              <p>Rating: {selectedHotel.rating || "N/A"} / 5</p>
              <p>Price: {selectedHotel.price ? `${selectedHotel.price} PKR` : "Price Not Available"}</p>
              <p>Status: <span style={{ color: "green" }}>✔</span> Selected</p>
              <button className="edit-btn" onClick={handleEditHotel}>
                <FaEdit /> Edit Selection
              </button>
            </div>
          ) : (
            <button onClick={handleBookHotel} className="explore-btn">
              Choose Hotel
            </button>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="confirm-btn-container">
        <button 
          className="confirm-btn" 
          onClick={handleConfirmBooking}
          disabled={!selectedHotel && !selectedTransport}
        >
          Confirm: {calculateTotalPrice()} PKR ➔
        </button>
      </div>
    </div>
  );
};

export default BookingOptions;