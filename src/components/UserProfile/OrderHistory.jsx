import React from 'react';
import styled from 'styled-components';
import { useUserProfile } from '../../context/UserProfileContext';

const Container = styled.div``;

const OrderCard = styled.div`
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light-gray);
`;

const OrderInfo = styled.div``;

const OrderId = styled.p`
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 0.5rem;
`;

const OrderDate = styled.p`
  font-size: 0.9rem;
  color: var(--gray);
`;

const OrderStatus = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-transform: capitalize;
  background: ${props => {
    switch (props.status) {
      case 'delivered':
        return 'var(--success-light)';
      case 'processing':
        return 'var(--warning-light)';
      case 'cancelled':
        return 'var(--error-light)';
      default:
        return 'var(--light-gray)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'delivered':
        return 'var(--success)';
      case 'processing':
        return 'var(--warning)';
      case 'cancelled':
        return 'var(--error)';
      default:
        return 'var(--dark)';
    }
  }};
`;

const ItemsContainer = styled.div`
  margin-bottom: 1rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-size: 1rem;
  color: var(--dark);
`;

const ItemQuantity = styled.p`
  font-size: 0.9rem;
  color: var(--gray);
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: var(--dark);
  font-weight: 500;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--light-gray);
`;

const ShippingAddress = styled.div`
  font-size: 0.9rem;
  color: var(--gray);
`;

const Total = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--dark);
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: var(--gray);
  margin: 2rem 0;
`;

const OrderHistory = () => {
  const { orderHistory } = useUserProfile();

  if (orderHistory.length === 0) {
    return (
      <Container>
        <EmptyMessage>No orders found.</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      {orderHistory.map(order => (
        <OrderCard key={order.id}>
          <OrderHeader>
            <OrderInfo>
              <OrderId>Order #{order.id}</OrderId>
              <OrderDate>Placed on {order.date}</OrderDate>
            </OrderInfo>
            <OrderStatus status={order.status}>{order.status}</OrderStatus>
          </OrderHeader>

          <ItemsContainer>
            {order.items.map(item => (
              <Item key={item.id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                </ItemInfo>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </Item>
            ))}
          </ItemsContainer>

          <OrderFooter>
            <ShippingAddress>
              Shipped to:<br />
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </ShippingAddress>
            <Total>Total: ${order.total.toFixed(2)}</Total>
          </OrderFooter>
        </OrderCard>
      ))}
    </Container>
  );
};

export default OrderHistory; 