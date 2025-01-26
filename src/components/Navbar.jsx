import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';

const Nav = styled.nav`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover, &.active {
    color: var(--primary);
    &:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.primary ? `
    background: var(--primary);
    color: white;
    &:hover {
      background: var(--primary-dark);
    }
  ` : `
    background: transparent;
    color: var(--dark);
    &:hover {
      color: var(--primary);
    }
  `}
`;

const CartButton = styled(Button)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--primary);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
`;

const MobileMenuButton = styled(Button)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const MobileNavLink = styled(NavLink)`
  width: 100%;
  text-align: center;
  padding: 0.75rem;
`;

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
    setShowMobileMenu(false);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
    setShowMobileMenu(false);
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
    setShowMobileMenu(false);
  };

  return (
    <Nav>
      <Container>
        <Logo to="/">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          Spice Haven
        </Logo>

        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </NavLink>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </NavLink>
        </NavLinks>

        <Actions>
          <CartButton onClick={toggleCart}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
              <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-4h7a1 1 0 0 0 .97-.757l2.47-9.864A1 1 0 0 0 18.47 4H5.999L5.2 1.757A1 1 0 0 0 4.242 1H2a1 1 0 0 0 0 2h1.47l3.47 12.243A1 1 0 0 0 8 16z"/>
            </svg>
            Cart
            {cartItemsCount > 0 && <CartCount>{cartItemsCount}</CartCount>}
          </CartButton>

          {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button onClick={toggleLogin}>Login</Button>
              <Button primary onClick={toggleRegister}>Register</Button>
            </>
          )}

          <MobileMenuButton onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </MobileMenuButton>
        </Actions>

        <MobileMenu isOpen={showMobileMenu}>
          <MobileNavLink to="/" onClick={() => setShowMobileMenu(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setShowMobileMenu(false)}>
            About
          </MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setShowMobileMenu(false)}>
            Contact
          </MobileNavLink>
        </MobileMenu>
      </Container>

      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      <Login isOpen={showLogin} onClose={toggleLogin} onRegisterClick={toggleRegister} />
      <Register isOpen={showRegister} onClose={toggleRegister} onLoginClick={toggleLogin} />
    </Nav>
  );
}

export default Navbar; 