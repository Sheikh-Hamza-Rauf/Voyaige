// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";
// import "./BookTransport.css"; 
// import Navbar from "../NavBar/Navbar";
// import { useNavigate } from "react-router-dom";  // Import useNavigate

// const ConfirmationModal = ({ selectedItem, onConfirm, onCancel }) => {
//   if (!selectedItem) return null;

//   return (
//     <div className="confirmation-modal">
//       <div className="modal-content">
//         <h2>Confirm Booking</h2>
//         <p>Are you sure you want to book <strong>{selectedItem.name || selectedItem.car_name || selectedItem.bus_name}</strong>?</p>
//         <p><strong>Price:</strong> {selectedItem.price || selectedItem.price_per_day} Rs</p>
//         <div className="modal-buttons">
//           <button className="confirm-btn" onClick={onConfirm}>Yes, Book Now</button>
//           <button className="cancel-btn" onClick={onCancel}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BookTransport = () => {
//   const [cars, setCars] = useState([]);
//   const [buses, setBuses] = useState([]);
//   const [trains, setTrains] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isBooking, setIsBooking] = useState(false);
//   const [showConfirmPopup, setShowConfirmPopup] = useState(false);  // State for controlling the confirmation popup
//   const [notification, setNotification] = useState(""); // State for managing notifications
//   const [filter, setFilter] = useState({
//     name: "",
//     price: "",
//     city: ""
//   });
//   const [sortBy, setSortBy] = useState("price");  // Default sorting by price
//   const navigate = useNavigate();  // useNavigate hook for navigation
//   const [showNotification, setShowNotification] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const carResponse = await fetch("/Cleaned_Cars.csv");
//         const busResponse = await fetch("/Cleaned_busses.csv");
//         const trainResponse = await fetch("/Cleaned_trains.csv");
  
//         const carText = await carResponse.text();
//         const busText = await busResponse.text();
//         const trainText = await trainResponse.text();
  
//         Papa.parse(carText, {
//           header: true,
//           complete: (result) => {
//             console.log("Cars data:", result.data);
//             setCars(result.data);
//           },
//         });
  
//         Papa.parse(busText, {
//           header: true,
//           complete: (result) => setBuses(result.data),
//         });
  
//         Papa.parse(trainText, {
//           header: true,
//           complete: (result) => {
//             setTrains(result.data);
//           },

//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
  
//     fetchData();
//   }, []);  

//     // Function to get the image path based on transport type
//     const getImagePath = (name, type) => {
//       const nameLower = name ? name.toLowerCase() : "";
    
//       if (type === "bus") {
//         const busImages = [
//           "akmovers", "daewoo", "e.k.movers", "fmtravels", "mashabrum",
//           "natco", "qconnect", "roadmaster", "skyways", "warraich"
//         ];
//         const matchedBus = busImages.find(img => nameLower.includes(img));
//         return matchedBus ? `/images/${matchedBus}.jpg` : "/images/bus.jpg";
//       }
    
//       if (type === "train") {
//         const trainImages = ["fareed_express", "mehr_express", "rawalpindi_express", "subak_karam"];
//         const matchedTrain = trainImages.find(img => nameLower.includes(img)); 
//         return matchedTrain ? `/images_trains/${matchedTrain}.jpg` : "/images_trains/rawalpindi_express.jpg";
//       }
    
//       if (type === "car") {
//         const carImages = [
//           "karvaan", "brv", "city", "prado",
//           "wagon r", "fielder",
//           "fortuner", "corolla", "hiace",
//           "yaris", "voxy", "civic", "land cruiser", "alto",
//           "cultus", "coaster", "revo"
//         ];
//         const matchedCar = carImages.find(img => nameLower.includes(img));
//         return matchedCar ? `/images_cars/${matchedCar}.jpg` : "/images_cars/car.jpg";
//       }
    
//       return "";
//     };
    

//   // Modify the handleBooking to show the popup with the selected item
//   const handleBooking = (item) => {
//     setSelectedItem(item);  // Set selected item for booking
//     setShowConfirmPopup(true);  // Show the confirmation popup
//   };

//   const confirmBooking = () => {
//     setShowConfirmPopup(false);
//     localStorage.setItem("selectedTransport", JSON.stringify(selectedItem));
  
//     setNotification(`✅ You have successfully booked ${selectedItem.name || selectedItem.car_name || selectedItem.bus_name}`);
//     setShowNotification(true);
  
//     // Ensure the notification is displayed before redirecting
//     setTimeout(() => {
//       setShowNotification(false);
//       navigate("/bookoption");
//     }, 1000); // Increased timeout to 1 seconds for better visibility
//   };
  

//   const cancelBooking = () => {
//     setShowConfirmPopup(false);
//     setSelectedItem(null);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   // Filter and sort transport items
//   const filteredCars = cars.filter((car) => {
//     return (
//       (car.car_name?.toLowerCase().includes(filter.name.toLowerCase()) || !filter.name) &&
//       (car.price_per_day >= filter.price || !filter.price)
//     );
//   }).sort((a, b) => (sortBy === "price" ? a.price_per_day - b.price_per_day : a.car_name.localeCompare(b.car_name)));

//   const filteredBuses = buses.filter((bus) => {
//     return (
//       (bus.name?.toLowerCase().includes(filter.name.toLowerCase()) || !filter.name) &&
//       (bus.price >= filter.price || !filter.price) &&
//       (bus.starting?.toLowerCase().includes(filter.city.toLowerCase()) || !filter.city)
//     );
//   }).sort((a, b) => (sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name)));

//   const filteredTrains = trains.filter((train) => {
//     return (
//       (train.name?.toLowerCase().includes(filter.name.toLowerCase()) || !filter.name) &&
//       (train.price >= filter.price || !filter.price) &&
//       (train.starting?.toLowerCase().includes(filter.city.toLowerCase()) || !filter.city)
//     );
//   }).sort((a, b) => (sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name)));
  

//   return (
//     <div className="book-transport">
//       <Navbar />
//       {/* Back Arrow Icon */}
//       <div className="back-arrow" onClick={() => navigate("/bookoption")}>
//         ←
//       </div>
      
//       <div className="trans">
//         <h2>Customize Your Transport</h2>

//         {/* Filter and Sort */}
//         <div className="filters">
//           <input 
//             type="text" 
//             name="name" 
//             placeholder="Filter by Name" 
//             value={filter.name} 
//             onChange={handleFilterChange}
//           />
//           <input 
//             type="number" 
//             name="price" 
//             placeholder="Filter by Price" 
//             value={filter.price} 
//             onChange={handleFilterChange}
//           />
//           <input 
//             type="text" 
//             name="city" 
//             placeholder="Filter by City" 
//             value={filter.city} 
//             onChange={handleFilterChange}
//           />
//           <select onChange={handleSortChange} value={sortBy}>
//             <option value="price">Sort by Price</option>
//             <option value="name">Sort by Name</option>
//           </select>
//         </div>

//         {/* Cars Section with Carousel */}
//         <div className="transport-section">
//         <h3>Cars</h3>
//         <div className="carousel">
//           {filteredCars.length > 0 ? (
//               filteredCars.map((car, index) => {
//               console.log("Rendering Car:", car);
//               const carImage = getImagePath(car?.car_name || car?.brand_Name, "car");
//               console.log("Filtered Cars:", filteredCars);
//               console.log("Car image path:", carImage); // Debugging log
//               console.log("Car Object Keys:", Object.keys(filteredCars[0] || {}));
//               return (
//                 <div
//                   key={index}
//                   className="carousel-item"
//                   onClick={() => handleBooking(car)} // Handle booking for each car
//                 >
//                   <img src={carImage} alt={car?.car_name || "Car"} className="transport-image" />
//                   <p>
//                     {car?.brand_Name || "Unknown Brand"} {car?.car_name || "Unknown Car"} -{" "}
//                     {car?.price_per_day || "Price Not Available"} per day
//                   </p>
//                   <p>
//                     {car?.doors || "N/A"} Doors, {car?.passengers || "N/A"} Passengers,{" "}
//                     {car?.transmission || "N/A"} Transmission,{" "}
//                     {car?.ac ? "AC Available" : "No AC"}
//                   </p>
//                   <button>Book</button>
//                 </div>
//               );
//             })
//           ) : (
//             <p>Loading Cars...</p>
//           )}
//         </div>
//       </div>


//         {/* Buses Section */}
//         <div className="transport-section">
//           <h3>Buses</h3>
//           {filteredBuses.length > 0 ? (
//             filteredBuses.map((bus, index) => {
//               const busImage = getImagePath(bus.name, "bus");
//               return (
//                 <div key={index} className="transport-item" onClick={() => handleBooking(bus)}>  
//                   <img src={busImage} alt={bus.name} className="transport-image" />
//                   <p>
//                     {bus.name} - {bus.departure_time} - {bus.price} PKR
//                   </p>
//                   <p>
//                     From: {bus.starting || "Unknown"} To: {bus.ending || "Unknown"}
//                   </p>
//                   <button>Book</button>
//                 </div>
//               );
//             })
//           ) : (
//             <p>Loading buses...</p>
//           )}
//         </div>

//         {/* Trains Section */}
//         <div className="transport-section">
//           <h3>Trains</h3>
//           {filteredTrains.length > 0 ? (
//             filteredTrains.map((train, index) => {
//               const trainImage = getImagePath(train.name, "train");
//               return (
//                 <div key={index} className="transport-item" onClick={() => handleBooking(train)}>  
//                   <img src={trainImage} alt={train.name} className="transport-image" />
//                   <p>
//                     {train.name || "Unknown Train"} - {train.departure_time || "--"} -{" "}
//                     {train.price ? `${train.price} PKR` : "Price Not Available"}
//                   </p>
//                   <p>
//                     From: {train.starting || "Unknown"} To: {train.ending || "Unknown"}
//                   </p>
//                   <button>Book</button>
//                 </div>
//               );
//             })
//           ) : (
//             <p>Loading trains...</p>
//           )}
//         </div>

//         {/* Confirmation Pop-up */}
//         {showConfirmPopup && (
//           <div className="popup">
//             <div className="popup-content">
//               <span className="close" onClick={cancelBooking}>&times;</span>
//               <h3>Booking Confirmation</h3>
//               <p>Are you sure you want to book this transport?</p>
//               <div className="details">
//                 {selectedItem.name && <p><strong>Name:</strong> {selectedItem.name}</p>}
//                 {selectedItem.departure_time && <p><strong>Departure Time:</strong> {selectedItem.departure_time}</p>}
//                 {selectedItem.price && <p><strong>Price:</strong> {selectedItem.price} PKR</p>}
//                 {selectedItem.passengers && <p><strong>Passengers:</strong> {selectedItem.passengers}</p>}
//                 {selectedItem.starting && <p><strong>From:</strong> {selectedItem.starting}</p>}
//                 {selectedItem.ending && <p><strong>To:</strong> {selectedItem.ending}</p>}
//               </div>
//               <button onClick={confirmBooking}>Confirm</button>
//               <button onClick={cancelBooking}>Cancel</button>
//             </div>
//           </div>
//         )}

//         {/* Notification */}
//         {showNotification && <div className="notification">{notification}</div>}

//       </div>
//     </div>
//   );
// };

// export default BookTransport;



import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./BookTransport.css"; 
import Navbar from "../NavBar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmationModal = ({ selectedItem, onConfirm, onCancel }) => {
  if (!selectedItem) return null;

  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <h2>Confirm Booking</h2>
        <p>Are you sure you want to book <strong>{selectedItem.name}</strong>?</p>
        <p><strong>Price:</strong> {selectedItem.price} PKR</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes, Book Now</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const BookTransport = () => {
  const [buses, setBuses] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { customizationData, currentDetails, tripId } = location.state || {};
  
  // Get destination city from customizationData
  const destinationCity = customizationData?.destination || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const busResponse = await fetch("/Cleaned_busses.csv");
        const busText = await busResponse.text();
  
        Papa.parse(busText, {
          header: true,
          complete: (result) => {
            // Filter buses by destination city
            const filteredBuses = result.data
              .filter(bus => bus.ending && bus.ending.toLowerCase() === destinationCity.toLowerCase())
              .sort((a, b) => {
                // Sort by departure time - earlier times first
                if (a.departure_time && b.departure_time) {
                  return a.departure_time.localeCompare(b.departure_time);
                }
                return 0;
              })
              .slice(0, 5); // Take only top 5 buses
              
            setBuses(filteredBuses);
          },
        });
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };
  
    fetchData();
  }, [destinationCity]);  

  // Function to get the image path for buses
  const getBusImagePath = (name) => {
    const nameLower = name ? name.toLowerCase() : "";
    
    const busImages = [
      "akmovers", "daewoo", "e.k.movers", "fmtravels", "mashabrum",
      "natco", "qconnect", "roadmaster", "skyways", "warraich"
    ];
    
    const matchedBus = busImages.find(img => nameLower.includes(img));
    return matchedBus ? `/images/${matchedBus}.jpg` : "/images/bus.jpg";
  };

  const handleBooking = (item) => {
    setSelectedItem(item);
    setShowConfirmPopup(true);
  };

  const confirmBooking = () => {
    setShowConfirmPopup(false);
    
    // Navigate back to booking options with the selected transport
    navigate("/bookoption", {
      state: {
        customizationData,
        currentDetails: { 
          ...currentDetails,
          transport: selectedItem
        },
        tripId
      }
    });
  };

  const cancelBooking = () => {
    setShowConfirmPopup(false);
    setSelectedItem(null);
  };

  return (
    <div className="book-transport">
      <Navbar />
      <div className="back-arrow" onClick={() => navigate("/bookoption", {
        state: { customizationData, currentDetails, tripId }
      })}>
        ←
      </div>
      
      <div className="trans">
        <h2>Choose Bus Transport to {destinationCity}</h2>
        <p className="subtitle">Top 5 Available Buses</p>

        {/* Buses Section */}
        <div className="transport-section">
          {buses.length > 0 ? (
            buses.map((bus, index) => {
              const busImage = getBusImagePath(bus.name);
              return (
                <div key={index} className="transport-item" onClick={() => handleBooking(bus)}>  
                  <img src={busImage} alt={bus.name} className="transport-image" />
                  <div className="transport-details">
                    <h3>{bus.name || "Bus Service"}</h3>
                    <div className="transport-info">
                      <p><strong>Departure:</strong> {bus.departure_time || "Schedule not available"}</p>
                      <p><strong>Route:</strong> {bus.starting || "Origin"} → {bus.ending || "Destination"}</p>
                      <p><strong>Price:</strong> {bus.price ? `${bus.price} PKR` : "Price not available"}</p>
                      <p><strong>Type:</strong> {bus.type || "Standard"}</p>
                      <p><strong>Facilities:</strong> {bus.facilities || "AC, Comfortable Seating, WiFi"}</p>
                    </div>
                    <button className="book-btn">Select This Bus</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-buses">
              <p>No buses found going to {destinationCity}. Please try another destination.</p>
            </div>
          )}
        </div>

        {/* Confirmation Pop-up */}
        {showConfirmPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={cancelBooking}>&times;</span>
              <h3>Booking Confirmation</h3>
              <p>Are you sure you want to book this bus?</p>
              <div className="details">
                <p><strong>Name:</strong> {selectedItem.name || "Bus Service"}</p>
                <p><strong>Departure Time:</strong> {selectedItem.departure_time || "Not specified"}</p>
                <p><strong>Price:</strong> {selectedItem.price || "0"} PKR</p>
                <p><strong>From:</strong> {selectedItem.starting || "Origin"}</p>
                <p><strong>To:</strong> {selectedItem.ending || "Destination"}</p>
                <p><strong>Type:</strong> {selectedItem.type || "Standard"}</p>
              </div>
              <div className="confirmation-buttons">
                <button className="confirm-btn" onClick={confirmBooking}>Confirm Booking</button>
                <button className="cancel-btn" onClick={cancelBooking}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Notification */}
        {showNotification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default BookTransport;