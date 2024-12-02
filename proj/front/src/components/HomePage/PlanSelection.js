// PlanSelection.jsx
import React, { useState, useEffect } from 'react';
import { MessageCircle, ClipboardList, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PlanSelection.css';
import Navbar from '../NavBar/Navbar';

const PlanSelection = () => {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSideClick = (route) => {
    const element = document.querySelector('.click-ripple');
    element.style.left = `${mousePosition.x}px`;
    element.style.top = `${mousePosition.y}px`;
    element.classList.add('active');

    setTimeout(() => {
      element.classList.remove('active');
      navigate(route);
    }, 500);
  };

  return (

    <div className={`plan-selection ${isLoaded ? 'loaded' : ''}`}>
        <Navbar/>
      <div className="click-ripple" />
      <div className="diagonal-divider" />
      
      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className={`particle ${hoveredSide === 'left' ? 'particle-left' : ''} ${hoveredSide === 'right' ? 'particle-right' : ''}`}
          style={{
            '--delay': `${i * 0.1}s`,
            '--size': `${Math.random() * 10 + 5}px`,
            '--position-x': `${Math.random() * 100}%`,
            '--position-y': `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Left side - Chatbot */}
      <div 
        className={`side left ${hoveredSide === 'left' ? 'hovered' : ''}`}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleSideClick('/MiloChatbot')}
      >
        <div className="content-wrapper">
          <div className="icon-wrapper">
            <MessageCircle className="main-icon" />
            <Sparkles className="secondary-icon" />
          </div>
          <h2>AI Chatbot</h2>
          <p>Get personalized recommendations through interactive chat</p>
          <div className="features">
            <div className="feature">
              <Zap size={16} />
              <span>Smart Responses</span>
            </div>
            <div className="feature">
              <MessageCircle size={16} />
              <span>Natural Conversation</span>
            </div>
          </div>
          <button className="cta-button">Start Chat</button>
        </div>
      </div>

      {/* Right side - Form */}
      <div 
        className={`side right ${hoveredSide === 'right' ? 'hovered' : ''}`}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleSideClick('/form-plan')}
      >
        <div className="content-wrapper">
          <div className="icon-wrapper">
            <ClipboardList className="main-icon" />
            <Sparkles className="secondary-icon" />
          </div>
          <h2>Form Based</h2>
          <p>Quick and structured recommendation process</p>
          <div className="features">
            <div className="feature">
              <Zap size={16} />
              <span>Instant Results</span>
            </div>
            <div className="feature">
              <ClipboardList size={16} />
              <span>Guided Process</span>
            </div>
          </div>
          <button className="cta-button">Start Form</button>
        </div>
      </div>

      {/* Interactive floating elements */}
      <div className="floating-elements">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className={`floating-element ${hoveredSide === 'left' ? 'float-left' : ''} ${hoveredSide === 'right' ? 'float-right' : ''}`}
            style={{
              '--delay': `${i * 0.2}s`,
              '--scale': `${Math.random() * 0.5 + 0.5}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanSelection;