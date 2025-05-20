import React, { useState } from 'react';

const PaymentForm = ({ onPaymentSubmit }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (can be enhanced later)
    if (paymentData.cardNumber && paymentData.expiryDate && paymentData.cvv && paymentData.cardName) {
      onPaymentSubmit(paymentData);
    } else {
      alert('Please fill in all payment information.'); // Simple alert for now
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" name="cardNumber" value={paymentData.cardNumber} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
        <input type="text" id="expiryDate" name="expiryDate" value={paymentData.expiryDate} onChange={handleChange} required placeholder="MM/YY" />
      </div>
      <div className="form-group">
        <label htmlFor="cvv">CVV</label>
        <input type="text" id="cvv" name="cvv" value={paymentData.cvv} onChange={handleChange} required />
      </div>
       <div className="form-group">
        <label htmlFor="cardName">Name on Card</label>
        <input type="text" id="cardName" name="cardName" value={paymentData.cardName} onChange={handleChange} required />
      </div>
       {/* Submit button is in CheckoutPage */}
    </form>
  );
};

export default PaymentForm; 