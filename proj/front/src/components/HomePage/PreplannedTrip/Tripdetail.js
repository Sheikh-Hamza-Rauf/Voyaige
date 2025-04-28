import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import './Tripdetail.css';
import Navbar from '../../NavBar/Navbar';
import { User } from 'lucide-react';

const TripDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cityData, tripTitle, tripImage } = location.state || {};
  const [reviewsData, setReviewsData] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [HotelReviewsData, setHotelReviewsData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentAttractionImageIndex, setCurrentAttractionImageIndex] = useState(0);
  const [currentRestaurantImageIndex, setCurrentRestaurantImageIndex] = useState(0);

  useEffect(() => {
     window.scrollTo(0, 0);
   
     // Fetch restaurant reviews data from JSON file
     const fetchReviews = async () => {
       try {
         const response = await fetch('/restaurants_reviews.json');
         const data = await response.json();
   
         // Convert ratings to numbers and calculate average ratings
         const formattedReviews = data.map((review) => ({
           ...review,
           rating: parseFloat(review.rating) || 0, // Convert rating to number
         }));
   
         setReviewsData(formattedReviews);
       } catch (error) {
         console.error('Error fetching reviews:', error);
       }
     };
   // Fetch restaurant reviews data from JSON file
   const fetchHotelReviews = async () => {
     try {
       const response = await fetch('/hotel_reviews.json');
       const data = await response.json();
 
       // Convert ratings to numbers and calculate average ratings
       const formattedHotelReviews = data.map((review) => ({
         ...review,
         rating: parseFloat(review.rating) || 0, // Convert rating to number
       }));
 
       setHotelReviewsData(formattedHotelReviews);
     } catch (error) {
       console.error('Error fetching reviews:', error);
     }
   };
 
 
     fetchReviews();
     fetchHotelReviews();
     
    
    
   }, [cityData]); // Re-fetch when cityData change
 
  // Calculate total price based on hotel prices and number of days for each city
  useEffect(() => {
   if (cityData) {
     let total = 0;
     cityData.forEach((city) => {
       if (city.hotels && city.hotels.length > 0) {
         const hotelPrice = city.hotels[0].price; // Assuming there's only one hotel per city
         total += hotelPrice * city.days;
       }
     });
     setTotalPrice(total);
   }
 }, [cityData]);
  
 
  // Function to calculate the average rating of a restaurant
  const calculateAverageRating = (restaurantId) => {
   const restaurantReviews = reviewsData.filter(
     (review) => review.restaurant_id === restaurantId
     
   );
   if (restaurantReviews.length === 0) return 0;
 
   // Calculate the average rating using _.mean
   const averageRating = _.mean(restaurantReviews.map((review) => review.rating));
   return averageRating.toFixed(1); // Round to 1 decimal place
 };
 
 // Function to get reviews for a restaurant
 const getRestaurantReviews = (restaurantId) => {
   return reviewsData.filter((review) => review.restaurant_id === restaurantId);
 };
  
  // Function to calculate the average rating of a restaurant
  const calculateAverageHotelRating = (hotelId) => {
   const HotelReviews = HotelReviewsData.filter(
     (review) => review.hotel_id === hotelId
     
   );
   if (HotelReviews.length === 0) return 0;
   // Calculate the average rating using _.mean
   const averageHotelRating = _.mean(HotelReviews.map((review) => review.rating)); 
   return averageHotelRating.toFixed(1); // Round to 1 decimal place
 };
 
 // Function to get reviews for a restaurant
 const getHotelReviews = (hotelId) => {
   
   return HotelReviewsData.filter((review) => review.hotel_id === hotelId);
 };
 
   // Handle restaurant click
   const handleRestaurantClick = (restaurant) => {
     const reviews = getRestaurantReviews(restaurant.id);
     setSelectedRestaurant({ 
       ...restaurant, 
       reviews, 
       rating: calculateAverageRating(restaurant.id) 
     });
   };
 
   const handleAttractionClick = (attraction) => {
     setSelectedAttraction(attraction);
   };
 
 
 // Handle restaurant click
 
   const handleHotelClick = (hotel) => {
     const hotelReviews = getHotelReviews(hotel.hotel_id);
     setSelectedHotel({ 
       ...hotel, 
       reviews: hotelReviews,
       rating: calculateAverageHotelRating(hotel.hotel_id) 
     });
   };
   const handlePrevImage = () => {
     setCurrentImageIndex((prevIndex) =>
       prevIndex === 0 ? selectedHotel.images.length - 1 : prevIndex - 1
     );
   };
 
   const handleNextImage = () => {
     setCurrentImageIndex((prevIndex) =>
       prevIndex === selectedHotel.images.length - 1 ? 0 : prevIndex + 1
     );
   };  
 
 
 const closeHotelCard = () => {setSelectedHotel(null)};
 
   const closeDetailCard = () => {
     setSelectedRestaurant(null);
     setSelectedAttraction(null);
   };
 
   const handleNextRestaurantImage = () => {
     setCurrentRestaurantImageIndex((prevIndex) =>
       prevIndex === selectedRestaurant.images.length - 1 ? 0 : prevIndex + 1
     );
   };
 
   const handlePrevRestaurantImage = () => {
     setCurrentRestaurantImageIndex((prevIndex) =>
       prevIndex === 0 ? selectedRestaurant.images.length - 1 : prevIndex - 1
     );
   };
 
   const handleNextAttractionImage = () => {
     setCurrentAttractionImageIndex((prevIndex) =>
       prevIndex === selectedAttraction.images.length - 1 ? 0 : prevIndex + 1
     );
   };
 
   const handlePrevAttractionImage = () => {
     setCurrentAttractionImageIndex((prevIndex) =>
       prevIndex === 0 ? selectedAttraction.images.length - 1 : prevIndex - 1
     );
   };
   const fallbackDescriptions = [
     'A cozy dining spot offering a delightful blend of flavors, perfect for savoring both traditional and modern dishes.',
     'With a warm ambiance and attentive service, it’s an ideal place for casual meals or special occasions.',
     'The menu features fresh, locally sourced ingredients, ensuring every bite is a memorable experience.'
   ];

  const handleBooking = async () => {
    if (!cityData || !tripTitle) {
      alert('Missing trip data');
      return;
    }
  
    const userData = JSON.parse(localStorage.getItem('user'));
    const userEmail = userData?.email;
  
    if (!userEmail) {
      alert('User not logged in. Please log in to book the trip.');
      return;
    }
  
    const bookingData = {
      tripTitle,
      email: userEmail,
      cityBookings: cityData.map((city) => ({
        cityName: city.cityName,
        days: city.days,
      })),
    };
  
    try {
      const response = await fetch('https://voyaige-production.up.railway.app/api/users/add-preplanned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
  
      if (response.ok) {
        const hotelData = cityData.map((city) => ({
          hotelName: city.hotels[0]?.name || 'Unknown',
          hotelPrice: city.hotels[0]?.price || 0,
        }));
  
        navigate('/checkout2', { state: { hotelData, totalPrice } });
      } else {
        const data = await response.json();
        alert(`Failed to book trip: ${data.message}`);
      }
    } catch (error) {
      console.error('Error booking trip:', error);
      alert('An error occurred while booking the trip');
    }
  };
  

  // Split data by days and limit to 4 items max per day
  const splitDataByDays = (items, days) => {
    const itemsPerDay = Math.ceil(items.length / days);
    return Array.from({ length: days }, (_, i) =>
      items.slice(i * itemsPerDay, (i + 1) * itemsPerDay).slice(0, 4) // Limit to 4 items per day
    );
  };

  return (
    <div className="trip-details-page">
      <Navbar />
      {tripImage && (
        <div className="trip-detail-trip-image-container">
          <img src={tripImage} alt={tripTitle} className="trip-detail-trip-image" />
        </div>
      )}
      {tripTitle && <h1 className="trip-detail-trip-title">{tripTitle}</h1>}

      {cityData?.map((city, index) => {
        const splitRestaurants = splitDataByDays(city.restaurants || [], city.days);
        const splitAttractions = splitDataByDays(city.attractions || [], city.days);

        return (
          <div className="trip-detail-city-section" key={index}>
            <h2 className="trip-detail-city-name">
              {city.days} Days in {city.cityName}
            </h2>

            {Array.from({ length: city.days }, (_, dayIndex) => (
              <div key={dayIndex} className="trip-detail-day-section">
                <h3>Day {dayIndex + 1}</h3>

                {/* Restaurants */}
                <h4>Restaurants</h4>
                <div className="trip-detail-list-container">
                  {splitRestaurants[dayIndex]?.map((restaurant, idx) => {
                    const avgRating = calculateAverageRating(restaurant.id);
                    return (
                      <div
                        key={idx}
                        className="trip-detail-list-item"
                        onClick={() => handleRestaurantClick(restaurant)}
                      >
                        <div className="trip-detail-hover-card">
                          <img
                            src={encodeURI(restaurant.images?.[0]) || '/placeholder.png'}
                            alt={restaurant.name}
                            className="trip-detail-card-image"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop in case fallback fails
                              e.target.src =
                                'https://cdn.vectorstock.com/i/preview-2x/44/16/spoon-and-fork-abstract-logo-graphic-food-icon-vector-26574416.webp';
                            }}
                          />
                          <div className="trip-detail-hover-card-content">
                            <h4>{restaurant.name}</h4>
                            <p>⭐ Rating : {avgRating} ({getRestaurantReviews(restaurant.id).length} reviews)</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Attractions */}
                <h4>Attractions</h4>
                <div className="trip-detail-list-container">
                  {splitAttractions[dayIndex]?.map((attraction, idx) => (
                    <div
                      key={idx}
                      className="trip-detail-list-item"
                      onClick={() => handleAttractionClick(attraction)}
                    >
                      <div className="trip-detail-hover-card">
                        <img
                          src={attraction.images?.[0] || '/placeholder.png'}
                          alt={attraction.name}
                          className="trip-detail-card-image"
                        />
                        <div className="trip-detail-hover-card-content">
                          <h4>{attraction.name}</h4>
                          <p>⭐ Rating: {attraction.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Hotels Section */}
            <h3>Hotels</h3>
            <div className="trip-detail-list-container">
              {city.hotels?.map((hotel, idx) => {
                const avgHotelRating = calculateAverageHotelRating(hotel.hotel_id);

                return (
                  <div key={idx} className="trip-detail-list-item" onClick={() => handleHotelClick(hotel)}>
                    <div className="trip-detail-hover-card">
                      <img
                        src={hotel.images?.[0] || '/placeholder.png'}
                        alt={hotel.name}
                        className="trip-detail-card-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.png';
                        }}
                      />
                      <div className="trip-detail-hover-card-content">
                        <h4>{hotel.name}</h4>
                        <p>⭐ Rating : {avgHotelRating} ({getHotelReviews(hotel.hotel_id).length} reviews)</p>
                        {hotel.price && <p>💰 {hotel.price}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* BOOK NOW BUTTON */}
      <button className="trip-detail-booking" onClick={handleBooking}>
        BOOK NOW ({totalPrice > 0 ? `💰 Rs ${totalPrice.toFixed(2)}` : 'Calculating...'})
      </button>
   
         {selectedRestaurant && (
           <div className="overlay">
             <div className="trip-detail-restaurant-detail-card">
               <button className="trip-detail-close-btn" onClick={closeDetailCard}>✕</button>
               
               <img
                 src={selectedRestaurant.images?.[0] || '/placeholder.png'}
                 alt={selectedRestaurant.name}
                 className="trip-detail-restaurant-detail-image"
               />
   
               {/* Section: Restaurant Details */}
               <div className="trip-detail-restaurant-section">
                 <h2><i>{selectedRestaurant.name}</i></h2>
                 <p> Description : 
                     {selectedRestaurant.description ||
                   fallbackDescriptions[Math.floor(Math.random() * fallbackDescriptions.length)]} </p>
                 <p>📍Address : {selectedRestaurant.address}</p>
                 <p>📞 Phone Number : {selectedRestaurant.phoneNumber}</p>
                 <p>🕒 Opning Time : {selectedRestaurant.openHour}</p>
                 <p>⭐ Rating: {selectedRestaurant.rating} ({selectedRestaurant.reviews.length} reviews)</p>
                 <p>🛎️Services Provided : {selectedRestaurant.service}</p>
               
               </div>
   
               {/* Section: Reviews */}
               <div className="trip-detail-restaurant-section">
                 <h3>Reviews:</h3>
                 {selectedRestaurant.reviews.length > 0 ? (
                   <ul className="trip-detail-review-list">
                     {selectedRestaurant.reviews.map((review, idx) => (
                       <li key={idx} className="trip-detail-review-item">
                         <div className="review-header">
                           {/* Circular User Icon */}
                           <div className="profile-icon-circle">
                             <User className="profile-icon" />
                           </div>
                           <div className="review-info">
                             <strong>{review.username}</strong>
                             <div className="rating">
                               {'★'.repeat(Math.round(review.rating))}
                               {'☆'.repeat(5 - Math.round(review.rating))}
                               <span>({review.rating})</span>
                             </div>
                           </div>
                         </div>
                         <p>{review.review}</p>
                       </li>
                     ))}
                   </ul>
                 ) : (
                   <p>No reviews available.</p>
                 )}
               </div>
             </div>
           </div>
         )}
   
   {selectedHotel && (
     <div className="overlay">
       <div className="trip-detail-hotel-detail-card scrollable-card">
         <button className="trip-detail-close-btn" onClick={closeHotelCard}>✕</button>
          {/* Image Carousel */}
          {selectedHotel.images?.length > 0 && (
                 <div className="trip-detail-hotel-detail-image">
                   <button className="carousel-arrow-hotel left-arrow" onClick={handlePrevImage}>
                     ❮
                   </button>
                   <img
                     src={selectedHotel.images[currentImageIndex]}
                     alt={selectedHotel.name}
                     className="trip-detail-hotel-detail-image"
                   />
                   <button className="carousel-arrow-hotel right-arrow" onClick={handleNextImage}>
                     ❯
                   </button>
                 </div>
               )}
         {/* Section: Hotel Details */}
         <div className="trip-detail-hotel-section">
           <h2><i>{selectedHotel.name}</i></h2>
           <p>
             Description: {selectedHotel.description ||
               fallbackDescriptions[Math.floor(Math.random() * fallbackDescriptions.length)]}
           </p>
           <p>📍Address : {selectedHotel.address}</p>
           <p>📞 Phone Number : {selectedHotel.phoneNumber}</p>
           <p>⭐ Rating: {selectedHotel.rating} ({selectedHotel.reviews.length} reviews)</p>
           <p>🛎️Services Provided : {selectedHotel.facilities}</p>
         </div>
   
         {/* Section: Reviews */}
         <div className="trip-detail-restaurant-section">
           <h3>Reviews:</h3>
           {selectedHotel.reviews.length > 0 ? (
             <ul className="trip-detail-review-list">
               {selectedHotel.reviews.map((review, idx) => (
                 <li key={idx} className="trip-detail-review-item">
                   <div className="review-header">
                     <div className="profile-icon-circle">
                       <User className="profile-icon" />
                     </div>
                     <div className="review-info">
                       <strong>{review.username}</strong>
                       <div className="rating">
                         {'★'.repeat(Math.round(review.rating))}
                         {'☆'.repeat(5 - Math.round(review.rating))}
                         <span>({review.rating})</span>
                       </div>
                     </div>
                   </div>
                   <p>{review.review_text}</p>
                 </li>
               ))}
             </ul>
           ) : (
             <p>No reviews available.</p>
           )}
         </div>
       </div>
     </div>
   )}
      {/* Attraction Detail Card */}
      {selectedAttraction && (
           <div className="overlay">
             <div className="trip-detail-attraction-detail-card">
               <button className="trip-detail-close-btn" onClick={closeDetailCard}>
                 ✕
               </button>
               {selectedAttraction.images?.length > 0 && (
                 <div className="trip-detail-attraction-detail-image">
                   <button className="carousel-arrow-attraction left-arrow" onClick={handlePrevAttractionImage}>
                     ❮
                   </button>
                   <img
                     src={selectedAttraction.images[currentAttractionImageIndex]}
                     alt={selectedAttraction.name}
                     className="trip-detail-attraction-detail-image"
                   />
                   <button className="carousel-arrow-attraction right-arrow" onClick={handleNextAttractionImage}>
                     ❯
                   </button>
                 </div>
               )}
               <div className="trip-detail-restaurant-section">
                 <h2>{selectedAttraction.name}</h2>
                 <p>
                   Description: {selectedAttraction.description || 'No description available'}
                 </p>
                 <p>📍 Address: {selectedAttraction.address}</p>
                 <p>📞 Phone: {selectedAttraction.phoneNumber || 'N/A'}</p>
                 <p>⭐ Rating: {selectedAttraction.rating}</p>
                 <p>
                   🏷️ Category: {selectedAttraction.category || 'N/A'}
                 </p>
                 <p>🕒 Availability: {selectedAttraction.availability || 'N/A'}</p>
               </div>
             </div>
           </div>
         )}
        
   
       </div>
     );
   };
   
   
   export default TripDetails;
   