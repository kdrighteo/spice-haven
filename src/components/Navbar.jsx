import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import Login from './Auth/Login';
import Register from './Auth/Register';

const Nav = styled.nav`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary);
  }

  &.active {
    color: var(--primary);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  background: ${props => props.primary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'var(--dark)'};

  &:hover {
    background: ${props => props.primary ? 'var(--primary-dark)' : 'var(--light)'};
  }
`;

const CartButton = styled(Button)`
  position: relative;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

const UserMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const UserMenuContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 150px;
`;

const UserMenuItem = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: var(--dark);
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: var(--light);
  }
`;

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { cartItems, cartCount } = useCart();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <Nav>
      <Container>
        <Logo to="/">Spice Haven</Logo>
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
          
          {user ? (
            <>
              <UserMenu onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
                <Button>{user.name}</Button>
                <UserMenuContent isOpen={showUserMenu}>
                  {isAdmin && (
                    <UserMenuItem to="/admin">Admin Dashboard</UserMenuItem>
                  )}
                  <UserMenuItem to="/profile">Profile</UserMenuItem>
                  <UserMenuItem to="/profile/orders">Orders</UserMenuItem>
                  <UserMenuItem to="/profile/addresses">Addresses</UserMenuItem>
                  <UserMenuItem to="/wishlist">Wishlist</UserMenuItem>
                  <UserMenuItem as="button" onClick={handleLogout}>Logout</UserMenuItem>
                </UserMenuContent>
              </UserMenu>
            </>
          ) : (
            <>
              <Button onClick={() => setShowLogin(true)}>Login</Button>
              <Button primary onClick={() => setShowRegister(true)}>Register</Button>
            </>
          )}
          
          <CartButton onClick={() => setShowCart(true)}>
            Cart
            {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
          </CartButton>
        </NavLinks>
      </Container>

      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} onSwitchToRegister={() => {
        setShowLogin(false);
        setShowRegister(true);
      }} />
      <Register isOpen={showRegister} onClose={() => setShowRegister(false)} onSwitchToLogin={() => {
        setShowRegister(false);
        setShowLogin(true);
      }} />
    </Nav>
  );
}

export default Navbar; 