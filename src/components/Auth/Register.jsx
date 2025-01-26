import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Content = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--dark);
  
  &:hover {
    color: var(--primary);
  }
`;

const Title = styled.h2`
  color: var(--dark);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Button = styled.button`
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
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: var(--gray);
  
  button {
    background: none;
    border: none;
    color: var(--primary);
    cursor: pointer;
    padding: 0 0.25rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: var(--error);
  text-align: center;
  margin-bottom: 1rem;
`;

function Register({ isOpen, onClose, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password);
      onClose();
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClick={onClose}>
      <Content onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Create Account</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit">Register</Button>
        </Form>
        
        <SwitchText>
          Already have an account?
          <button type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </SwitchText>
      </Content>
    </Modal>
  );
}

export default Register; 