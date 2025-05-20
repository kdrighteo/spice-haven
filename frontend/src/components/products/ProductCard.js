import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { name, description, price, images, category, origin, averageRating } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={images[0]} alt={name} />
        <div className="product-category">{category}</div>
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
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 