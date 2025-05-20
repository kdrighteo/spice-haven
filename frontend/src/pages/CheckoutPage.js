import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import './Pages.css';

const CheckoutPage = () => {
  const { cart, getCartTotal } = useCart();
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    // Potentially move to payment step or enable payment form
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    // Process order here
    console.log('Order placed with:', shippingData, data);
    // Clear cart and navigate to order confirmation
  };

  const handlePlaceOrder = () => {
    // This function will be triggered when the main Place Order button is clicked
    // It should ideally gather data from both forms and send to backend
    if (!shippingData) {
        alert('Please complete shipping information.');
        return;
    }
    if (!paymentData) {
        alert('Please complete payment information.');
        return;
    }

    // Process order (backend API call will go here)
    console.log('Placing order with:', shippingData, paymentData, cart);
    // Example: call an API function like createOrder(shippingData, paymentData, cart);

    // After successful order creation:
    // clearCart(); // Assuming you have clearCart in your cart context
    // navigate('/order-confirmation'); // Navigate to a confirmation page
  };

  return (
    <div className="page-container">
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <div className="checkout-empty">
          <p>Your cart is empty. Add items to checkout.</p>
          {/* Optionally add a link back to products page */}
        </div>
      ) : (
        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <p>{item.name} x {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="order-total">
              <h3>Total:</h3>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="shipping-payment-forms">
            <h2>Shipping Information</h2>
            <ShippingForm onShippingSubmit={setShippingData} />

            <h2>Payment Information</h2>
            <PaymentForm onPaymentSubmit={setPaymentData} />

            <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage; 