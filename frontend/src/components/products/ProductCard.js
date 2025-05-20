import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  const { name, description, price, image, category, origin, averageRating } = product;
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await addToCart(product);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onClick={() => onClick && onClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image">
        <img src={image} alt={name} />
        <div className="product-category">{category}</div>
        <div className="quick-view">Quick View</div>
      </div>
      <div className="product-content">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-meta">
          <span className="product-origin">Origin: {origin}</span>
          <div className="product-rating">
            {'⭐'.repeat(Math.round(averageRating))}
            <span>({averageRating.toFixed(1)})</span>
          </div>
        </div>
        <div className="product-footer">
          <span className="product-price">${price.toFixed(2)}</span>
          <button 
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`} 
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 