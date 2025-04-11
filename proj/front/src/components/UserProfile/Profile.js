import React, { useState, useEffect } from "react";
import "./Profile.css"; // Ensure styles match login/signup
import Navbar from '../NavBar/Navbar';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [itineraries, setItineraries] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    // Fetch user data dynamically (Replace with API call)
    setUser({
      firstName: "Eman",
      lastName: "Furrukh",
      email: "fu@gmail.com",
      phone: "1234567890",
    });

    // Fetch itineraries dynamically (Replace with API call)
    setItineraries([
      { start: "Islamabad", destination: "Lahore", date: "March 10, 2025" },
      { start: "Karachi", destination: "Murree", date: "Feb 22, 2025" },
    ]);

    // Fetch challenges dynamically (Replace with API call)
    setChallenges([
      { name: "Think Fast, Earn Faster (Play Crosswords for Big Points!)", points: 2000 }
    ]);

    // Fetch vouchers dynamically (Replace with API call)
    setVouchers([
      { name: "50% Off Hotel Stay", requiredPoints: 10000, isRedeemed: false },
      { name: "Free Coffee at Café", requiredPoints: 1500, isRedeemed: false },
    ]);
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRedeem = (index) => {
    if (challenges.reduce((acc, challenge) => acc + challenge.points, 0) >= vouchers[index].requiredPoints) {
      const updatedVouchers = [...vouchers];
      updatedVouchers[index].isRedeemed = true;
      setVouchers(updatedVouchers);
      alert("🎉 Voucher Redeemed!");
    } else {
      alert("❌ Not enough points.");
    }
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <h2 className="profile-title">User Profile</h2>

        {/* Personal Details Section */}
        <div className="profile-section">
          <h3>Personal Details</h3>
          <div className="profile-details">
            {Object.keys(user).map((key) => (
              <div className="profile-field" key={key}>
                <label>{key.replace(/([A-Z])/g, " $1")}:</label>
                <input
                  type="text"
                  name={key}
                  value={user[key] || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>
            ))}
            <button className="edit-btn" onClick={handleEditToggle}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Itineraries Section */}
        <div className="profile-section">
          <h3>Past Itineraries</h3>
          <div className="itineraries">
            {itineraries.length > 0 ? (
              itineraries.map((trip, index) => (
                <div key={index} className="itinerary-card">
                  <p><strong>From:</strong> {trip.start}</p>
                  <p><strong>To:</strong> {trip.destination}</p>
                  <p><strong>Date:</strong> {trip.date}</p>
                </div>
              ))
            ) : (
              <p>No itineraries available.</p>
            )}
          </div>
        </div>

        {/* Challenges Section */}
        <div className="profile-section">
          <h3>Challenges Completed</h3>
          <ul>
            {challenges.length > 0 ? (
              challenges.map((challenge, index) => (
                <li key={index}>
                  {challenge.name} - <strong>{challenge.points} points</strong>
                </li>
              ))
            ) : (
              <p>No challenges completed.</p>
            )}
          </ul>
        </div>

        {/* Vouchers Section */}
        <div className="profile-section">
          <h3>Vouchers</h3>
          <div className="vouchers">
            {vouchers.length > 0 ? (
              vouchers.map((voucher, index) => (
                <div key={index} className="voucher-card">
                  <p><strong>{voucher.name}</strong></p>
                  <p>Required Points: {voucher.requiredPoints}</p>
                  {!voucher.isRedeemed ? (
                    <button onClick={() => handleRedeem(index)}>Redeem</button>
                  ) : (
                    <div className="redeemed-voucher">
                      🎊 Code: <strong>{Math.random().toString(36).substr(2, 8).toUpperCase()}</strong> 🎊
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No vouchers available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
