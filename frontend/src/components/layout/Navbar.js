import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleAuthClick = (type) => {
    setIsMenuOpen(false);
    if (type === 'login') {
      navigate('/login');
    } else if (type === 'register') {
      navigate('/register');
    }
  };

  const handleCartButtonClick = () => {
    setIsMenuOpen(false);
    setIsCartOpen(true);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo" onClick={handleLinkClick}>
            <span className="logo-text">Spice Haven</span>
          </Link>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/products" 
            className={`nav-link ${activeLink === '/products' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            Products
          </Link>
          <Link 
            to="/categories" 
            className={`nav-link ${activeLink === '/categories' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            Categories
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${activeLink === '/about' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            About
          </Link>
          <div className="nav-buttons">
            <button 
              className="cart-button" 
              onClick={handleCartButtonClick}
              aria-label="Open cart"
            >
              🛒
              {cartItemsCount > 0 && (
                <span className="cart-count">{cartItemsCount}</span>
              )}
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleAuthClick('login')}
            >
              Login
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleAuthClick('register')}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 