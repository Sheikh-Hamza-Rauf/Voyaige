import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHotel, FaUtensils, FaSearch, FaSpinner } from 'react-icons/fa';
import logo from '../../assets/LOGO.png';
import './Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ hotels: [], restaurants: [] });
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
    window.addEventListener('storage', checkAuthentication);

    return () => {
      window.removeEventListener('storage', checkAuthentication);
    };
  }, []);

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/search`, { params: { city: searchQuery } });
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('An error occurred while searching. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
          <span>Voyaige</span>
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tours">Tours</Link></li>
          <li><Link to="/hotels">Hotels</Link></li>
          <li><Link to="/restaurants">Eat & Drink</Link></li>
        </ul>
        <div className="navbar-actions">
          {isAuthenticated ? (
            <button className="auth-button" onClick={signOut}>Log Out</button>
          ) : (
            <Link className="auth-button" to="/login">Sign In</Link>
          )}
          <button onClick={() => setSearchOpen(!searchOpen)} className="search-button2">
            <FaSearch /> {!searchOpen}
          </button>
        </div>
      </div>
      
      {searchOpen && (
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? <FaSpinner className="spinner" /> : <FaSearch />}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          
          <div className="search-results">
            {searchResults.hotels.length > 0 && (
              <div className="result-section">
                <h3>Hotels</h3>
                <ul>
                  {searchResults.hotels.map((hotel) => (
                    <li key={hotel._id}>
                      <FaHotel className="result-icon" /> {hotel.name}
                    </li>
                  ))}
                </ul>
                <Link to={`/search/hotels?city=${searchQuery}`} className="view-all-link">View all hotels</Link>
              </div>
            )}
            {searchResults.restaurants.length > 0 && (
              <div className="result-section">
                <h3>Restaurants</h3>
                <ul>
                  {searchResults.restaurants.map((restaurant) => (
                    <li key={restaurant._id}>
                      <FaUtensils className="result-icon" /> {restaurant.name}
                    </li>
                  ))}
                </ul>
                <Link to={`/search/restaurants?city=${searchQuery}`} className="view-all-link">View all restaurants</Link>
              </div>
            )}
            {!isLoading && searchQuery && searchResults.hotels.length === 0 && searchResults.restaurants.length === 0 && (
              <p className="no-results">No results found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

