import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1001;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 100%;
    right: ${props => props.isOpen ? '0' : '-100%'};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--dark);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--dark);
`;

const WishlistItems = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const EmptyWishlist = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--gray);
`;

const WishlistItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--dark);
`;

const ItemPrice = styled.span`
  color: var(--primary);
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Button = styled.button`
  background: ${props => props.secondary ? 'var(--light)' : 'var(--primary)'};
  color: ${props => props.secondary ? 'var(--dark)' : 'white'};
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.secondary ? '#e0e0e0' : '#ff5252'};
  }
`;

function Wishlist({ isOpen, onClose }) {
  const { wishlist, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <Container isOpen={isOpen}>
      <Header>
        <Title>Your Wishlist</Title>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Header>
      
      <WishlistItems>
        {wishlist.length === 0 ? (
          <EmptyWishlist>Your wishlist is empty</EmptyWishlist>
        ) : (
          wishlist.map(item => (
            <WishlistItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
              </ItemInfo>
              <ActionButtons>
                <Button onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
                <Button 
                  secondary 
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </Button>
              </ActionButtons>
            </WishlistItem>
          ))
        )}
      </WishlistItems>
    </Container>
  );
}

export default Wishlist; 