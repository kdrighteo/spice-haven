import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserProfile } from '../../context/UserProfileContext';
import { useAuth } from '../../context/AuthContext';
import AddressBook from './AddressBook';
import OrderHistory from './OrderHistory';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--dark);
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--light-gray);
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: ${props => props.active ? 'var(--primary)' : 'var(--dark)'};
  border-bottom: 2px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary);
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('addresses');
  const { user } = useAuth();

  if (!user) {
    return (
      <Container>
        <p>Please log in to view your profile.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>My Profile</Title>
      </Header>

      <TabsContainer>
        <Tab
          active={activeTab === 'addresses'}
          onClick={() => setActiveTab('addresses')}
        >
          Address Book
        </Tab>
        <Tab
          active={activeTab === 'orders'}
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </Tab>
      </TabsContainer>

      <Content>
        {activeTab === 'addresses' ? (
          <AddressBook />
        ) : (
          <OrderHistory />
        )}
      </Content>
    </Container>
  );
};

export default UserProfile; 