// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import hotelData from "./images/clean_hotel_data.json";
// import "./BookHotel.css";
// import defaultImage from "./images/hotel.jpg";
// import Navbar from "../NavBar/Navbar";

// const ConfirmationModal = ({ hotel, onConfirm, onCancel }) => {
//   return (
//     <div className="confirmation-modal">
//       <div className="modal-content">
//         <h2>Confirm Booking</h2>
//         <p>Are you sure you want to book <strong>{hotel.name}</strong>?</p>
//         <p><strong>Price:</strong> {hotel.price} PKR per night</p>
//         <div className="modal-buttons">
//           <button className="confirm-btnnn" onClick={onConfirm}>Yes, Book Now</button>
//           <button className="cancel-btnnn" onClick={onCancel}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BookHotel = () => {
//   const [hotels, setHotels] = useState([]);
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { customizationData, currentDetails, tripId } = location.state || {};

//   // Get destination city from customizationData
//   const destinationCity = customizationData?.destination || "";

//   useEffect(() => {
//     // Filter hotels by destination city and add ratings
//     const filteredHotels = hotelData
//       .filter(hotel => hotel.city && hotel.city.toLowerCase() === destinationCity.toLowerCase())
//       .map(hotel => ({
//         ...hotel,
//         rating: hotel.rating || (Math.random() * (5 - 4) + 4).toFixed(1), // Generate high ratings between 4-5
//       }))
//       .sort((a, b) => b.rating - a.rating) // Sort by highest rating
//       .slice(0, 5); // Take only top 5 hotels

//     setHotels(filteredHotels);
//   }, [destinationCity]);

//   const handleHotelSelect = (hotel) => {
//     setSelectedHotel(hotel);
//   };

//   const handleClosePopUp = () => {
//     setSelectedHotel(null);
//   };

//   const handleBooking = () => {
//     setShowConfirmation(true);
//   };

//   const confirmBooking = () => {
//     setShowConfirmation(false);
    
//     // Navigate back to booking options with the selected hotel
//     navigate("/bookoption", {
//       state: {
//         customizationData,
//         currentDetails: { 
//           ...currentDetails,
//           hotel: selectedHotel
//         },
//         tripId
//       }
//     });
//   };

//   return (
//     <div className="book-hotel-container">
//       <Navbar />
 

//       <div className="trans">
//         <h2>Book a Hotel in {destinationCity}</h2>

//         <div className="hotel-list">
//           {hotels.length > 0 ? (
//             hotels.map((hotel) => (
//               <div className="hotel-card" key={hotel.id} onClick={() => handleHotelSelect(hotel)}>
//                 {/* <img src={(hotel.images && hotel.images[0]) || defaultImage} alt={hotel.name} className="hotel-image" /> */}
//                 <h3>{hotel.name}</h3>
//                 <div className="hotel-info">
//                   <p><span className="rating-stars">{'★'.repeat(Math.round(hotel.rating))}</span> {hotel.rating}/5</p>
//                   <p>{hotel.price} PKR per night</p>
//                   <p className="hotel-location">{hotel.city}</p>
//                 </div>
//                 <button className="book-btn">View Details</button>
//               </div>
//             ))
//           ) : (
//             <div className="no-hotels">
//               <p>No hotels found in {destinationCity}. Please try another destination.</p>
//             </div>
//           )}
//         </div>

//         {selectedHotel && (
//           <div className="hotel-popup">
//             <div className="popup-content">
//               <button className="clos-btn" onClick={handleClosePopUp}>&times;</button>
//               <h2>{selectedHotel.name}</h2>
//               <div className="popup-images">
//                 {selectedHotel.images && selectedHotel.images.slice(0, 3).map((img, index) => (
//                   <img key={index} src={img || defaultImage} alt={`Hotel ${index + 1}`} className="popup-image" />
//                 ))}
//                 {(!selectedHotel.images || selectedHotel.images.length === 0) && (
//                   <img src={defaultImage} alt="Default Hotel" className="popup-image" />
//                 )}
//               </div>
//               <div className="hotel-details">
//                 <p><strong>Rating:</strong> <span className="rating-stars">{'★'.repeat(Math.round(selectedHotel.rating))}</span> {selectedHotel.rating}/5</p>
//                 <p><strong>Price:</strong> {selectedHotel.price} PKR per night</p>
//                 <p><strong>Location:</strong> {selectedHotel.city}</p>
//                 <p><strong>Address:</strong> {selectedHotel.address || ""}</p>
//                 <p><strong>Description:</strong> {selectedHotel.description || "Luxury hotel with modern amenities and excellent service."}</p>
//                 <p><strong>Facilities:</strong> {selectedHotel.facilities ? selectedHotel.facilities.join(", ") : "WiFi, AC, Swimming Pool, Gym, Restaurant, Room Service"}</p>
//               </div>
//               <button className="book-btn" onClick={handleBooking}>Book Now</button>
//             </div>
//           </div>
//         )}

//         {showConfirmation && selectedHotel && (
//           <ConfirmationModal
//             hotel={selectedHotel}
//             onConfirm={confirmBooking}
//             onCancel={() => setShowConfirmation(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookHotel;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import hotelData from "./images/clean_hotel_data.json";
import "./BookHotel.css";
import defaultImage from "./images/hotel.jpg";
import Navbar from "../NavBar/Navbar";

const BhConfirmationModal = ({ hotel, onConfirm, onCancel }) => {
  return (
    <div className="bh-confirmation-modal">
      <div className="bh-modal-content">
        <h2 className="bh-modal-title">Confirm Booking</h2>
        <p className="bh-modal-text">Are you sure you want to book <strong>{hotel.name}</strong>?</p>
        <p className="bh-modal-price"><strong>Price:</strong> {hotel.price} PKR per night</p>
        <div className="bh-modal-buttons">
          <button className="bh-confirm-booking-btn" onClick={onConfirm}>Yes, Book Now</button>
          <button className="bh-cancel-booking-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const BhHotelCard = ({ hotel, onClick }) => {
  return (
    <div className="bh-hotel-card" onClick={onClick}>
      <div className="bh-hotel-image-container">
        <img 
          src={(hotel.images && hotel.images[0]) || defaultImage} 
          alt={hotel.name} 
          className="bh-hotel-image" 
        />
      </div>
      <div className="bh-hotel-details">
        <h3 className="bh-hotel-name">{hotel.name}</h3>
        <div className="bh-hotel-info">
          <p className="bh-hotel-rating">
            <span className="bh-rating-stars">{'★'.repeat(Math.round(hotel.rating))}</span> 
            {hotel.rating}/5
          </p>
          <p className="bh-hotel-price">{hotel.price} PKR per night</p>
          <p className="bh-hotel-location">
            <span className="bh-location-icon">📍</span> {hotel.city}
          </p>
        </div>
        <button className="bh-view-details-btn">View Details</button>
      </div>
    </div>
  );
};

const BhHotelPopup = ({ hotel, onClose, onBookNow }) => {
  return (
    <div className="bh-hotel-popup">
      <div className="bh-popup-content">
        <button className="bh-close-popup-btn" onClick={onClose}>&times;</button>
        <h2 className="bh-popup-title">{hotel.name}</h2>
        
        <div className="bh-popup-image-container">
          <img 
            src={(hotel.images && hotel.images[0]) || defaultImage} 
            alt={hotel.name} 
            className="bh-popup-image" 
          />
        </div>
        
        <div className="bh-hotel-full-details">
          <div className="bh-detail-item">
            <span className="bh-detail-label">Rating</span>
            <div className="bh-detail-value">
              <span className="bh-rating-stars">{'★'.repeat(Math.round(hotel.rating))}</span> 
              {hotel.rating}/5
            </div>
          </div>
          
          <div className="bh-detail-item">
            <span className="bh-detail-label">Price</span>
            <div className="bh-detail-value">{hotel.price} PKR per night</div>
          </div>
          
          <div className="bh-detail-item">
            <span className="bh-detail-label">Location</span>
            <div className="bh-detail-value">{hotel.city}</div>
          </div>
          
          <div className="bh-detail-item">
            <span className="bh-detail-label">Address</span>
            <div className="bh-detail-value">{hotel.address || "Address information not available"}</div>
          </div>
          
          <div className="bh-detail-item" style={{ gridColumn: "1 / -1" }}>
            <span className="bh-detail-label">Description</span>
            <div className="bh-detail-value">
              {hotel.description || "Luxury hotel with modern amenities and excellent service."}
            </div>
          </div>
          
          <div className="bh-detail-item" style={{ gridColumn: "1 / -1" }}>
            <span className="bh-detail-label">Facilities</span>
            <div className="bh-facilities-list">
              {(hotel.facilities || ["WiFi", "AC", "Swimming Pool", "Gym", "Restaurant", "Room Service"])
                .map((facility, index) => (
                  <span key={index} className="bh-facility-tag">{facility}</span>
                ))
              }
            </div>
          </div>
        </div>
        
        <button className="bh-book-now-btn" onClick={onBookNow}>Book Now</button>
      </div>
    </div>
  );
};

const BookHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { customizationData, currentDetails, tripId } = location.state || {};

  // Get destination city from customizationData
  const destinationCity = customizationData?.destination || "";

  useEffect(() => {
    setIsLoading(true);
    // Filter hotels by destination city and add ratings
    const filteredHotels = hotelData
      .filter(hotel => hotel.city && hotel.city.toLowerCase() === destinationCity.toLowerCase())
      .map(hotel => ({
        ...hotel,
        rating: hotel.rating || (Math.random() * (5 - 4) + 4).toFixed(1), // Generate high ratings between 4-5
      }))
      .sort((a, b) => b.rating - a.rating) // Sort by highest rating
      .slice(0, 5); // Take only top 5 hotels

    setHotels(filteredHotels);
    setIsLoading(false);
  }, [destinationCity]);

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleClosePopUp = () => {
    setSelectedHotel(null);
  };

  const handleBooking = () => {
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    setShowConfirmation(false);
    
    // Navigate back to booking options with the selected hotel
    navigate("/bookoption", {
      state: {
        customizationData,
        currentDetails: { 
          ...currentDetails,
          hotel: selectedHotel
        },
        tripId
      }
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bh-container">
      <Navbar />
      
      <div className="bh-back-button" onClick={handleGoBack}>
        &#8592;
      </div>

      <h1 className="bh-page-title">
        Book a Hotel in <span className="bh-destination">{destinationCity}</span>
      </h1>

      {isLoading ? (
        <div className="bh-loading">Loading hotels...</div>
      ) : (
        <div className="bh-hotel-grid">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <BhHotelCard 
                key={hotel.id} 
                hotel={hotel} 
                onClick={() => handleHotelSelect(hotel)} 
              />
            ))
          ) : (
            <div className="bh-no-hotels">
              <p>No hotels found in {destinationCity}. Please try another destination.</p>
            </div>
          )}
        </div>
      )}

      {selectedHotel && (
        <BhHotelPopup 
          hotel={selectedHotel} 
          onClose={handleClosePopUp} 
          onBookNow={handleBooking} 
        />
      )}

      {showConfirmation && selectedHotel && (
        <BhConfirmationModal
          hotel={selectedHotel}
          onConfirm={confirmBooking}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default BookHotel;