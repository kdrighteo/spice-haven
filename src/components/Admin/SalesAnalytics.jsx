import React, { useState } from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../context/AdminContext';

const Container = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: var(--dark);
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: var(--light);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const StatTitle = styled.h3`
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: var(--dark);
  font-size: 1.8rem;
  font-weight: 600;
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #eee;
  color: var(--gray);
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }
`;

const DateInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }
`;

function SalesAnalytics() {
  const { orders, getOrdersByDate, getOrderStats } = useAdmin();
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [timeFrame, setTimeFrame] = useState('month');

  const stats = getOrderStats();
  const filteredOrders = getOrdersByDate(dateRange.start, dateRange.end);

  const calculateDailyRevenue = () => {
    const dailyRevenue = {};
    filteredOrders.forEach(order => {
      const date = order.date.split('T')[0];
      dailyRevenue[date] = (dailyRevenue[date] || 0) + order.total;
    });
    return dailyRevenue;
  };

  const calculateTopProducts = () => {
    const productSales = {};
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
      });
    });
    return Object.entries(productSales)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const handleTimeFrameChange = (e) => {
    const frame = e.target.value;
    setTimeFrame(frame);
    
    const end = new Date();
    let start = new Date();
    
    switch (frame) {
      case 'week':
        start.setDate(start.getDate() - 7);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 1);
        break;
      case 'year':
        start.setFullYear(start.getFullYear() - 1);
        break;
      default:
        break;
    }
    
    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  };

  return (
    <Container>
      <Title>Sales Analytics</Title>

      <FilterSection>
        <Select value={timeFrame} onChange={handleTimeFrameChange}>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </Select>
        <DateInput
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
        />
        <DateInput
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
        />
      </FilterSection>

      <StatsGrid>
        <StatCard>
          <StatTitle>Total Revenue</StatTitle>
          <StatValue>${stats.totalRevenue.toFixed(2)}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Total Orders</StatTitle>
          <StatValue>{stats.totalOrders}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Average Order Value</StatTitle>
          <StatValue>${stats.averageOrderValue.toFixed(2)}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Pending Orders</StatTitle>
          <StatValue>{stats.pendingOrders}</StatValue>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <Title>Top Selling Products</Title>
        <Table>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>Units Sold</Th>
            </tr>
          </thead>
          <tbody>
            {calculateTopProducts().map(([product, quantity]) => (
              <tr key={product}>
                <Td>{product}</Td>
                <Td>{quantity}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ChartContainer>

      <ChartContainer>
        <Title>Recent Orders</Title>
        <Table>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Order ID</Th>
              <Th>Customer</Th>
              <Th>Total</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.slice(0, 5).map(order => (
              <tr key={order.id}>
                <Td>{new Date(order.date).toLocaleDateString()}</Td>
                <Td>#{order.id}</Td>
                <Td>{order.customer.name}</Td>
                <Td>${order.total.toFixed(2)}</Td>
                <Td>{order.status}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ChartContainer>
    </Container>
  );
}

export default SalesAnalytics; 