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

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AddressCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
`;

const AddressActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.delete ? 'var(--error)' : 'var(--primary)'};
  cursor: pointer;
  padding: 0.25rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const AddressType = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: ${props => props.default ? 'var(--primary-light)' : 'var(--light)'};
  color: ${props => props.default ? 'var(--primary)' : 'var(--dark)'};
  border-radius: 4px;
  font-size: 0.85rem;
  margin-bottom: 1rem;
`;

const AddressDetails = styled.div`
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const AddressLine = styled.p`
  color: var(--dark);
  margin: 0.25rem 0;
`;

const Form = styled.form`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  color: var(--dark);
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
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
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  input {
    width: 1rem;
    height: 1rem;
  }

  label {
    font-size: 0.9rem;
    color: var(--dark);
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

function AddressBook() {
  const { user, updateAddresses } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validate required fields
      const requiredFields = ['fullName', 'addressLine1', 'city', 'state', 'zipCode', 'country', 'phone'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error('Please fill in all required fields');
      }

      // Add new address to user's addresses
      await updateAddresses([
        ...user.addresses,
        {
          id: Date.now(),
          ...formData
        }
      ]);

      setMessage({ text: 'Address added successfully', success: true });
      setFormData({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        isDefault: false,
      });
      setShowForm(false);
    } catch (error) {
      setMessage({ text: error.message, success: false });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
      await updateAddresses(updatedAddresses);
      setMessage({ text: 'Address deleted successfully', success: true });
    } catch (error) {
      setMessage({ text: error.message, success: false });
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const updatedAddresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }));
      await updateAddresses(updatedAddresses);
      setMessage({ text: 'Default address updated successfully', success: true });
    } catch (error) {
      setMessage({ text: error.message, success: false });
    }
  };

  if (!user) {
    return (
      <Container>
        <Message>Please log in to manage your addresses.</Message>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Address Book</Title>

      {message && (
        <Message success={message.success}>
          {message.text}
        </Message>
      )}

      {!showForm && (
        <Button onClick={() => setShowForm(true)} style={{ marginBottom: '2rem' }}>
          Add New Address
        </Button>
      )}

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <FormTitle>Add New Address</FormTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="addressLine1">Address Line 1 *</Label>
              <Input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="city">City *</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="state">State/Province *</Label>
              <Input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
              <Input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="country">Country *</Label>
              <Select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                {/* Add more countries as needed */}
              </Select>
            </FormGroup>
          </FormGrid>

          <Checkbox>
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <label htmlFor="isDefault">Set as default shipping address</label>
          </Checkbox>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Address'}
            </Button>
            <Button type="button" onClick={() => setShowForm(false)} style={{ background: 'var(--gray)' }}>
              Cancel
            </Button>
          </div>
        </Form>
      )}

      <AddressGrid>
        {user.addresses?.map(address => (
          <AddressCard key={address.id}>
            <AddressType default={address.isDefault}>
              {address.isDefault ? 'Default Address' : 'Shipping Address'}
            </AddressType>

            <AddressActions>
              {!address.isDefault && (
                <ActionButton onClick={() => handleSetDefault(address.id)}>
                  Set Default
                </ActionButton>
              )}
              <ActionButton delete onClick={() => handleDelete(address.id)}>
                Delete
              </ActionButton>
            </AddressActions>

            <AddressDetails>
              <AddressLine>{address.fullName}</AddressLine>
              <AddressLine>{address.phone}</AddressLine>
              <AddressLine>{address.addressLine1}</AddressLine>
              {address.addressLine2 && <AddressLine>{address.addressLine2}</AddressLine>}
              <AddressLine>
                {address.city}, {address.state} {address.zipCode}
              </AddressLine>
              <AddressLine>{address.country}</AddressLine>
            </AddressDetails>
          </AddressCard>
        ))}
      </AddressGrid>
    </Container>
  );
}

export default AddressBook; 