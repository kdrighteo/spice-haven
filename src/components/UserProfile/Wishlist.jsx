import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: var(--dark);
  margin-bottom: 2rem;
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  color: var(--dark);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  color: var(--primary);
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
      background: var(--border);
    }
  `}

  &:disabled {
    background: var(--border);
    cursor: not-allowed;
  }
`;

const StockStatus = styled.div`
  color: ${props => props.inStock ? 'var(--success)' : 'var(--error)'};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: var(--gray);
`;

function Wishlist() {
  const { user, wishlist, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (!user) {
    return (
      <Container>
        <EmptyMessage>Please log in to view your wishlist.</EmptyMessage>
      </Container>
    );
  }

  if (!wishlist?.length) {
    return (
      <Container>
        <Title>My Wishlist</Title>
        <EmptyMessage>Your wishlist is empty.</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Wishlist</Title>
      <WishlistGrid>
        {wishlist.map(product => (
          <ProductCard key={product.id}>
            <ImageContainer>
              <ProductImage src={product.image} alt={product.name} />
            </ImageContainer>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              <StockStatus inStock={product.stock > 0}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </StockStatus>
              <ButtonGroup>
                <Button
                  primary
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
                <Button onClick={() => removeFromWishlist(product.id)}>
                  Remove
                </Button>
              </ButtonGroup>
            </ProductInfo>
          </ProductCard>
        ))}
      </WishlistGrid>
    </Container>
  );
}

export default Wishlist; 