import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserProfile } from '../../context/UserProfileContext';

const Container = styled.div``;

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const AddressCard = styled.div`
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
`;

const AddressType = styled.h3`
  font-size: 1.2rem;
  color: var(--dark);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DefaultBadge = styled.span`
  background: var(--primary);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const AddressText = styled.p`
  color: var(--gray);
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  ${props => props.primary ? `
    background: var(--primary);
    color: white;
    &:hover {
      background: var(--primary-dark);
    }
  ` : `
    background: var(--light);
    color: var(--dark);
    &:hover {
      background: var(--light-gray);
    }
  `}
`;

const AddressForm = styled.form`
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: var(--dark);
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

const AddressBook = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUserProfile();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
    } else {
      addAddress(formData);
    }
    setShowForm(false);
    setEditingAddress(null);
    setFormData({ type: '', street: '', city: '', state: '', zipCode: '' });
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowForm(true);
  };

  return (
    <Container>
      <Button primary onClick={() => setShowForm(true)}>
        Add New Address
      </Button>

      {showForm && (
        <AddressForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Address Type</Label>
            <Input
              type="text"
              placeholder="Home, Work, etc."
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Street Address</Label>
            <Input
              type="text"
              value={formData.street}
              onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>City</Label>
            <Input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>State</Label>
            <Input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>ZIP Code</Label>
            <Input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button primary type="submit">
              {editingAddress ? 'Update Address' : 'Add Address'}
            </Button>
            <Button onClick={() => {
              setShowForm(false);
              setEditingAddress(null);
              setFormData({ type: '', street: '', city: '', state: '', zipCode: '' });
            }}>
              Cancel
            </Button>
          </ButtonGroup>
        </AddressForm>
      )}

      <AddressGrid>
        {addresses.map(address => (
          <AddressCard key={address.id}>
            <AddressType>
              {address.type}
              {address.isDefault && <DefaultBadge>Default</DefaultBadge>}
            </AddressType>
            <AddressText>
              {address.street}<br />
              {address.city}, {address.state} {address.zipCode}
            </AddressText>
            <ButtonGroup>
              <Button onClick={() => handleEdit(address)}>Edit</Button>
              <Button onClick={() => deleteAddress(address.id)}>Delete</Button>
              {!address.isDefault && (
                <Button onClick={() => setDefaultAddress(address.id)}>
                  Set as Default
                </Button>
              )}
            </ButtonGroup>
          </AddressCard>
        ))}
      </AddressGrid>
    </Container>
  );
};

export default AddressBook; 