import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={() => setIsCartOpen(false)}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Link to="/products" className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button className="btn btn-secondary" onClick={clearCart}>
                  Clear Cart
                </button>
                <Link to="/checkout" className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 