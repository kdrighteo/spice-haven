import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CheckoutContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const CheckoutPanel = styled.div`
  background: white;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 8px;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 95%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--dark);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.error ? 'var(--primary)' : '#ddd'};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }
`;

const ErrorMessage = styled.span`
  color: var(--primary);
  font-size: 0.8rem;
`;

const OrderSummary = styled.div`
  background: var(--light);
  padding: 1.5rem;
  border-radius: 8px;
`;

const SummaryTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: var(--dark);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #ddd;
  font-weight: 600;
  font-size: 1.2rem;
`;

const PlaceOrderButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;

  &:hover {
    background: #ff5252;
  }

  &:disabled {
    background: var(--gray);
    cursor: not-allowed;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
`;

function Checkout({ isOpen, onClose }) {
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the order to a backend server
      console.log('Order placed:', { formData, items: cartItems, total: cartTotal });
      alert('Order placed successfully!');
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <CheckoutContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <CheckoutPanel>
        <Form onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            />
            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>ZIP Code</Label>
            <Input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
            />
            {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
          </FormGroup>
          <h2>Payment Information</h2>
          <FormGroup>
            <Label>Card Number</Label>
            <Input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              error={errors.cardNumber}
            />
            {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>Expiry Date</Label>
            <Input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              error={errors.expiryDate}
            />
            {errors.expiryDate && <ErrorMessage>{errors.expiryDate}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>CVV</Label>
            <Input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              error={errors.cvv}
            />
            {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
          </FormGroup>
        </Form>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          {cartItems.map(item => (
            <SummaryItem key={item.id}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </SummaryItem>
          ))}
          <Total>
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </Total>
          <PlaceOrderButton type="submit" onClick={handleSubmit}>
            Place Order
          </PlaceOrderButton>
        </OrderSummary>
      </CheckoutPanel>
    </CheckoutContainer>
  );
}

export default Checkout; 