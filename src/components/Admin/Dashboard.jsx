import React, { useState } from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../context/AdminContext';
import InventoryManagement from './InventoryManagement';
import SalesAnalytics from './SalesAnalytics';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--light);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 2000;
  overflow-y: auto;
`;

const Header = styled.header`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Title = styled.h1`
  color: var(--dark);
  font-size: 1.5rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'var(--primary)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--dark)'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? 'var(--primary)' : 'var(--light)'};
  }
`;

const CloseButton = styled.button`
  background: var(--gray);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #7a8793;
  }
`;

function Dashboard({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <Container isOpen={isOpen}>
      <Header>
        <Title>Admin Dashboard</Title>
        <CloseButton onClick={onClose}>Close Dashboard</CloseButton>
      </Header>

      <Content>
        <TabsContainer>
          <Tab
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          >
            Sales Analytics
          </Tab>
          <Tab
            active={activeTab === 'inventory'}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory Management
          </Tab>
        </TabsContainer>

        {activeTab === 'analytics' && <SalesAnalytics />}
        {activeTab === 'inventory' && <InventoryManagement />}
      </Content>
    </Container>
  );
}

export default Dashboard; 