import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AllTrips.css';
import Navbar from '../NavBar/Navbar';

const AllTrips = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trips } = location.state; // Receive trips with city data

  // Scroll to top when the page is opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewDetails = (trip) => {
    navigate('/trip-details', {
      state: {
        cityData: trip.cityData,
        tripTitle: trip.title,
        tripImage: trip.image
      },
    });
  };

  return (
    <section className="all_trips">
      <Navbar />
      <div className="container">
        <h2>All Pre-Planned Trips</h2>
        <div className="trips_list">
          {trips.map((trip) => (
            <div className="trip_card" key={trip.id}>
              <img src={trip.image} alt={trip.title} />
              <div className="trip_info">
                <h3>{trip.title}</h3>
                <p>{trip.description}</p>
                <button onClick={() => handleViewDetails(trip)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllTrips;
