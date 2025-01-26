import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background: var(--light);
  border-radius: 8px;
  margin: 1rem;
`;

const ErrorTitle = styled.h2`
  color: var(--error);
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: var(--gray);
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message || 'An unexpected error occurred'}
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 