import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Test API configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Test functions
export const testApiConnection = async () => {
  try {
    const response = await api.get('/products');
    console.log('API Connection Test:', response.status === 200 ? 'Success' : 'Failed');
    return response.status === 200;
  } catch (error) {
    console.error('API Connection Test Failed:', error.message);
    return false;
  }
};

export const testAuthentication = async () => {
  try {
    // Test registration
    const registerResponse = await api.post('/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Registration Test:', registerResponse.status === 201 ? 'Success' : 'Failed');

    // Test login
    const loginResponse = await api.post('/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Login Test:', loginResponse.status === 200 ? 'Success' : 'Failed');

    // Store token
    if (loginResponse.data.token) {
      localStorage.setItem('token', loginResponse.data.token);
    }

    return loginResponse.status === 200;
  } catch (error) {
    console.error('Authentication Test Failed:', error.message);
    return false;
  }
};

export const testProductOperations = async () => {
  try {
    // Test get products
    const productsResponse = await api.get('/products');
    console.log('Get Products Test:', productsResponse.status === 200 ? 'Success' : 'Failed');

    // Test get single product if products exist
    if (productsResponse.data.length > 0) {
      const productId = productsResponse.data[0]._id;
      const singleProductResponse = await api.get(`/products/${productId}`);
      console.log('Get Single Product Test:', singleProductResponse.status === 200 ? 'Success' : 'Failed');
    }

    return productsResponse.status === 200;
  } catch (error) {
    console.error('Product Operations Test Failed:', error.message);
    return false;
  }
};

export const testOrderOperations = async () => {
  try {
    // Test get user orders
    const ordersResponse = await api.get('/orders/myorders');
    console.log('Get User Orders Test:', ordersResponse.status === 200 ? 'Success' : 'Failed');

    return ordersResponse.status === 200;
  } catch (error) {
    console.error('Order Operations Test Failed:', error.message);
    return false;
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('Starting API Integration Tests...');
  
  const apiConnection = await testApiConnection();
  console.log('API Connection:', apiConnection ? '✅' : '❌');

  const authentication = await testAuthentication();
  console.log('Authentication:', authentication ? '✅' : '❌');

  const productOperations = await testProductOperations();
  console.log('Product Operations:', productOperations ? '✅' : '❌');

  const orderOperations = await testOrderOperations();
  console.log('Order Operations:', orderOperations ? '✅' : '❌');

  console.log('All tests completed!');
}; 