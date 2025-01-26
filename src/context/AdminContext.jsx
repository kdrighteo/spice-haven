import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

const initialOrders = [
  {
    id: 1,
    date: '2024-01-25',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001'
    },
    items: [
      {
        id: 1,
        name: 'Saffron Threads',
        quantity: 2,
        price: 15.99
      }
    ],
    total: 31.98,
    status: 'pending',
    paymentStatus: 'paid',
    paymentId: 'pi_123456'
  }
];

export function AdminProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminLogin = (password) => {
    // In a real app, this would verify against a backend
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
  };

  const addOrder = (order) => {
    setOrders(prev => [
      {
        ...order,
        id: prev.length + 1,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      },
      ...prev
    ]);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  const updatePaymentStatus = (orderId, paymentStatus, paymentId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, paymentStatus, paymentId } : order
    ));
  };

  const getOrders = () => orders;

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  const getOrdersByDate = (startDate, endDate) => {
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
  };

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'completed').length;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
      averageOrderValue: totalOrders ? totalRevenue / totalOrders : 0
    };
  };

  const processPayment = async (orderId, paymentDetails) => {
    try {
      // In a real application, this would integrate with a payment gateway
      const paymentId = `pi_${Math.random().toString(36).substr(2, 9)}`;
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update order with payment information
      updatePaymentStatus(orderId, 'paid', paymentId);
      
      return {
        success: true,
        paymentId,
        message: 'Payment processed successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Payment processing failed'
      };
    }
  };

  const refundPayment = async (orderId) => {
    try {
      // In a real application, this would integrate with a payment gateway
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update order payment status
      updatePaymentStatus(orderId, 'refunded', null);
      
      return {
        success: true,
        message: 'Refund processed successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Refund processing failed'
      };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminLogin,
        adminLogout,
        orders,
        addOrder,
        updateOrderStatus,
        getOrders,
        getOrdersByStatus,
        getOrdersByDate,
        getTotalRevenue,
        getOrderStats,
        processPayment,
        refundPayment
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
} 