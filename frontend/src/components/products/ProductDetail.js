import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="product-detail">
      <div className="product-detail-grid">
        <div className="product-images">
          <img src={product.images[0]} alt={product.name} className="main-image" />
          <div className="thumbnail-grid">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - ${index + 1}`}
                className="thumbnail"
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-origin">Origin: {product.origin}</span>
            <div className="product-rating">
              {'⭐'.repeat(Math.round(product.averageRating))}
              <span>({product.averageRating.toFixed(1)})</span>
            </div>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <div className="product-details">
            <h3>Product Details</h3>
            <ul>
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              <li>
                <strong>Origin:</strong> {product.origin}
              </li>
              <li>
                <strong>Flavor Profile:</strong>{' '}
                {product.flavorProfile?.join(', ')}
              </li>
              <li>
                <strong>Heat Level:</strong> {product.heatLevel}/5
              </li>
              <li>
                <strong>Weight:</strong> {product.weight?.value}
                {product.weight?.unit}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 