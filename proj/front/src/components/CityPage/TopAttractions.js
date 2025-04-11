import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './TopAttractions.css';

const TopAttractions = ({ cityName = "Islamabad" }) => {
    const [attractions, setAttractions] = useState([]);
    const [selectedAttraction, setSelectedAttraction] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const response = await fetch('/Cleaned_attr.csv');
                const data = await response.text();
                
                // Parse CSV using PapaParse
                Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const filteredAttractions = result.data
                            .map(attraction => ({
                                name: attraction.name?.trim(),
                                description: attraction.description?.trim(),
                                category: attraction.category?.trim(),
                                address: attraction.address?.trim(),
                                city: attraction.city?.trim(),
                                availability: attraction.availability?.trim(),
                                rating: parseFloat(attraction.rating) || 0,
                                images: [
                                    attraction.image1?.trim() || '/default-image.jpg',
                                    attraction.image2?.trim() || '/default-image.jpg',
                                    attraction.image3?.trim() || '/default-image.jpg'
                                ]
                            }))
                            .filter(attraction => attraction.city === cityName)
                            .slice(-6);
                        
                        setAttractions(filteredAttractions);
                    }
                });
            } catch (error) {
                console.error("Error fetching attractions:", error);
            }
        };

        fetchAttractions();
    }, [cityName]);

    // Function to open attraction details
    const openAttractionDetails = (attraction) => {
        setSelectedAttraction(attraction);
        setCurrentImageIndex(0); // Reset to the first image
    };

    // Function to close attraction details
    const closeAttractionDetails = () => {
        setSelectedAttraction(null);
    };

    // Function to navigate to next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % selectedAttraction.images.length
        );
    };

    // Function to navigate to previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex - 1 + selectedAttraction.images.length) % selectedAttraction.images.length
        );
    };

    return (
        <section className="top-attractions-page">
            <div className="attraction-section-header-page">
                <h2>Things to do in {cityName}</h2>
            </div>
            <div className="attractions-list-page">
                {attractions.map((attraction, index) => (
                    <div 
                        key={index} 
                        className="attraction-card-page"
                        onClick={() => openAttractionDetails(attraction)}
                    >
                        <div
                            className="attraction-image-page"
                            style={{ backgroundImage: `url(${attraction.images[0]})` }}
                        >
                
                        </div>
                        <div className="attraction-info-page">
                            <h3>{attraction.name}</h3>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < Math.floor(attraction.rating) ? 'filled' : ''}`}>★</span>
                                ))}
                                <span className="review-count">({attraction.rating.toFixed(1)})</span>
                            </div>
                            <p>{attraction.category}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Attraction Detail Modal */}
            {selectedAttraction && (
                <div className="attraction-detail-overlay" onClick={closeAttractionDetails}>
                    <div className="attraction-detail-card" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeAttractionDetails}>✖</button>
                        
                        {/* Image Carousel */}
                        <div className="image-gallery">
                            <button className="arrow left-arrow" onClick={prevImage}>❮</button>
                            <img 
                                src={selectedAttraction.images[currentImageIndex]} 
                                alt={`Attraction ${currentImageIndex + 1}`} 
                            />
                            <button className="arrow right-arrow" onClick={nextImage}>❯</button>
                        </div>

                        {/* Attraction Details */}
                       
                        {/* Attraction Details Section */}
                        <div className="destination-attraction-detail">
                            <h2>{selectedAttraction.name}</h2>
                            <p>
                                <strong>Description:</strong> {selectedAttraction.description || 'No description available'}
                            </p>
                            <p>📍 <strong>Address:</strong> {selectedAttraction.address}</p>
                            <p>📞 <strong>Phone:</strong> {selectedAttraction.phoneNumber || 'N/A'}</p>
                            <p>⭐ <strong>Rating:</strong> {selectedAttraction.rating.toFixed(1)}</p>
                            <p>
                                🏷️ <strong>Category:</strong> {selectedAttraction.category || 'N/A'}
                            </p>
                            <p>🕒 <strong>Availability:</strong> {selectedAttraction.availability || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TopAttractions;
