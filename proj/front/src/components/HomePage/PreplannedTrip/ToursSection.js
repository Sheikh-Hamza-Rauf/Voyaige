
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ToursSection.css';
import Navbar from '../../NavBar/Navbar';
import trips from './packagedata';
import Papa from 'papaparse';
import { cosineSimilarity } from './similarity'; 


const ToursSection = () => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [userPastTrips, setUserPastTrips] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [recommendedTrips, setRecommendedTrips] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState([]);

    // Fetch user email from local storage
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email) {
        setUserEmail(storedUser.email);
      }
    }, []);
  
    // Fetch attractions data
    useEffect(() => {
      const fetchAttractions = async () => {
        try {
          const response = await fetch('/Cleaned_attr.csv');
          if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);
          const text = await response.text();
          const result = Papa.parse(text, { header: true, skipEmptyLines: true });
  
          const cleanedData = result.data.map((item) => ({
            name: item.name || '',
            description: item.description || '',
            category: item.category || '',
            address: item.address || '',
            city: item.city || '',
            availability: item.availability || '',
            rating: parseFloat(item.rating) || 0,
            images: [
              item.image1 ? item.image1.trim() : null,
              item.image2 ? item.image2.trim() : null,
              item.image3 ? item.image3.trim() : null,
            ].filter(Boolean),
          }));
  
          setAttractions(cleanedData);
        } catch (error) {
          console.error('Error fetching or parsing attractions:', error);
        }
      };
  
      fetchAttractions();
    }, []);
  
    useEffect(() => {
      const fetchRestaurants = async () => {
        try {
          const response = await fetch('/restaurants_data.json');
          const data = await response.json();
  
          const cleanedRestaurants = data.map((restaurant) => ({
            id: restaurant.restaurant_id || '',
            _id: restaurant._id?.$oid || restaurant._id || '', // Handle $oid format
            name: restaurant.name || '',
            address: restaurant.address || '',
            phoneNumber: restaurant.phone_number || '',
            service: restaurant.service || '',
            openHour: restaurant.Open_hour || '',
            city: restaurant.city || '',
            rating: parseFloat(restaurant.rating) || 0,
            images: Array.isArray(restaurant.image) ? restaurant.image : [],
          }));
  
          setRestaurants(cleanedRestaurants);
        } catch (error) {
          console.error('Error fetching or parsing restaurants:', error);
        }
      };
  
      fetchRestaurants();
    }, []);
    
    useEffect(() => {
      // If the user is not logged in, show the first 4 packages
      if (!userEmail) {
        console.log("User not logged in. Displaying default trips.");
        setRecommendedTrips(trips.slice(0, 4));
        return;
      }
    
      // If attractions data is not loaded yet, return
      if (attractions.length === 0) return;
    
      const fetchPastTrips = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/past-trips?email=${userEmail}`);
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch past trips');
          }
    
          if (data.length === 0) {
            console.log("No past trips found. Displaying default trips.");
            // If no past trips, set recommendedTrips to the first 4 packages from trips
            setRecommendedTrips(trips.slice(0, 4));
            return;
          }
    
          // Step 1: Sort past trips by start date (latest first)
          const sortedTrips = data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    
          // Step 2: Select the latest two trips
          const latestTrips = sortedTrips.slice(0, 2);
          console.log("Latest Two Past Trips:", latestTrips);
    
          // Step 3: Create City Vectors
          const cityVectors = {};
          attractions.forEach(attr => {
            if (!cityVectors[attr.city]) {
              cityVectors[attr.city] = {};
            }
            cityVectors[attr.city][attr.category] = (cityVectors[attr.city][attr.category] || 0) + 1;
          });
    
          let mostSimilarCities = new Set();
    
          latestTrips.forEach(trip => {
            console.log(`Processing Destination: ${trip.destination}`);
            const destinationVector = cityVectors[trip.destination] || {};
    
            // Step 4: Compute Cosine Similarity for All Cities (Excluding the destination itself)
            const similarityScores = Object.keys(cityVectors)
              .filter(city => city !== trip.destination)
              .map(city => ({
                city,
                similarity: cosineSimilarity(destinationVector, cityVectors[city])
              }))
              .sort((a, b) => b.similarity - a.similarity)
              .slice(0, 4); // Get top 4 most similar cities
    
            console.log(`Top 4 Most Similar Cities to ${trip.destination}:`, similarityScores);
    
            // Add the top similar cities to the set
            similarityScores.forEach(sim => mostSimilarCities.add(sim.city));
          });
    
          // Step 5: Find Trip Packages Containing the Most Similar Cities
          const tripMatches = trips.map(trip => {
            const matchedCities = trip.cities.filter(city => mostSimilarCities.has(city.name));
            return { trip, matchCount: matchedCities.length, matchedCities };
          });
    
          // Step 6: Sort trips based on the number of matching similar cities and select the top 4
          const topTrips = tripMatches
            .sort((a, b) => b.matchCount - a.matchCount)
            .slice(0, 4);
    
          console.log('Top Matching Trip Packages:', topTrips);
          setRecommendedTrips(topTrips.map(item => item.trip));
    
        } catch (error) {
          console.error('Error fetching past trips:', error);
        }
      };
    
      fetchPastTrips();
    }, [userEmail, attractions]);

  // Fetch hotels data
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/clean_hotel_data.json');
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching or parsing hotels:', error);
      }
    };
    fetchHotels();
  }, []);

 // Handle view details for a trip
 const handleViewDetails = (trip) => {
  setLoading(true);
  try {
    const cityData = trip.cities.map((city) => {
      const cityAttractions = attractions
        .filter(attr => attr.city === city.name)
        .slice(0, 7); // Fetch only first 7 attractions

      const cityRestaurants = restaurants
        .filter(restaurant => restaurant.city === city.name)
        .slice(-8); // Fetch last 8 restaurants

      // Fetch only one hotel for the city
      const cityHotels = hotels
        .filter(hotel => hotel.city === city.name)
        .slice(-13, -12); // Fetch only the first hotel

      return {
        cityName: city.name,
        days: city.days,
        hotels: cityHotels, // Only one hotel is sent
        restaurants: cityRestaurants,
        attractions: cityAttractions,
      };
    });

    navigate('/trip-details', {
      state: {
        cityData,
        tripTitle: trip.title,
        tripImage: trip.image,
        allAttractions: attractions, // Pass all fetched attractions
        allRestaurants: restaurants, // Pass all fetched restaurants
        allHotels: hotels, // Pass all fetched hotels (for future use if needed)
      },
    });
  } catch (error) {
    console.error('Error handling trip details:', error);
  } finally {
    setLoading(false);
  }
};

// Handle view all trips
const handleViewAll = () => {
  const enrichedTrips = trips.map((trip) => ({
    ...trip,
    cityData: trip.cities.map((city) => {
      const cityAttractions = attractions
        .filter(attr => attr.city === city.name)
        .slice(0, 7); // Fetch only first 7 attractions

      const cityRestaurants = restaurants
        .filter(restaurant => restaurant.city === city.name)
        .slice(-8); // Fetch last 8 restaurants

      // Fetch only one hotel for the city
      const cityHotels = hotels
        .filter(hotel => hotel.city === city.name)
        .slice(-13,-12); // Fetch only the first hotel

      return {
        cityName: city.name,
        days: city.days,
        hotels: cityHotels, // Only one hotel is sent
        restaurants: cityRestaurants,
        attractions: cityAttractions,
      };
    }),
  }));

  navigate('/all-trips', {
    state: { 
      trips: enrichedTrips,
      allAttractions: attractions, // Pass all attractions to all-trips
      allRestaurants: restaurants, // Pass all restaurants to all-trips
      allHotels: hotels, // Pass all hotels to all-trips (for future use if needed)
    },
  });
};

return (
  <section className="preplanned_trips-section">
    <Navbar />
    <div className="container-preplanned">
      <h2>Pre-Planned Trips</h2>
      <p>Choose from our exciting pre-planned trips for an unforgettable adventure.</p>
      <p className="view-more-preplanned" onClick={handleViewAll}>
        View More
      </p>

      <div className="trips_list-preplanned">
        {recommendedTrips.map((trip) => (
          <div className="trip_card-preplanned" key={trip.id}>
            <img src={trip.image} alt={trip.title} />
            <div className="trip_info-preplanned">
              <h3>{trip.title}</h3>
              <p>{trip.description}</p>
              <button onClick={() => handleViewDetails(trip)} disabled={loading}>
                {loading ? 'Loading...' : 'View Details'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
};

export default ToursSection;