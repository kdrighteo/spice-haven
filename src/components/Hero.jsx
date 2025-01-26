import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2000&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 1rem;
`;

const Content = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  font-weight: 500;

  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
  }
`;

function Hero() {
  return (
    <HeroSection>
      <Content>
        <Title>Discover the World of Premium Spices</Title>
        <Subtitle>
          Elevate your culinary creations with our carefully curated collection
          of authentic, high-quality spices from around the globe.
        </Subtitle>
        <CTAButton>Explore Our Collection</CTAButton>
      </Content>
    </HeroSection>
  );
}

export default Hero; 