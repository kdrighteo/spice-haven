import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import QuickView from './QuickView/QuickView';
import ErrorBoundary from './ErrorBoundary';

const Section = styled.section`
  padding: 2rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const QuickViewButton = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardHeader}:hover & {
    opacity: 1;
  }

  &:hover {
    background: white;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: var(--dark);
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1.1rem;
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  background: var(--primary);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--light-gray);
    cursor: not-allowed;
  }
`;

const StockBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  background: ${props => props.inStock ? 'var(--success-light)' : 'var(--error-light)'};
  color: ${props => props.inStock ? 'var(--success)' : 'var(--error)'};
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--gray);
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.isInWishlist ? 'var(--primary)' : 'none'};
    stroke: ${props => props.isInWishlist ? 'var(--primary)' : 'var(--dark)'};
    stroke-width: 2;
  }
`;

function FeaturedSpicesContent() {
  const { addToCart } = useCart();
  const { user, addToWishlist, removeFromWishlist, wishlist } = useAuth();
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    
    if (!user) {
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

  const handleQuickView = (product, e) => {
    e?.stopPropagation();
    setSelectedProduct(product);
  };

  if (!products || products.length === 0) {
    return <NoResults>No spices found matching your criteria.</NoResults>;
  }

  return (
    <Section>
      <Grid>
        {products.map(product => (
          <Card key={product.id}>
            <CardHeader onClick={(e) => handleQuickView(product, e)}>
              <Image src={product.image} alt={product.name} />
              <WishlistButton
                onClick={(e) => handleWishlistToggle(e, product)}
                isInWishlist={wishlist?.some(item => item.id === product.id)}
                aria-label={wishlist?.some(item => item.id === product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </WishlistButton>
              <StockBadge inStock={product.stock > 0}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </StockBadge>
              <QuickViewButton onClick={(e) => handleQuickView(product, e)}>
                Quick View
              </QuickViewButton>
            </CardHeader>
            <CardBody>
              <Title>{product.name}</Title>
              <Price>${product.price.toFixed(2)}</Price>
              <Description>{product.description}</Description>
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={!product.stock}
              >
                Add to Cart
              </Button>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProductChange={(product) => setSelectedProduct(product)}
        />
      )}
    </Section>
  );
}

function FeaturedSpices() {
  return (
    <ErrorBoundary>
      <FeaturedSpicesContent />
    </ErrorBoundary>
  );
}

export default FeaturedSpices; 