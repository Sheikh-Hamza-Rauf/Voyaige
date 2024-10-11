import React, { useState, useRef } from 'react';
import './ToursSection.css';

const ToursSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const tours = [
    {
      id: 1,
      title: "KARACHI",
      image: "https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg",
      category: "City",
      description: "Id placerat tacitmates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
      price: 54,
      duration: "1h 30min",
      rating: 8.9,
      reviews: 350
    },
    // Add more tour objects here...
    {
        id: 1,
        title: "KARACHI",
        image: "https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg",
        category: "City",
        description: "Id placerat tacitmates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
        price: 54,
        duration: "1h 30min",
        rating: 8.9,
        reviews: 350
      },
      {
        id: 1,
        title: "KARACHI",
        image: "https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg",
        category: "City",
        description: "Id placerat tacitmates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
        price: 54,
        duration: "1h 30min",
        rating: 8.9,
        reviews: 350
      },
      {
        id: 1,
        title: "KARACHI",
        image: "https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg",
        category: "City",
        description: "Id placerat tacitmates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
        price: 54,
        duration: "1h 30min",
        rating: 8.9,
        reviews: 350
      },
      {
        id: 1,
        title: "KARACHI",
        image: "https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg",
        category: "City",
        description: "Id placerat tacitmates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
        price: 54,
        duration: "1h 30min",
        rating: 8.9,
        reviews: 350
      },
      {
        id: 1,
        title: "KARACHI",
        image: "https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg",
        category: "City",
        description: "Id placerat tacitmates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.",
        price: 54,
        duration: "1h 30min",
        rating: 8.9,
        reviews: 350
      },

  ];

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      carouselRef.current.scrollTo({
        left: (activeIndex - 1) * 580,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (activeIndex < tours.length - 1) {
      setActiveIndex(activeIndex + 1);
      carouselRef.current.scrollTo({
        left: (activeIndex + 1) * 580,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="tours_section">
      <div className="container">
        <div className="main_title">
          <h2>Our Popular Tours</h2>
          <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
        </div>
        <div className="tours_carousel" ref={carouselRef}>
          {tours.map((tour, index) => (
            <div key={tour.id} className="tour_item">
              <div className="box_grid">
                <figure>
                  <img src={tour.image} alt={tour.title} />
                  <div className="read_more"><span>Read more</span></div>
                  <small>{tour.category}</small>
                </figure>
                <div className="wrapper">
                  <h3>{tour.title}</h3>
                  <p>{tour.description}</p>
                  <span className="price">From <strong>${tour.price}</strong> /per person</span>
                </div>
                <ul>
                  <li><i className="icon_clock_alt"></i> {tour.duration}</li>
                  <li><i className="icon_like"></i> {tour.rating} ({tour.reviews} reviews)</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel_controls">
          <button onClick={handlePrev} className="prev">&lt;</button>
          <button onClick={handleNext} className="next">&gt;</button>
        </div>
        <div className="carousel_indicators">
          {tours.map((_, index) => (
            <span 
              key={index} 
              className={index === activeIndex ? 'active' : ''}
              onClick={() => {
                setActiveIndex(index);
                carouselRef.current.scrollTo({
                  left: index * 280,
                  behavior: 'smooth'
                });
              }}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;