import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "./BookAirbnb.css";
import airbnbImage from "./images/airbnb.jpg"; // Placeholder image
import Navbar from "../NavBar/Navbar";

const BookAirbnb = () => {
  const [airbnbs, setAirbnbs] = useState([]);
  const [filteredAirbnbs, setFilteredAirbnbs] = useState([]);
  const [selectedAirbnb, setSelectedAirbnb] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    stars: "",
  });

  useEffect(() => {
    fetchAirbnbData();
  }, []);

  const fetchAirbnbData = async () => {
    try {
      const response = await fetch("./images/Cleaned_Airbnb.xlsx"); // Ensure correct path
      const arrayBuffer = await response.arrayBuffer(); // Read as binary buffer
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
  
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
  
      console.log("Parsed Airbnb Data:", jsonData);
      setAirbnbs(jsonData);
      setFilteredAirbnbs(jsonData);
    } catch (error) {
      console.error("Error loading Airbnb data:", error);
    }
  };
  
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    let filtered = airbnbs.filter((airbnb) => {
      return (
        airbnb.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.minPrice === "" || airbnb.pricing_rate_amount >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" || airbnb.pricing_rate_amount <= Number(filters.maxPrice)) &&
        (filters.stars === "" || airbnb.stars === Number(filters.stars))
      );
    });

    setFilteredAirbnbs(filtered);
  };

  return (
    <div className="book-airbnb-container">
    <Navbar />
      <h2>Book an Airbnb</h2>

      {/* Filters Section */}
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Search by name..."
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <select name="stars" value={filters.stars} onChange={handleFilterChange}>
          <option value="">Select Stars</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>

      {/* Airbnb List */}
      <div className="airbnb-list">
        {filteredAirbnbs.map((airbnb, index) => (
          <div key={index} className="airbnb-card" onClick={() => setSelectedAirbnb(airbnb)}>
            <img src={airbnbImage} alt={airbnb.name} className="airbnb-image" />
            <h3>{airbnb.name}</h3>
            <p>{"⭐".repeat(airbnb.stars)}</p>
          </div>
        ))}
      </div>

      {/* Airbnb Details Pop-up */}
      {selectedAirbnb && (
        <div className="airbnb-popup">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setSelectedAirbnb(null)}>×</button>
            <h2>{selectedAirbnb.name}</h2>
            <p><strong>Address:</strong> {selectedAirbnb.address}</p>
            <p><strong>Guests:</strong> {selectedAirbnb.numberofguests}</p>
            <p><strong>Price:</strong> {selectedAirbnb.pricing_rate_amount} {selectedAirbnb.pricing_rate_currency}</p>
            <p><strong>Host:</strong> {selectedAirbnb.primaryhost_firstname}</p>
            <p><strong>Languages:</strong> {[
              selectedAirbnb.primaryhost_languages_0, 
              selectedAirbnb.primaryhost_languages_1, 
              selectedAirbnb.primaryhost_languages_2, 
              selectedAirbnb.primaryhost_languages_3
            ].filter(Boolean).join(", ")}</p>
            <p><strong>Response Rate:</strong> {selectedAirbnb.primaryhost_responserate}%</p>
            <p><strong>Response Time:</strong> {selectedAirbnb.primaryhost_responsetime}</p>
            <p><strong>About:</strong> {selectedAirbnb.primaryhost_about}</p>
            <p>
              <strong>Verification:</strong> 
              {selectedAirbnb.identity_verified ? (
                <span className="verified">✔ Verified</span>
              ) : (
                <span className="not-verified">Not Verified</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAirbnb;
