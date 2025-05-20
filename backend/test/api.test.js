const axios = require('axios');
const { expect } = require('chai');

const API_URL = 'http://localhost:5000/api';
let authToken;
let productId;
let orderId;

describe('Spice Haven API Tests', () => {
  // Auth Tests
  describe('Authentication', () => {
    it('should register a new user', async () => {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
      expect(response.status).to.equal(201);
      expect(response.data).to.have.property('token');
      authToken = response.data.token;
    });

    it('should login existing user', async () => {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('token');
    });
  });

  // Product Tests
  describe('Products', () => {
    it('should create a new product', async () => {
      const response = await axios.post(
        `${API_URL}/products`,
        {
          name: 'Test Spice',
          description: 'A test spice product',
          price: 9.99,
          images: ['test-image.jpg'],
          category: 'ground',
          origin: 'India',
          flavorProfile: ['spicy', 'aromatic'],
          heatLevel: 3,
          stock: 100,
          weight: {
            value: 100,
            unit: 'g'
          }
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      expect(response.status).to.equal(201);
      productId = response.data._id;
    });

    it('should get all products', async () => {
      const response = await axios.get(`${API_URL}/products`);
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
    });

    it('should get single product', async () => {
      const response = await axios.get(`${API_URL}/products/${productId}`);
      expect(response.status).to.equal(200);
      expect(response.data._id).to.equal(productId);
    });
  });

  // Order Tests
  describe('Orders', () => {
    it('should create a new order', async () => {
      const response = await axios.post(
        `${API_URL}/orders`,
        {
          items: [
            {
              product: productId,
              quantity: 2,
              price: 9.99
            }
          ],
          shippingAddress: {
            street: '123 Test St',
            city: 'Test City',
            state: 'Test State',
            zipCode: '12345',
            country: 'Test Country'
          },
          paymentMethod: 'credit_card',
          shippingPrice: 5.99
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      expect(response.status).to.equal(201);
      orderId = response.data._id;
    });

    it('should get user orders', async () => {
      const response = await axios.get(`${API_URL}/orders/myorders`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
    });
  });
}); 