import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Spice Haven</h3>
          <p>Your premium destination for authentic spices from around the world.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe for updates and special offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@spicehaven.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Spice Street, Flavor Town, ST 12345</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Spice Haven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 