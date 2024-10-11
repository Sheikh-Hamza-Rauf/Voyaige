import React from 'react';

import './TopAttractions.css';

const TopAttractions = () => {
    const attractions = [
        { name: "Faisal Mosque", description: "Religious Sites", rating: 4.5, reviews: 812, image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Faisal_Masjid_From_Damn_e_koh.jpg" },
        { name: "Margalla Hills", description: "Geologic Formations, Mountains", rating: 5, reviews: 323, image: "https://media-cdn.tripadvisor.com/media/photo-s/16/51/09/79/margalla-hills-is-the.jpg" },
        { name: "Daman-e-Koh", description: "Lookouts", rating: 4.5, reviews: 287, image: "https://guidetopakistan.pk/wp-content/uploads/2021/10/Daman-e-koh1.jpg" },
        { name: "Pakistan Monument Museum", description: "Specialty Museums", rating: 4.5, reviews: 234, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Blue_Hour_at_Pakistan_Monument.jpg/1200px-Blue_Hour_at_Pakistan_Monument.jpg" },
        { name: "Saidpur Village", description: "Neighborhoods", rating: 4, reviews: 230, image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Saidpur_Village%2C_Islamabad_Capital_Territory%2C_P1090833_tonemapped.jpg" },
        { name: "Lake View Park", description: "Parks", rating: 4, reviews: 94, image: "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2020/07/Lake-View-Park-Islamabad-B-10-07-1024x640.jpg" },
    ];

    return (
        <section className="top-attractions">
            <div className="section-header">
                <h2>Things to do</h2>
                <a href="#" className="see-all">See all</a>
            </div>
            <div className="attractions-list">
                {attractions.map((attraction, index) => (
                    <div key={index} className="attraction-card">
                        <div className="attraction-image" style={{backgroundImage: `url(${attraction.image})`}}>
                            <button className="favorite-button"><i className = "fa fa-heart" /></button>
                            <div className="image-dots">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`dot ${i === 0 ? 'active' : ''}`}></span>
                                ))}
                            </div>
                        </div>
                        <div className="attraction-info">
                            <h3>{attraction.name}</h3>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < Math.floor(attraction.rating) ? 'filled' : ''}`}>★</span>
                                ))}
                                <span className="review-count">{attraction.reviews}</span>
                            </div>
                            <p>{attraction.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopAttractions;