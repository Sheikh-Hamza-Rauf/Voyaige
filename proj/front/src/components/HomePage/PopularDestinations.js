import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './PopularDestinations.css';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      image: 'https://www.teflcourse.net/uploads/pakistan-featured-image.jpg',
      country: 'Islamabad',
      name: 'Islamabad',
      description: 'The Pakistan Monument (Urdu: یادگارِ پاکستان) is a national monument, located on the western Shakarparian Hills.',
      path: '/IslamabadPage', // Path to Islamabad component
    },
    {
      id: 2,
      image: 'https://www.pakimag.com/files/2010/03/Lahore-Minar-e-Pakistan.jpg',
      country: 'Lahore',
      name: 'Lahore',
      description: 'Standing proud in Lahore, Minar-E-Pakistan is a constant reminder of the tiresome journey of independence.',
      path: '/lahore', // Path to Lahore component
    },
    {
      id: 3,
      image: 'https://live.staticflickr.com/5131/5457939358_c041af25f1_b.jpg',
      country: 'Multan',
      name: 'Multan',
      description: 'The tomb is located in the ancient city of Multan, at the northwestern edge of the Multan Fort.',
      path: '/multan', // Path to Multan component
    },
  ];

  return (
    <section className="popular" id="destination">
      <div className="container">
        <h2 className="section-title">Popular Destination</h2>
        <p className="section-text">
          Traveling opens the door to creating memories !!!
        </p>
        <ul className="popular-list">
          {destinations.map((dest) => (
            <li key={dest.id}>
              <div className="popular-card">
                <figure className="card-img">
                  <Link to={dest.path}> {/* Use Link to navigate */}
                    <img src={dest.image} alt={dest.name} />
                  </Link>
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>

                  <h3 className="card-title">
                    <Link to={dest.path}>{dest.name}</Link> {/* Link to the respective page */}
                  </h3>
                  <p className="card-text">{dest.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary">More Destination</button>
      </div>
    </section>
  );
};

export default PopularDestinations;
