// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaHotel, FaUtensils, FaSearch, FaSpinner } from 'react-icons/fa';
// import logo from '../../assets/LOGO.png';
// import './Navbar.css';
// import axios from 'axios';

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState({ hotels: [], restaurants: [] });
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthentication = () => {
//       const token = localStorage.getItem('token');
//       setIsAuthenticated(!!token);
//     };

//     checkAuthentication();
//     window.addEventListener('storage', checkAuthentication);

//     return () => {
//       window.removeEventListener('storage', checkAuthentication);
//     };
//   }, []);

//   const signOut = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     navigate('/login');
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery) {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const { data } = await axios.get(`http://localhost:5000/api/search`, { params: { city: searchQuery } });
//         setSearchResults(data);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setError('An error occurred while searching. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <nav className="navbaar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           <img src={logo} alt="Logo" />
//           <span>Voyaige</span>
//         </Link>
//         <ul className="navbar-menu">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/tours">Tours</Link></li>
//           <li><Link to="/hotels">Hotels</Link></li>
//           <li><Link to="/restaurants">Eat & Drink</Link></li>
//         </ul>
//         <div className="navbar-actions">
//         <button onClick={() => setSearchOpen(!searchOpen)} className="search-button2">
//             <FaSearch /> {!searchOpen}
//           </button>
//           {isAuthenticated ? (
//             <button className="auth-button" onClick={signOut}>Log Out</button>
//           ) : (
//             <Link className="auth-button" to="/login">Sign In</Link>
//           )}

//         </div>
//       </div>
      
//       {searchOpen && (
//         <div className="search-box">
//           <form onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Search City"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? <FaSpinner className="spinner" /> : <FaSearch />}
//             </button>
//           </form>
//           {error && <p className="error-message">{error}</p>}
          
//           <div className="search-results">
//             {searchResults.hotels.length > 0 && (
//               <div className="result-section">
//                 <h3 className='heading3'>Hotels</h3>
//                 <div className="result-grid">
//                   {searchResults.hotels.map((hotel) => (
//                     <div className="result-card" key={hotel._id}>
                    
//                       <span>{hotel.name}</span>
//                     </div>
//                   ))}
//                 </div>
              
//               </div>
//             )}
//             {searchResults.restaurants.length > 0 && (
//               <div className="result-section">
//                 <h3 className='heading3'>Restaurants</h3>
//                 <div className="result-grid">
//                   {searchResults.restaurants.map((restaurant) => (
//                     <div className="result-card" key={restaurant._id}>
                     
//                       <span>{restaurant.name}</span>
//                     </div>
//                   ))}
//                 </div>
             
//               </div>
//             )}
//             {!isLoading && searchQuery && searchResults.hotels.length === 0 && searchResults.restaurants.length === 0 && (
//               <p className="no-results">No results found for "{searchQuery}"</p>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';
// import logo from '../../assets/LOGO.png';
// import './Navbar.css';

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const cities = [
//     "Islamabad",
//     "Lahore",
//     "Karachi",
//     "Murree",
//     "Peshawar",
//     "Skardu",
//     "Hunza",
//     "Quetta",
//     "Multan",
//     "Faisalabad",
//   ];

//   useEffect(() => {
//     const checkAuthentication = () => {
//       const token = localStorage.getItem('token');
//       setIsAuthenticated(!!token);
//     };

//     checkAuthentication();
//     window.addEventListener('storage', checkAuthentication);

//     return () => {
//       window.removeEventListener('storage', checkAuthentication);
//     };
//   }, []);

//   const signOut = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     navigate('/login');
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery) {
//       const cityFound = cities.find(city => city.toLowerCase() === searchQuery.toLowerCase());
//       if (cityFound) {
//         navigate(`/${cityFound}Page`);
//       } else {
//         setError(`No page found for "${searchQuery}"`);
//       }
//     }
//   };

//   return (
//     <nav className="navbaar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           <img src={logo} alt="Logo" />
//           <span>Voyaige</span>
//         </Link>
//         <ul className="navbar-menu">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/tours">Tours</Link></li>
//           <li><Link to="/hotels">Hotels</Link></li>
//           <li><Link to="/restaurants">Eat & Drink</Link></li>
//         </ul>
//         <div className="navbar-actions">
//           {isAuthenticated ? (
//             <button className="auth-button" onClick={signOut}>Log Out</button>
//           ) : (
//             <Link className="auth-button" to="/login">Sign In</Link>
//           )}
//           <button onClick={() => setSearchOpen(!searchOpen)} className="search-button2">
//             <FaSearch /> {!searchOpen}
//           </button>
//         </div>
//       </div>

//       {searchOpen && (
//         <div className="search-box">
//           <form onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Search City"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" disabled={isLoading}>
//               <FaSearch />
//             </button>
//           </form>
//           {error && <p className="error-message">{error}</p>}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;








// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaHotel, FaUtensils, FaSearch, FaSpinner } from 'react-icons/fa';
// import logo from '../../assets/LOGO.png';
// import './Navbar.css';
// import axios from 'axios';

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState({ hotels: [], restaurants: [] });
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [backgroundGray, setBackgroundGray] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthentication = () => {
//       const token = localStorage.getItem('token');
//       setIsAuthenticated(!!token);
//     };

//     checkAuthentication();
//     window.addEventListener('storage', checkAuthentication);

//     return () => {
//       window.removeEventListener('storage', checkAuthentication);
//     };
//   }, []);

//   useEffect(() => {
//     if (searchOpen) {
//       setBackgroundGray(true);
//     } else {
//       setBackgroundGray(false);
//     }
//   }, [searchOpen]);

//   const signOut = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     navigate('/login');
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery) {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const { data } = await axios.get(`http://localhost:5000/api/search`, { params: { city: searchQuery } });
//         setSearchResults(data);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setError('An error occurred while searching. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <nav className={`navbaar ${backgroundGray ? 'gray-background' : ''}`}>
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           <img src={logo} alt="Logo" />
//           <span>Voyaige</span>
//         </Link>
//         <ul className="navbar-menu">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/tours">Tours</Link></li>
//           <li><Link to="/hotels">Hotels</Link></li>
//           <li><Link to="/restaurants">Eat & Drink</Link></li>
//         </ul>
//         <div className="navbar-actions">
//           <button onClick={() => setSearchOpen(!searchOpen)} className="search-button2">
//             <FaSearch />
//           </button>
//           {isAuthenticated ? (
//             <button className="auth-button" onClick={signOut}>Log Out</button>
//           ) : (
//             <Link className="auth-button" to="/login">Sign In</Link>
//           )}
//         </div>
//       </div>

//       {searchOpen && (
//         <div className="search-box">
//           <form onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Search City"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? <FaSpinner className="spinner" /> : <FaSearch />}
//             </button>
//           </form>
//           {error && <p className="error-message">{error}</p>}
          
//           <div className="search-results">
//             {searchResults.hotels.length > 0 && (
//               <div className="result-section">
//                 <h3 className='heading3'>Hotels</h3>
//                 <div className="result-grid">
//                   {searchResults.hotels.map((hotel) => (
//                     <div className="result-card" key={hotel._id}>
//                       <span>{hotel.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {searchResults.restaurants.length > 0 && (
//               <div className="result-section">
//                 <h3 className='heading3'>Restaurants</h3>
//                 <div className="result-grid">
//                   {searchResults.restaurants.map((restaurant) => (
//                     <div className="result-card" key={restaurant._id}>
//                       <span>{restaurant.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {!isLoading && searchQuery && searchResults.hotels.length === 0 && searchResults.restaurants.length === 0 && (
//               <p className="no-results">No results found for "{searchQuery}"</p>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;








// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaHotel, FaUtensils, FaSearch, FaSpinner, FaMapMarkerAlt, FaWalking } from 'react-icons/fa';
// import logo from '../../assets/LOGO.png';
// import './Navbar.css';
// import axios from 'axios';

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState(null);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [backgroundGray, setBackgroundGray] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthentication = () => {
//       const token = localStorage.getItem('token');
//       setIsAuthenticated(!!token);
//     };

//     checkAuthentication();
//     window.addEventListener('storage', checkAuthentication);

//     return () => {
//       window.removeEventListener('storage', checkAuthentication);
//     };
//   }, []);

//   useEffect(() => {
//     setBackgroundGray(searchOpen);
//   }, [searchOpen]);

//   const signOut = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     navigate('/login');
//   };

//   const handleSearch = async (query) => {
//     setSearchQuery(query);
//     if (query.length >= 2) {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const { data } = await axios.get(`http://localhost:5000/api/search`, {
//           params: { query }
//         });
//         setSearchResults({
//           city: {
//             name: query,
//             path: `/city/${query.toLowerCase()}`,
//           },
//           hotels: data.hotels || [],
//           restaurants: data.restaurants || [],
//           thingsToDo: data.attractions || []
//         });
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setError('An error occurred while searching. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setSearchResults(null);
//     }
//   };

//   const handleCityClick = (cityName) => {
//     navigate(`/city/${cityName.toLowerCase()}`, { state: { cityName } });
//     setSearchOpen(false);
//     setSearchQuery('');
//   };

//   const handleSectionClick = (cityName, section) => {
//     navigate(`/city/${cityName.toLowerCase()}`, {
//       state: { cityName, scrollTo: section }
//     });
//     setSearchOpen(false);
//     setSearchQuery('');
//   };

//   return (
//     <nav className="navbaar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           <img src={logo} alt="Logo" />
//           <span>Voyaige</span>
//         </Link>
//         <ul className="navbar-menu">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/tours">Tours</Link></li>
//           <li><Link to="/hotels">Hotels</Link></li>
//           <li><Link to="/restaurants">Eat & Drink</Link></li>
//         </ul>
//         <div className="navbar-actions">
//           <button onClick={() => setSearchOpen(!searchOpen)} className="search-button2">
//             <FaSearch />
//           </button>
//           {isAuthenticated ? (
//             <button className="auth-button" onClick={signOut}>Log Out</button>
//           ) : (
//             <Link className="auth-button" to="/login">Sign In</Link>
//           )}
//         </div>
//       </div>

//       {searchOpen && (
//         <div className="nav-search-overlay">
//           <div className="nav-search-box">
//             <div className="nav-search-input-container">
//               <FaSearch className="nav-search-icon" />
//               <input
//                 type="text"
//                 placeholder="Search cities..."
//                 value={searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="nav-search-input"
//               />
//             </div>

//             {isLoading && (
//               <div className="nav-loading">
//                 <FaSpinner className="nav-spinner" />
//               </div>
//             )}
            
//             {error && <p className="nav-error-message">{error}</p>}
            
//             {searchResults && searchQuery && (
//               <div className="nav-search-recommendations">
//                 <div 
//                   className="nav-recommendation-item"
//                   onClick={() => handleCityClick(searchResults.city.name)}
//                 >
//                   <FaMapMarkerAlt className="nav-recommendation-icon" />
//                   <div className="nav-recommendation-content">
//                     <div className="nav-recommendation-title">{searchResults.city.name}</div>
//                     <div className="nav-recommendation-subtitle">City</div>
//                   </div>
//                 </div>

//                 <div 
//                   className="nav-recommendation-item"
//                   onClick={() => handleSectionClick(searchResults.city.name, 'hotels')}
//                 >
//                   <FaHotel className="nav-recommendation-icon" />
//                   <div className="nav-recommendation-content">
//                     <div className="nav-recommendation-title">Hotels</div>
//                     <div className="nav-recommendation-subtitle">in {searchResults.city.name}</div>
//                   </div>
//                 </div>

//                 <div 
//                   className="nav-recommendation-item"
//                   onClick={() => handleSectionClick(searchResults.city.name, 'attractions')}
//                 >
//                   <FaWalking className="nav-recommendation-icon" />
//                   <div className="nav-recommendation-content">
//                     <div className="nav-recommendation-title">Things to Do</div>
//                     <div className="nav-recommendation-subtitle">in {searchResults.city.name}</div>
//                   </div>
//                 </div>

//                 <div 
//                   className="nav-recommendation-item"
//                   onClick={() => handleSectionClick(searchResults.city.name, 'restaurants')}
//                 >
//                   <FaUtensils className="nav-recommendation-icon" />
//                   <div className="nav-recommendation-content">
//                     <div className="nav-recommendation-title">Restaurants</div>
//                     <div className="nav-recommendation-subtitle">in {searchResults.city.name}</div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHotel, FaUtensils, FaSearch, FaMapMarkerAlt, FaWalking, FaUser } from 'react-icons/fa';
import logo from '../../assets/LOGO.png';
import './Navbar.css';
import axios from 'axios';

const CITIES = ["Islamabad", "Lahore", "Karachi", "Murree", "Peshawar", "Skardu", "Hunza", "Quetta", "Multan", "Faisalabad"];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [error, setError] = useState(null);
  const [backgroundGray, setBackgroundGray] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [points, setPoints] = useState(0); // State for points
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      fetchUserPoints(token);
    }
  }, []);

  const fetchUserPoints = async (token) => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Get user details from localStorage
      if (!user || !user.email) {
        console.error('User email not found in localStorage');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/users/points', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token
          'X-User-Email': user.email,      // Pass the email in a custom header
        },
      });

      setPoints(response.data.points || 0); // Set points from MongoDB
    } catch (error) {
      console.error('Failed to fetch points:', error);
      setPoints(0); // Default to 0 if fetching fails
    }
  };

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

  useEffect(() => {
    setBackgroundGray(searchOpen);
  }, [searchOpen]);

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      setError(null);
      const matchedCity = CITIES.find(city => city.toLowerCase().includes(query.toLowerCase()));
      if (matchedCity) {
        try {
          const { data } = await axios.get('http://localhost:5000/api/search', {
            params: { query: matchedCity }
          });
          setSearchResults({
            city: {
              name: matchedCity,
              path: `/city/${matchedCity.toLowerCase()}`,
            },
            hotels: data.hotels || [],
            restaurants: data.restaurants || [],
            thingsToDo: data.attractions || []
          });
        } catch (error) {
          console.error('Error fetching search results:', error);
          setError('An error occurred while searching. Please try again.');
        }
      } else {
        setSearchResults(null);
        setError(`No results for "${query}"`);
      }
    } else {
      setSearchResults(null);
      setError(null);
    }
  };

  const handleCityClick = (cityName) => {
    navigate(`/city/${cityName.toLowerCase()}`, { state: { cityName } });
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleSectionClick = (cityName, section) => {
    navigate(`/city/${cityName.toLowerCase()}`, {
      state: { cityName, scrollTo: section }
    });
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbaar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
          <span>Voyaige</span>
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/city">Cities</Link></li>
          <li><Link to="/hotels">Hotels</Link></li>
          <li><Link to="/restaurants">Restaurants</Link></li>
        </ul>
        <div className="navbar-actions">
          <button 
            onClick={() => setSearchOpen(!searchOpen)} 
            className="search-button-circle"  
          >
            <FaSearch />
          </button>
          {isAuthenticated ? (
            <div className="profile-container">
              <button className="profile-button" onClick={handleProfileClick}>
                <FaUser />
              </button>
              {dropdownVisible && (
                <div className="profile-dropdown">
                  <ul>
                    <li>Points: {points}</li> {/* Display points dynamically */}
                    <li><button onClick={signOut}>Log Out</button></li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link className="auth-button" to="/login">Sign In</Link>
          )}
        </div>
      </div>

      {searchOpen && (
        <div className="nav-search-overlay">
          <div className="nav-search-box">
            <div className="nav-search-input-container">
              <input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="nav-search-input"
              />
            </div>

            {error && <p className="nav-error-message">{error}</p>}

            {searchResults && searchQuery && !error && (
              <div className="nav-search-recommendations">
                <div 
                  className="nav-recommendation-item"
                  onClick={() => handleCityClick(searchResults.city.name)}
                >
                  <FaMapMarkerAlt className="nav-recommendation-icon" />
                  <div className="nav-recommendation-content">
                    <div className="nav-recommendation-title">{searchResults.city.name}</div>
                    <div className="nav-recommendation-subtitle">City</div>
                  </div>
                </div>
                <div 
                  className="nav-recommendation-item"
                  onClick={() => handleSectionClick(searchResults.city.name, 'TopAttractions')}
                >
                  <FaWalking className="nav-recommendation-icon" />
                  <div className="nav-recommendation-content">
                    <div className="nav-recommendation-title">Things to Do</div>
                    <div className="nav-recommendation-subtitle">in {searchResults.city.name}</div>
                  </div>
                </div>
                <div 
                  className="nav-recommendation-item"
                  onClick={() => handleSectionClick(searchResults.city.name, 'HotelsSection')}
                >
                  <FaHotel className="nav-recommendation-icon" />
                  <div className="nav-recommendation-content">
                    <div className="nav-recommendation-title">Hotels</div>
                    <div className="nav-recommendation-subtitle">in {searchResults.city.name}</div>
                  </div>
                </div>
                <div 
                  className="nav-recommendation-item"
                  onClick={() => handleSectionClick(searchResults.city.name, 'RestaurantsSection')}
                >
                  <FaUtensils className="nav-recommendation-icon" />
                  <div className="nav-recommendation-content">
                    <div className="nav-recommendation-title">Restaurants</div>
                    <div className="nav-recommendation-subtitle">in {searchResults.city.name}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


