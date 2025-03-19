
import React, { useEffect, useRef, useState } from 'react';
import panoramaData from './panoramadata.js';
import './panorama.css';

const PanoramaViewer = ({ cityName, showPanorama, onClose }) => {
  const panoramaRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get images for the current city
  const images = panoramaData[cityName] || [];

  useEffect(() => {
    // Dynamically load Pannellum JS and CSS
    const pannellumCSS = document.createElement('link');
    pannellumCSS.rel = 'stylesheet';
    pannellumCSS.href = 'https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.css';
    document.head.appendChild(pannellumCSS);

    const pannellumJS = document.createElement('script');
    pannellumJS.src = 'https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.js';
    pannellumJS.onload = () => {
      if (showPanorama && panoramaRef.current && images.length > 0) {
        window.pannellum.viewer(panoramaRef.current, {
          "type": "equirectangular",
          "panorama": images[currentImageIndex],
          "autoLoad": true,
          "autoRotate": -2,
          "showZoomCtrl": true,
          "showFullscreenCtrl": true
        });
      }
    };
    document.body.appendChild(pannellumJS);

    return () => {
      document.head.removeChild(pannellumCSS);
      document.body.removeChild(pannellumJS);
    };
  }, [showPanorama, currentImageIndex, images]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  if (!showPanorama || images.length === 0) return null;

  return (
    <div className="panorama-overlay">
      <div className="panorama-popup">
        <button className="close-button" onClick={onClose}>×</button>
        <div 
          ref={panoramaRef} 
          className="panorama-container"
        ></div>
      </div>
      <button className="prev-image-button" onClick={prevImage}>◄</button>
      <button className="next-image-button" onClick={nextImage}>►</button>
    </div>
  );
};

export default PanoramaViewer;
