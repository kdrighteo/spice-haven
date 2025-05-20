import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    // In a real app, this would make an API call
    // For demo, we'll simulate a successful login with basic validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, accept any valid email/password combination
    const newUser = {
      id: 1,
      name: email.split('@')[0], // Use part of email as name for demo
      email: email
    };
    setUser(newUser);
    return newUser;
  };

  const register = async (name, email, password) => {
    // In a real app, this would make an API call
    // For demo, we'll simulate a successful registration with basic validation
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, create a new user
    const newUser = {
      id: 1,
      name: name,
      email: email
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
  };

  const addToWishlist = (product) => {
    if (!user) {
      throw new Error('Please login to add items to your wishlist');
    }
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        wishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 