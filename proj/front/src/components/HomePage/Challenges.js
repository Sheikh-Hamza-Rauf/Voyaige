import React, { useState } from 'react';
import './Challenges.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart as fasHeart,
  faAward,
  faLocationDot,
  faClock,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const ChallengeCard = ({ title, points, image, duration, location }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="challenge-card">
      <div className="image-container">
        <img 
          src={image} 
          alt={title}
          className="challenge-image"
        />
        <button 
          className={`like-button ${isLiked ? 'active' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <FontAwesomeIcon 
            icon={isLiked ? fasHeart : farHeart}
            size="lg"
          />
        </button>
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        
        <div className="card-meta">
          <div className="meta-item">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{location}</span>
          </div>
          <div className="meta-item">
            <FontAwesomeIcon icon={faClock} />
            <span>{duration}</span>
          </div>
        </div>

        <div className="points-section">
          <div className="points-badge">
            <FontAwesomeIcon icon={faAward} className='icons'/>
            <span>{points} Points</span>
          </div>
          <a href="#" className="view-details">
            <span>View Details</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Challenges = () => {
  const challenges = [
    {
      id: 1,
      title: "Explore Shangri-La of James Hilton, Hunza & Skardu (Private Tour)",
      points: 2000,
      image: "https://media.tacdn.com/media/attractions-splice-spp-360x240/12/64/a4/5b.jpg",
      duration: "5 Days",
      location: "Hunza Valley"
    },
    {
      id: 2,
      title: "Explore Hunza Valley Pakistan",
      points: 1000,
      image: "https://epicbackpackertours.com/wp-content/uploads/2022/01/DSCF6400-1024x682.jpg",
      duration: "3 Days",
      location: "Hunza Valley"
    },
    {
      id: 3,
      title: "Top 11 Best Things to do in Hunza valley Pakistan",
      points: 3000,
      image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/9a/9d/15.jpg",
      duration: "7 Days",
      location: "Hunza Valley"
    },
    {
      id: 4,
      title: "9 Days Tour to Skardu, Deosai, Rama meadows From May to October",
      points: 5000,
      image: "https://i.dawn.com/primary/2019/05/5cefc193478ca.jpg",
      duration: "9 Days",
      location: "Skardu"
    }
  ];

  return (
    <div className="challenges-container">
      <div className="challenges-header">
        <h2 className="challenges-title">Travel Challenges</h2>
        <p className="challenges-subtitle">
          Complete challenges to earn points and unlock exclusive rewards
        </p>
      </div>

      <div className="challenges-grid">
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>
    </div>
  );
};

export default Challenges;