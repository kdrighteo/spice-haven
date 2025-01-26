import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

const initialAddresses = {
  1: [
    {
      id: 1,
      type: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    }
  ]
};

const initialOrderHistory = {
  1: [
    {
      id: 1,
      date: '2024-01-25',
      items: [
        {
          id: 1,
          name: 'Saffron Threads',
          quantity: 2,
          price: 15.99
        }
      ],
      total: 31.98,
      status: 'delivered',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    }
  ]
};

export const UserProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [orderHistory, setOrderHistory] = useState(initialOrderHistory);

  const addAddress = (address) => {
    if (!user) return;
    setAddresses(prev => ({
      ...prev,
      [user.id]: [
        ...(prev[user.id] || []),
        {
          ...address,
          id: prev[user.id] ? Math.max(...prev[user.id].map(a => a.id)) + 1 : 1,
          isDefault: prev[user.id] ? false : true
        }
      ]
    }));
  };

  const updateAddress = (addressId, updates) => {
    if (!user) return;
    setAddresses(prev => ({
      ...prev,
      [user.id]: prev[user.id].map(addr =>
        addr.id === addressId ? { ...addr, ...updates } : addr
      )
    }));
  };

  const deleteAddress = (addressId) => {
    if (!user) return;
    setAddresses(prev => ({
      ...prev,
      [user.id]: prev[user.id].filter(addr => addr.id !== addressId)
    }));
  };

  const setDefaultAddress = (addressId) => {
    if (!user) return;
    setAddresses(prev => ({
      ...prev,
      [user.id]: prev[user.id].map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    }));
  };

  const getAddresses = () => {
    if (!user) return [];
    return addresses[user.id] || [];
  };

  const getDefaultAddress = () => {
    if (!user) return null;
    return (addresses[user.id] || []).find(addr => addr.isDefault);
  };

  const getOrderHistory = () => {
    if (!user) return [];
    return orderHistory[user.id] || [];
  };

  const addOrder = (order) => {
    if (!user) return;
    setOrderHistory(prev => ({
      ...prev,
      [user.id]: [
        {
          ...order,
          id: prev[user.id] ? Math.max(...prev[user.id].map(o => o.id)) + 1 : 1,
          date: new Date().toISOString().split('T')[0]
        },
        ...(prev[user.id] || [])
      ]
    }));
  };

  const value = {
    addresses: getAddresses(),
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getDefaultAddress,
    orderHistory: getOrderHistory(),
    addOrder
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}; 