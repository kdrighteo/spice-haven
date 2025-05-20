import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="logo">
            <span className="logo-text">Spice Haven</span>
          </a>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="/products" className="nav-link">Products</a>
          <a href="/categories" className="nav-link">Categories</a>
          <a href="/about" className="nav-link">About</a>
          <div className="nav-buttons">
            <button className="cart-button" onClick={onCartClick}>
              🛒
              {cartItemsCount > 0 && (
                <span className="cart-count">{cartItemsCount}</span>
              )}
            </button>
            <a href="/login" className="btn btn-outline">Login</a>
            <a href="/register" className="btn btn-primary">Register</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 