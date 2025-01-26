import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: var(--dark);
  margin-bottom: 2rem;
`;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const OrderId = styled.span`
  font-weight: 500;
  color: var(--dark);
`;

const OrderDate = styled.span`
  color: var(--gray);
  font-size: 0.9rem;
`;

const OrderStatus = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'pending':
        return '#fff3cd';
      case 'processing':
        return '#cfe2ff';
      case 'shipped':
        return '#d1e7dd';
      case 'delivered':
        return '#d4edda';
      case 'cancelled':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#856404';
      case 'processing':
        return '#084298';
      case 'shipped':
        return '#0f5132';
      case 'delivered':
        return '#155724';
      case 'cancelled':
        return '#721c24';
      default:
        return '#383d41';
    }
  }};
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.span`
  font-weight: 500;
  color: var(--dark);
`;

const ItemPrice = styled.span`
  color: var(--dark);
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-weight: 500;
`;

const NoOrders = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: var(--gray);
`;

function OrderHistory() {
  const { user } = useAuth();
  const { getOrdersByUser } = useAdmin();
  const orders = getOrdersByUser(user?.id);

  if (!user) {
    return (
      <Container>
        <NoOrders>Please log in to view your order history.</NoOrders>
      </Container>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Container>
        <Title>Order History</Title>
        <NoOrders>You haven't placed any orders yet.</NoOrders>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Order History</Title>
      <OrdersContainer>
        {orders.map(order => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderInfo>
                <OrderId>Order #{order.id}</OrderId>
                <OrderDate>{new Date(order.date).toLocaleDateString()}</OrderDate>
              </OrderInfo>
              <OrderStatus status={order.status}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </OrderStatus>
            </OrderHeader>

            <ItemsContainer>
              {order.items.map(item => (
                <Item key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)} x {item.quantity}</ItemPrice>
                  </ItemInfo>
                </Item>
              ))}
            </ItemsContainer>

            <OrderTotal>
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </OrderTotal>
          </OrderCard>
        ))}
      </OrdersContainer>
    </Container>
  );
}

export default OrderHistory; 