import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import hotelData from "../HotelsPage/clean_hotel_data.json";
import "./City.css";

const getUniqueCities = (data) => {
  const cities = new Set();
  data.forEach((hotel) => cities.add(hotel.city));
  return [...cities];
};

const cityImages = {
  Islamabad: "https://www.teflcourse.net/uploads/pakistan-featured-image.jpg",
  Lahore: "https://www.pakimag.com/files/2010/03/Lahore-Minar-e-Pakistan.jpg",
  Karachi: "https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg",
  Kashmir: "https://t3.ftcdn.net/jpg/04/37/91/72/360_F_437917209_fZPcDkpnEpZJ2oWFpNbqYATQ39UJFcZl.jpg",
  Murree: "https://media.istockphoto.com/id/512302224/photo/murree-pakistan.jpg?s=612x612&w=0&k=20&c=-ip1qJc8ny-LmZPdf9rZBhASgBCrs_Ff899H5DVguOM=",
  Hunza: "https://t4.ftcdn.net/jpg/05/42/50/77/360_F_542507713_z0kbWKOCs71wzUVhF57pkuodkp7GuXxP.jpg",
  Skardu: "https://i.dawn.com/primary/2015/04/552534a77b507.jpg?r=961640394",
  Chitral: "https://mytrip.pk/storage/images/dest_mod-62eb9e5a8f3f71659608666.webp",
  Gilgit: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/7d/36/ce/caption.jpg?w=1200&h=-1&s=1",
  Multan: "https://live.staticflickr.com/5131/5457939358_c041af25f1_b.jpg",
  Abbottabad: "https://upload.wikimedia.org/wikipedia/commons/d/d2/View_of_Abbotabad.JPG",
  Quetta: "https://upload.wikimedia.org/wikipedia/commons/7/76/Quetta_at_night_2.jpg",
  Naran: "https://t3.ftcdn.net/jpg/02/76/17/90/360_F_276179039_rqfn8FqiZncGkJRm9ibsNoskR4YinJRU.jpg",
  Batakundi: "https://prestinetravels.com/wp-content/uploads/2021/05/Batakundi.jpg",
  Peshawar: "https://t3.ftcdn.net/jpg/00/65/73/78/360_F_65737837_SlDu3wZemsMV1LkBcrEoiFq4hkWMewfx.jpg",
  Faisalabad: "https://paktourismportal.com/wp-content/uploads/2021/12/Clock-Tower-Faisalabad.jpg",
};

const City = () => {
  const cities = getUniqueCities(hotelData);

  return (
    <div className="city-container">
      <NavBar />
      <div className="container-city">
        <h2 className="section-title-city">Explore Cities</h2>
        <p className="section-text-city">
          Discover the best hotels in your favorite destinations
        </p>
        <ul className="city-list">
          {cities.map((city, index) => (
            <li key={index} className="city-card">
              <div className="popular-card-city">
                <figure className="card-img-city">
                  <Link to={`/city/${city.toLowerCase()}`} state={{ cityName: city }}> 
                    <img src={cityImages[city] || "https://via.placeholder.com/400"} alt={city} />
                  </Link>
                </figure>
                <div className="card-content-city">
                  <h3 className="card-title-city">
                    <Link to={`/city/${city.toLowerCase()}`} state={{ cityName: city }}>
                      {city}
                    </Link>
                  </h3>
                  <p className="card-text-city">
                    Experience the beauty and hospitality of {city}.
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default City;
