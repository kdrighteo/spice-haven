import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const login = (email, password) => {
    // In a real app, this would make an API call
    // For demo, we'll simulate a successful login
    setUser({
      id: 1,
      name: 'Demo User',
      email: email
    });
  };

  const register = (name, email, password) => {
    // In a real app, this would make an API call
    // For demo, we'll simulate a successful registration
    setUser({
      id: 1,
      name: name,
      email: email
    });
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
  };

  const addToWishlist = (product) => {
    if (!user) {
      alert('Please login to add items to your wishlist');
      return;
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