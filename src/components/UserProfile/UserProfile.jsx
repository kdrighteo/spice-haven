import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: var(--dark);
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: var(--dark);
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--border);
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  background: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
`;

function UserProfile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validate passwords match if changing password
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
        if (!formData.currentPassword) {
          throw new Error('Current password is required to change password');
        }
      }

      // Call update profile function from auth context
      await updateProfile({
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setMessage({ text: 'Profile updated successfully', success: true });
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      setMessage({ text: error.message, success: false });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container>
        <Message>Please log in to view your profile.</Message>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Profile</Title>
      
      <ProfileCard>
        {message && (
          <Message success={message.success}>
            {message.text}
          </Message>
        )}

        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Personal Information</SectionTitle>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>Change Password</SectionTitle>
            <FormGroup>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </FormGroup>
          </Section>

          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Form>
      </ProfileCard>
    </Container>
  );
}

export default UserProfile; 