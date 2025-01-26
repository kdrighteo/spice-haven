import React, { useState } from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../context/AdminContext';
import { useCart } from '../../context/CartContext';

const Container = styled.div`
  margin: 2rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
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

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }
`;

const Button = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #ff5252;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: var(--primary);
  font-size: 0.8rem;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  text-align: center;
  padding: 1rem;
  background: #e8f5e9;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

function PaymentProcessor({ customerInfo, onPaymentComplete }) {
  const { processPayment } = useAdmin();
  const { cart, total, clearCart } = useCart();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit'
  });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 16) {
      setError('Please enter a valid card number');
      return false;
    }
    if (!paymentDetails.expiryDate) {
      setError('Please enter the card expiry date');
      return false;
    }
    if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
      setError('Please enter a valid CVV');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setProcessing(true);
    setError('');

    try {
      const order = {
        items: cart,
        total,
        customer: customerInfo,
        date: new Date().toISOString(),
        status: 'pending'
      };

      const result = await processPayment(order.id, paymentDetails);
      
      if (result.success) {
        setSuccess(true);
        clearCart();
        onPaymentComplete(result.paymentId);
      } else {
        setError(result.error || 'Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <Container>
        <SuccessMessage>
          Payment processed successfully! Your order is confirmed.
        </SuccessMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Payment Method</Label>
          <Select
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Card Number</Label>
          <Input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            maxLength="16"
            error={error && error.includes('card number')}
          />
        </FormGroup>

        <FormGroup>
          <Label>Expiry Date</Label>
          <Input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
            maxLength="5"
            error={error && error.includes('expiry date')}
          />
        </FormGroup>

        <FormGroup>
          <Label>CVV</Label>
          <Input
            type="text"
            name="cvv"
            placeholder="123"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            maxLength="4"
            error={error && error.includes('CVV')}
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={processing}>
          {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </Button>
      </Form>
    </Container>
  );
}

export default PaymentProcessor; 