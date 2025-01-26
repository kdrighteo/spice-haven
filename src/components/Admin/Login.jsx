import React, { useState } from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../context/AdminContext';

const Container = styled.div`
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

const LoginPanel = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  text-align: center;
  color: var(--dark);
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--dark);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.error ? 'var(--primary)' : '#ddd'};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }
`;

const ErrorMessage = styled.span`
  color: var(--primary);
  font-size: 0.8rem;
`;

const Button = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #ff5252;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
`;

function AdminLogin({ isOpen, onClose, onLoginSuccess }) {
  const { adminLogin } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Password is required');
      return;
    }

    if (adminLogin(password)) {
      setPassword('');
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <Container isOpen={isOpen}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <LoginPanel>
        <Title>Admin Login</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              error={error}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
      </LoginPanel>
    </Container>
  );
}

export default AdminLogin; 