import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import ErrorBoundary from '../ErrorBoundary';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 95%;
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
  color: var(--dark);
  z-index: 1;

  &:hover {
    color: var(--primary);
  }
`;

const ImageSection = styled.div`
  position: relative;
  background: var(--light);
  border-radius: 8px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  opacity: ${props => props.isLoading ? 0 : 1};
  transition: opacity 0.3s ease;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 3px solid var(--light-gray);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: var(--error);
  text-align: center;
  padding: 1rem;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: var(--dark);
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1.4rem;
  color: var(--primary);
  font-weight: 500;
`;

const Description = styled.p`
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const StockInfo = styled.p`
  color: ${props => props.inStock ? 'var(--success)' : 'var(--error)'};
  font-weight: 500;
  margin-bottom: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const QuantityButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: var(--light);
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background: var(--light-gray);
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.1rem;
  color: var(--dark);
  min-width: 40px;
  text-align: center;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  ${props => props.primary ? `
    background: var(--primary);
    color: white;
    &:hover {
      background: var(--primary-dark);
    }
  ` : `
    background: var(--light);
    color: var(--dark);
    &:hover {
      background: var(--light-gray);
    }
  `}

  &:disabled {
    background: var(--light-gray);
    cursor: not-allowed;
  }
`;

const RelatedProducts = styled.div`
  grid-column: 1 / -1;
  margin-top: 2rem;
`;

const RelatedTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--dark);
  margin-bottom: 1rem;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const RelatedCard = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--light);
  }
`;

const RelatedImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const RelatedName = styled.p`
  font-size: 1rem;
  color: var(--dark);
  margin-bottom: 0.25rem;
`;

const RelatedPrice = styled.p`
  font-size: 0.9rem;
  color: var(--primary);
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.isInWishlist ? 'var(--primary)' : 'var(--dark)'};
  z-index: 1;

  &:hover {
    color: ${props => props.isInWishlist ? 'var(--primary-dark)' : 'var(--primary)'};
  }
`;

function QuickViewContent({ product, isOpen, onClose, onProductChange }) {
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { getProductsByCategory } = useProducts();
  const { user, addToWishlist, removeFromWishlist, wishlist } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setImageLoading(true);
      setImageError(false);
    }
  }, [isOpen, product]);

  const handleQuantityChange = (change) => {
    if (!product) return;
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
    onClose();
  };

  const handleWishlistToggle = () => {
    if (!product || !user) {
      alert('Please login to add items to your wishlist');
      return;
    }
    const isInWishlist = wishlist?.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const relatedProducts = product ? getProductsByCategory(product.category)?.filter(p => p.id !== product.id).slice(0, 4) : [];

  if (!product || !isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <Content onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <ImageSection>
          {imageLoading && <LoadingSpinner />}
          {imageError ? (
            <ErrorMessage>Failed to load image</ErrorMessage>
          ) : (
            <ProductImage
              src={product.image}
              alt={product.name}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
              isLoading={imageLoading}
            />
          )}
          <WishlistButton
            onClick={handleWishlistToggle}
            isInWishlist={wishlist?.some(item => item.id === product.id)}
            aria-label={wishlist?.some(item => item.id === product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            ♥
          </WishlistButton>
        </ImageSection>

        <InfoSection>
          <Title>{product.name}</Title>
          <Price>${product.price.toFixed(2)}</Price>
          <Description>{product.description}</Description>
          <StockInfo inStock={product.stock > 0}>
            {product.stock > 0 ? `${product.stock} units in stock` : 'Out of Stock'}
          </StockInfo>

          <QuantityControl>
            <QuantityButton 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton 
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= (product.stock || 0)}
            >
              +
            </QuantityButton>
          </QuantityControl>

          <Button
            primary
            onClick={handleAddToCart}
            disabled={!product.stock || product.stock === 0}
          >
            Add to Cart
          </Button>
        </InfoSection>

        {relatedProducts?.length > 0 && (
          <RelatedProducts>
            <RelatedTitle>Related Products</RelatedTitle>
            <RelatedGrid>
              {relatedProducts.map(relatedProduct => (
                <RelatedCard
                  key={relatedProduct.id}
                  onClick={() => onProductChange(relatedProduct)}
                >
                  <RelatedImage src={relatedProduct.image} alt={relatedProduct.name} />
                  <RelatedName>{relatedProduct.name}</RelatedName>
                  <RelatedPrice>${relatedProduct.price.toFixed(2)}</RelatedPrice>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </RelatedProducts>
        )}
      </Content>
    </Modal>
  );
}

function QuickView(props) {
  return (
    <ErrorBoundary>
      <QuickViewContent {...props} />
    </ErrorBoundary>
  );
}

export default QuickView; 