import React, { useState } from 'react';

const ShippingForm = ({ onShippingSubmit }) => {
  const [shippingData, setShippingData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (can be enhanced later)
    if (shippingData.address && shippingData.city && shippingData.postalCode && shippingData.country) {
      onShippingSubmit(shippingData);
    } else {
      alert('Please fill in all shipping information.'); // Simple alert for now
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" value={shippingData.address} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" value={shippingData.city} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" name="postalCode" value={shippingData.postalCode} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input type="text" id="country" name="country" value={shippingData.country} onChange={handleChange} required />
      </div>
      {/* Submit button is in CheckoutPage */}
    </form>
  );
};

export default ShippingForm; 