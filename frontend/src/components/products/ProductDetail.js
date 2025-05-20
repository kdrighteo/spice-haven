import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const {
    name,
    description,
    price,
    image,
    category,
    origin,
    flavorProfile,
    heatLevel,
    averageRating
  } = product;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="product-detail-overlay" onClick={handleOverlayClick}>
      <div className="product-detail" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close">×</button>
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={image} alt={name} />
          </div>
          <div className="product-detail-info">
            <h2>{name}</h2>
            <p className="description">{description}</p>
            <div className="product-meta">
              <div className="meta-item">
                <span className="label">Category:</span>
                <span className="value">{category}</span>
              </div>
              <div className="meta-item">
                <span className="label">Origin:</span>
                <span className="value">{origin}</span>
              </div>
              <div className="meta-item">
                <span className="label">Flavor Profile:</span>
                <span className="value">{flavorProfile}</span>
              </div>
              <div className="meta-item">
                <span className="label">Heat Level:</span>
                <span className="value">{'🌶️'.repeat(heatLevel)}</span>
              </div>
              <div className="meta-item">
                <span className="label">Rating:</span>
                <span className="value">{'⭐'.repeat(Math.round(averageRating))} ({averageRating.toFixed(1)})</span>
              </div>
            </div>
            <div className="product-actions">
              <span className="price">${price.toFixed(2)}</span>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 