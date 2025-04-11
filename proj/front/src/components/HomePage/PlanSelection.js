import React, { useState, useEffect } from 'react';
import { MessageCircle, ClipboardList, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PlanSelection.css';
import Navbar from '../NavBar/Navbar';

const PlanSelection = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className={`plan-selection ${isLoaded ? 'loaded' : ''}`}>
      <Navbar />
      <div className="message">
        <h2>Plan your trip with AI!</h2>
      </div>

      <div className="selection-container">
        <SelectionCard
          title="AI Chatbot"
          description="Get personalized recommendations through interactive chat"
          route="/MiloChatbot"
          iconMain={<MessageCircle className="main-icon" />}
          features={[
            { icon: <Zap size={16} />, text: "Smart Responses" },
            { icon: <MessageCircle size={16} />, text: "Natural Conversation" },
          ]}
          buttonText="Start Chat"
          handleCardClick={handleCardClick}
        />

        <SelectionCard
          title="Form Based"
          description="Quick and structured recommendation process"
          route="/form-plan"
          iconMain={<ClipboardList className="main-icon" />}
          features={[
            { icon: <Zap size={16} />, text: "Instant Results" },
            { icon: <ClipboardList size={16} />, text: "Guided Process" },
          ]}
          buttonText="Start Form"
          handleCardClick={handleCardClick}
        />
      </div>
    </div>
  );
};

const SelectionCard = ({ title, description, route, iconMain, features, buttonText, handleCardClick }) => {
  return (
    <div className="selection-card" onClick={() => handleCardClick(route)}>
      <div className="icon-wrapper">
        {iconMain}
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            {feature.icon}
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
      <button className="cta-button">{buttonText}</button>
    </div>
  );
};

export default PlanSelection;