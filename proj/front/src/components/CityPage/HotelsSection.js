import React, { useEffect, useState } from 'react';
import './HotelsSection.css';
import { User } from 'lucide-react';

const HotelsSection = ({ cityName = "Islamabad" }) => {
    const [hotels, setHotels] = useState([]);
    const [hotelReviewsData, setHotelReviewsData] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [popupActive, setPopupActive] = useState(false);
    const [currentHotelImageIndex, setCurrentRestaurantImageIndex] = useState(0);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('/clean_hotel_data.json');
                const data = await response.json();

                const filteredHotels = data
                    .filter(hotel => hotel.city?.toLowerCase() === cityName.toLowerCase())
                    .slice(6, 12);

                setHotels(filteredHotels);

                const hotelIds = filteredHotels.map(hotel => hotel.hotel_id);
                if (hotelIds.length > 0) {
                    fetchHotelReviews(hotelIds);
                }
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };

        const fetchHotelReviews = async (hotelIds) => {
            try {
                const response = await fetch('/hotel_reviews.json');
                const data = await response.json();

                const filteredReviews = data
                    .filter(review => hotelIds.includes(review.hotel_id))
                    .map(review => ({
                        id: review._id?.$oid,
                        hotel_id: review.hotel_id,
                        city: review.city,
                        username: review.username,
                        rating: parseFloat(review.rating) || 0,
                        review_text: review.review_text || ""
                    }));

                setHotelReviewsData(filteredReviews);
            } catch (error) {
                console.error('Error fetching hotel reviews:', error);
            }
        };

        fetchHotels();
    }, [cityName]);

    const getHotelRating = (hotelId) => {
        const hotelReviews = hotelReviewsData.filter(review => review.hotel_id === hotelId);
        const totalReviews = hotelReviews.length;
        const averageRating = totalReviews
            ? (hotelReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
            : 0;

        return { averageRating, totalReviews };
    };

    const handleHotelClick = (hotel) => {
        const hotelReviews = hotelReviewsData.filter(review => review.hotel_id === hotel.hotel_id);

        setSelectedHotel({
            ...hotel,
            reviews: hotelReviews
        });

        setPopupActive(true);
    };

    const closePopup = () => {
        setPopupActive(false);
        setTimeout(() => setSelectedHotel(null), 300);
    };
    const handleNextHotelImage = () => {
        setCurrentRestaurantImageIndex((prevIndex) =>
          prevIndex === selectedHotel.images.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const handlePrevHotelImage = () => {
        setCurrentRestaurantImageIndex((prevIndex) =>
          prevIndex === 0 ? selectedHotel.images.length - 1 : prevIndex - 1
        );
      };
    return (
        <section className="hotels-section-page">
            <div className="section-header-page">
                <h2>Places to stay in {cityName}</h2>
            </div>
            <div className="hotels-list-page">
                {hotels.map((hotel, index) => {
                    const { averageRating, totalReviews } = getHotelRating(hotel.hotel_id);

                    return (
                        <div 
                            key={index} 
                            className="hotel-card-page" 
                            onClick={() => handleHotelClick(hotel)}
                        >
                            <div 
                                className="hotel-image-page" 
                                style={{ backgroundImage: `url(${hotel.images?.[0] || '/default-hotel.jpg'})` }}
                            ></div>

                            <div className="hotel-info-page">
                                <h3>{hotel.name}</h3>
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`star ${i < Math.round(averageRating) ? 'filled' : ''}`}>★</span>
                                    ))}
                                    <span className="review-count">{totalReviews} reviews</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedHotel && (
    <div className="destination-hotel-detail-overlay">
        <div className="destination-hotel-detail-card">
            <button className="destination-hotel-detail-close-btn" onClick={closePopup}>✕</button>

            {selectedHotel.images?.length > 0 && (
                <div className="destination-hotel-detail-image">
                    <button className="carousel-arrow-hotel left-arrow" onClick={handlePrevHotelImage}>
                        ❮
                    </button>
                    <img
                        src={selectedHotel.images[currentHotelImageIndex]}
                        alt={selectedHotel.name}
                        className="destination-hotel-detail-image"
                    />
                    <button className="carousel-arrow-hotel right-arrow" onClick={handleNextHotelImage}>
                        ❯
                    </button>
                </div>
            )}

            <div className="destination-hotel-detail-section">
                <h2><i>{selectedHotel.name}</i></h2>
                <p><strong>Description:</strong> {selectedHotel.description || "No description available"}</p>
                <p><strong>📍 Address:</strong> {selectedHotel.address}</p>
                <p><strong>⭐ Rating:</strong> {getHotelRating(selectedHotel.hotel_id).averageRating} ({selectedHotel.reviews?.length} reviews)</p>
                <p><strong>🛎️ Services Provided:</strong> {selectedHotel.facilities || "N/A"}</p>
            </div>

            <div className="destination-hotel-detail-section">
                <h3>Reviews:</h3>
                {selectedHotel.reviews?.length > 0 ? (
                    <ul className="destination-hotel-detail-review-list">
                        {selectedHotel.reviews.map((review, idx) => (
                            <li key={idx} className="destination-hotel-detail-review-item">
                                <div className="destination-hotel-detail-review-header">
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

        </section>
    );
};

export default HotelsSection;
