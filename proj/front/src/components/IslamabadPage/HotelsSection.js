import React from 'react';

import './HotelsSection.css';

const HotelsSection = () => {
    const hotels = [
        { name: "Hotel Hillview Islamabad", rating: 4.5, reviews: 263, price: 82, image: "path_to_hillview_image.jpg" },
        { name: "The 108 Hotel", rating: 5, reviews: 153, price: null, image: "path_to_108_hotel_image.jpg" },
        { name: "Ramada by Wyndham Islamabad", rating: 4.5, reviews: 573, price: 130, image: "path_to_ramada_image.jpg" },
        { name: "Islamabad Serena Hotel", rating: 4.5, reviews: 1030, price: 270, image: "path_to_serena_image.jpg" },
        { name: "Islamabad Marriott Hotel", rating: 4, reviews: 590, price: 181, image: "path_to_marriott_image.jpg" },
        { name: "Best Western Premier Islamabad", rating: 4, reviews: 59, price: null, image: "path_to_best_western_image.jpg" },
    ];

    return (
        <section className="hotels-section">
            <div className="section-header">
                <h2>Places to stay</h2>
                <a href="#" className="see-all">See all</a>
            </div>
            <div className="hotels-list">
                {hotels.map((hotel, index) => (
                    <div key={index} className="hotel-card">
                        <div className="hotel-image" style={{backgroundImage: `url(${hotel.image})`}}>
                            <button className="favorite-button"><i className = "fa fa-heart" /></button>
                            <div className="image-dots">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`dot ${i === 0 ? 'active' : ''}`}></span>
                                ))}
                            </div>
                        </div>
                        <div className="hotel-info">
                            <h3>{hotel.name}</h3>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < Math.floor(hotel.rating) ? 'filled' : ''}`}>★</span>
                                ))}
                                <span className="review-count">{hotel.reviews}</span>
                            </div>
                            {hotel.price && (
                                <p className="price">from ${hotel.price}/night</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HotelsSection;