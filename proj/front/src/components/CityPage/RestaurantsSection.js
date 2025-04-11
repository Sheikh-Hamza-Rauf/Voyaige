import React, { useEffect, useState } from 'react';
import './RestaurantsSection.css';
import { User } from 'lucide-react';

const RestaurantsSection = ({ cityName = "Islamabad" }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [currentRestaurantImageIndex, setCurrentRestaurantImageIndex] = useState(0);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('/restaurants_data.json');
                const data = await response.json();

                const cityRestaurants = data
                    .filter(restaurant => restaurant.city.toLowerCase() === cityName.toLowerCase())
                    .slice(-12,-6);

                setRestaurants(cityRestaurants);

                // Fetch reviews after fetching restaurants
                fetchReviews(cityRestaurants.map(r => r.restaurant_id));
            } catch (error) {
                console.error("Failed to fetch restaurant data:", error);
            }
        };

        const fetchReviews = async (restaurantIds) => {
            try {
                const response = await fetch('/restaurants_reviews.json');
                const data = await response.json();

                const filteredReviews = data
                    .filter(review => restaurantIds.includes(review.restaurant_id))
                    .map(review => ({
                        ...review,
                        rating: parseFloat(review.rating) || 0
                    }));

                setReviewsData(filteredReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchRestaurants();
    }, [cityName]);

    // Calculate average rating and total reviews for each restaurant
    const getRestaurantRating = (restaurantId) => {
        const restaurantReviews = reviewsData.filter(review => review.restaurant_id === restaurantId);
        const totalReviews = restaurantReviews.length;
        const averageRating = totalReviews
            ? (restaurantReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
            : 0;

        return { averageRating, totalReviews };
    };

    // Handle restaurant card click
    const handleRestaurantClick = (restaurant) => {
        const restaurantReviews = reviewsData.filter(review => review.restaurant_id === restaurant.restaurant_id);

        setSelectedRestaurant({
            ...restaurant,
            reviews: restaurantReviews
        });
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
    

    // Close detail card
    const closeDetailCard = () => setSelectedRestaurant(null);

    return (
        <section className="restaurants-section">
            <div className="section-header">
                <h2>Best Places to Eat in {cityName}</h2>
            </div>
            <div className="restaurants-list">
                {restaurants.map((restaurant, index) => {
                    const { averageRating, totalReviews } = getRestaurantRating(restaurant.restaurant_id);

                    return (
                        <div key={index} className="restaurant-card" onClick={() => handleRestaurantClick(restaurant)}>
                            <div 
                                className="restaurant-image" 
                                style={{ backgroundImage: `url(${restaurant.image[0] || '/placeholder.png'})` }}
                            >
                               
                            </div>
                            <div className="destination-restaurant-info">
                                <h3>{restaurant.name}</h3>
                                <div className="destination-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span 
                                            key={i} 
                                            className={`destination-star ${i < Math.floor(averageRating) ? 'filled' : ''}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <span className="destination-review-count">
                                        {totalReviews} reviews
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Overlay for detailed view */}
            {selectedRestaurant && (
                <div className="overlay">
                    <div className="trip-detail-restaurant-detail-card">
                        <button className="trip-detail-close-btn" onClick={closeDetailCard}>✕</button>
                        
                        {/* Display all images */}
                        <div className="trip-detail-restaurant-images">
                            {selectedRestaurant.image?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img || '/placeholder.png'}
                                    alt={selectedRestaurant.name}
                                    className="trip-detail-restaurant-detail-image"
                                />
                            ))}
                        </div>

                        {/* Section: Restaurant Details */}
                        <div className="trip-detail-restaurant-section">
                            <h2><i>{selectedRestaurant.name}</i></h2>
                            <p><strong>Description:</strong> {selectedRestaurant.description || "No description available"}</p>
                            <p><strong>📍 Address:</strong> {selectedRestaurant.address}</p>
                            <p><strong>📞 Phone Number:</strong> {selectedRestaurant.phone_number || "N/A"}</p>
                            <p><strong>🕒 Opening Time:</strong> {selectedRestaurant.Open_hour || "N/A"}</p>
                            <p><strong>⭐ Rating:</strong> {getRestaurantRating(selectedRestaurant.restaurant_id).averageRating} ({selectedRestaurant.reviews?.length} reviews)</p>
                            <p><strong>🛎️ Services Provided:</strong> {selectedRestaurant.service || "N/A"}</p>
                        </div>

                        {/* Section: Reviews */}
                        <div className="trip-detail-restaurant-section">
                            <h3>Reviews:</h3>
                            {selectedRestaurant.reviews?.length > 0 ? (
                                <ul className="trip-detail-review-list">
                                    {selectedRestaurant.reviews.map((review, idx) => (
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
        </section>
    );
};

export default RestaurantsSection;
