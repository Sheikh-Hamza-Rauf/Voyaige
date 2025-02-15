import React from 'react';
import { Link } from 'react-router-dom';
import './PopularDestinations.css';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      image: 'https://www.teflcourse.net/uploads/pakistan-featured-image.jpg',
      country: 'Islamabad',
      name: 'Islamabad',
      description: 'The Pakistan Monument (Urdu: یادگارِ پاکستان) is a national monument, located on the western Shakarparian Hills.',
      path: '/city/islamabad', // Updated path format
    },
    {
      id: 2,
      image: 'https://www.pakimag.com/files/2010/03/Lahore-Minar-e-Pakistan.jpg',
      country: 'Lahore',
      name: 'Lahore',
      description: 'Standing proud in Lahore, Minar-E-Pakistan is a constant reminder of the tiresome journey of independence.',
      path: '/city/lahore', // Updated path format
    },
    {
      id: 3,
      image: 'https://live.staticflickr.com/5131/5457939358_c041af25f1_b.jpg',
      country: 'Multan',
      name: 'Multan',
      description: 'The tomb is located in the ancient city of Multan, at the northwestern edge of the Multan Fort.',
      path: '/city/multan', // Updated path format
    },
    {
      id: 4,
      image: 'https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg',
      country: 'Karachi',
      name: 'Karachi',
      description: 'Karachi,  a bustling metropolis known for its vibrant culture, coastal beauty, and economic significance.',
      path: '/city/karachi', 
    },
  ];

  return (
    <section className="popular-dest" id="destination">
      <div className="container-dest">
        <h2 className="section-title-dest">Popular Destination</h2>
        <p className="section-text-dest">
          Traveling opens the door to creating memories !!!
        </p>
        <ul className="popular-list-dest">
          {destinations.map((dest) => (
            <li key={dest.id}>
              <div className="popular-card-dest">
                <figure className="card-img-dest">
                  <Link to={dest.path} state={{ cityName: dest.name }}> {/* Added state prop */}
                    <img src={dest.image} alt={dest.name} />
                  </Link>
                </figure>
                <div className="card-content-dest">
                  <div className="card-rating-dest">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>

                  <h3 className="card-title-dest">
                    <Link to={dest.path} state={{ cityName: dest.name }}>{dest.name}</Link>
                  </h3>
                  <p className="card-text-dest">{dest.description}</p>
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