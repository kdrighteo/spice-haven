import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = styled.section`
  height: 90vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2000&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 1rem;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  max-width: 800px;
  animation: ${fadeIn} 1s ease-out;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled.button`
  background: ${props => props.secondary ? 'transparent' : 'var(--primary)'};
  color: white;
  border: ${props => props.secondary ? '2px solid white' : 'none'};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  min-width: 200px;

  &:hover {
    background: ${props => props.secondary ? 'rgba(255, 255, 255, 0.1)' : 'var(--primary-dark)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  opacity: 0.8;
`;

function Hero() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeroSection>
      <Content>
        <Title>Discover the World of Premium Spices</Title>
        <Subtitle>
          Elevate your culinary creations with our carefully curated collection
          of authentic, high-quality spices from around the globe.
        </Subtitle>
        <ButtonGroup>
          <CTAButton 
            onClick={() => navigate('/products')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Explore Collection
          </CTAButton>
          <CTAButton 
            secondary
            onClick={() => navigate('/about')}
          >
            Learn More
          </CTAButton>
        </ButtonGroup>
      </Content>
      <ScrollIndicator onClick={scrollToContent}>
        <ScrollText>Scroll to explore</ScrollText>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </ScrollIndicator>
    </HeroSection>
  );
}

export default Hero; 