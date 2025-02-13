import React from 'react';
import './Cart.css';
import Navbar from '../NavBar/Navbar';

const Cart = ({ userData, itineraryData }) => {
  // Hardcoded data for demonstration
  const defaultUserData = {
    name: "Ms Milo Khan",
    bookingId: "1001AB",
    phone: "0333-7777777",
    email: "m.khan@outlook.com",
    date: "7/2/2024"
  };

  const defaultItineraryData = [
    {
      day: 1,
      date: "10/2/2024",
      schedule: [
        { time: "9:00am PST", activity: "Departure", location: "Rawalpindi" },
        { time: "7:30pm PST", activity: "Break/Lunch", location: "Abbottabad" },
        { time: "2:30pm PST", activity: "Departure", location: "Abbottabad" },
        { time: "7:30pm PST", activity: "Arrival in Naran", location: "Naran" },
        { time: "8:30pm PST", activity: "Dinner", location: "Hotel Naran" }
      ]
    },
    {
        day: 2,
        date: "10/2/2024",
        schedule: [
          { time: "9:00am PST", activity: "Departure", location: "Rawalpindi" },
          { time: "7:30pm PST", activity: "Break/Lunch", location: "Abbottabad" },
          { time: "2:30pm PST", activity: "Departure", location: "Abbottabad" },
          { time: "7:30pm PST", activity: "Arrival in Naran", location: "Naran" },
          { time: "8:30pm PST", activity: "Dinner", location: "Hotel Naran" }
        ]
      },
      {
        day: 3,
        date: "10/2/2024",
        schedule: [
          { time: "9:00am PST", activity: "Departure", location: "Rawalpindi" },
          { time: "7:30pm PST", activity: "Break/Lunch", location: "Abbottabad" },
          { time: "2:30pm PST", activity: "Departure", location: "Abbottabad" },
          { time: "7:30pm PST", activity: "Arrival in Naran", location: "Naran" },
          { time: "8:30pm PST", activity: "Dinner", location: "Hotel Naran" }
        ]
      }
    // Add more days as needed
  ];

  const actualUserData = userData || defaultUserData;
  const actualItineraryData = itineraryData || defaultItineraryData;

  return (
    <div className="itinerary-card">
        <Navbar />
      <div className="header">
        <h1>Itinerary Details</h1>
        <div className="user-info">
          <div className="info-row">
            <span>Account Name: {actualUserData.name}</span>
            <span>Date: {actualUserData.date}</span>
          </div>
          <div className="info-row">
            <span>Booking ID: {actualUserData.bookingId}</span>
          </div>
          <div className="info-row">
            <span>Phone Number: {actualUserData.phone}</span>
          </div>
          <div className="info-row">
            <span>Email: {actualUserData.email}</span>
          </div>
        </div>
      </div>

      <div className="itinerary-content">
        {actualItineraryData.map((day, index) => (
          <div key={index} className="day-section">
            <h2>DAY {day.day} <span className="date">{day.date}</span></h2>
            <div className="timeline">
              {day.schedule.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-content">
                    <span className="time">{item.time}</span>
                    <span className="activity">{item.activity}</span>
                    <span className="location">{item.location}</span>
                  </div>
                  {idx < day.schedule.length - 1 && <div className="timeline-connector"></div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="bttn email-bttn">EMAIL ME</button>
        <button className="bttn print-bttn">PRINT COPY</button>
        <button className="bttn home-bttn">BACK TO HOMEPAGE</button>
      </div>
    </div>
  );
};

export default Cart;