import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to Spice Haven</h1>
        <p>Discover the world's finest spices and artisanal hot sauces</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>
          <Link to="/categories" className="btn btn-secondary">
            Explore Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero; 