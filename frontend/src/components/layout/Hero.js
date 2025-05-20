import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover the World's Finest Spices</h1>
        <p>From exotic blends to premium single-origin spices, elevate your culinary journey with our carefully curated collection.</p>
        <div className="hero-buttons">
          <a href="/products" className="btn btn-primary">Shop Now</a>
          <a href="/categories" className="btn btn-outline">Explore Categories</a>
        </div>
      </div>
      <div className="hero-features">
        <div className="feature">
          <span className="feature-icon">🌍</span>
          <span>Global Selection</span>
        </div>
        <div className="feature">
          <span className="feature-icon">⭐</span>
          <span>Premium Quality</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <span>Fast Shipping</span>
        </div>
      </div>
    </section>
  );
};

export default Hero; 