import React from 'react';
import { Link } from 'react-router-dom';

import './AiBanner.css';


const AiBanner = () => {
  return (
    <div className="ai-trip-banner">
      <div className="banner-content">
        <div className="text-content">
          <div className="ai-badge">Powered by AI <span className="beta-tag">BETA</span></div>
          <h1 className="aimain-title">AI trip builder gets you out there</h1>
          <p className="aisubtitle">Get a whole getaway's worth of ideas made for you—ready in seconds.</p>
          <Link to="/PlanSelection">
  <button className="try-button">
    <span className="iconn">✦</span> Try it
  </button>
</Link>


        </div>
        <div className="image-container">
          <img src="https://img.eurohike.at/w_314,h_235,q_80,v_49f23c,hash_7fe451/ddcijcnkv/image/upload/v1683199297/eurohike/touren/oesterreich/almwandern-salzkammergut-fuer-familien/neu/eurohike-wanderreise-salzkammergut-genneralm-familie1.jpg" alt="Family hiking together" className="banner-image" />
        </div>
      </div>
    </div>
  );
};

export default AiBanner;