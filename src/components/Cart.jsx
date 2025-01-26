import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 999;
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--dark);
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--dark);
  padding: 0.5rem;
  
  &:hover {
    color: var(--primary);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  height: calc(100vh - 180px);
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--light);
  margin-bottom: 1rem;
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
  font-size: 1rem;
  color: var(--dark);
  margin: 0;
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: var(--primary);
  margin: 0.5rem 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: white;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const Quantity = styled.span`
  min-width: 24px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--error);
  cursor: pointer;
  padding: 0.25rem;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--gray);
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: white;
  border-top: 1px solid var(--light-gray);
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
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

function Cart({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Drawer isOpen={isOpen}>
        <Header>
          <Title>Your Cart</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>

        <Content>
          {cartItems.length === 0 ? (
            <EmptyCart>Your cart is empty</EmptyCart>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                  <QuantityControl>
                    <QuantityButton 
                      onClick={() => handleQuantityChange(item, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </QuantityButton>
                    <Quantity>{item.quantity}</Quantity>
                    <QuantityButton 
                      onClick={() => handleQuantityChange(item, 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </QuantityButton>
                  </QuantityControl>
                  <RemoveButton onClick={() => handleRemove(item.id)}>
                    Remove
                  </RemoveButton>
                </ItemInfo>
              </CartItem>
            ))
          )}
        </Content>

        <Footer>
          <Total>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </Total>
          <CheckoutButton disabled={cartItems.length === 0}>
            Proceed to Checkout
          </CheckoutButton>
        </Footer>
      </Drawer>
    </>
  );
}

export default Cart; 