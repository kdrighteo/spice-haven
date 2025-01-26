import React, { useState } from 'react';
import styled from 'styled-components';
import { useProducts } from '../../context/ProductContext';

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80px;
`;

const Button = styled.button`
  background: ${props => props.danger ? 'var(--primary)' : 'var(--secondary)'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const AddProductForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--light);
  border-radius: 8px;
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

const FormInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }
`;

const StockWarning = styled.span`
  color: ${props => props.low ? 'var(--primary)' : 'inherit'};
  font-weight: ${props => props.low ? '600' : 'normal'};
`;

function InventoryManagement() {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useProducts();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    origin: '',
    stock: '',
    image: ''
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      rating: 0,
      reviews: [],
      featured: false
    });
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      origin: '',
      stock: '',
      image: ''
    });
  };

  const handleUpdateStock = (id, newStock) => {
    updateProduct(id, { stock: parseInt(newStock) });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <Container>
      <Title>Inventory Management</Title>

      <AddProductForm onSubmit={handleAddProduct}>
        <FormGroup>
          <Label>Name</Label>
          <FormInput
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <FormInput
            type="text"
            value={newProduct.description}
            onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Price</Label>
          <FormInput
            type="number"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Category</Label>
          <Select
            value={newProduct.category}
            onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Origin</Label>
          <FormInput
            type="text"
            value={newProduct.origin}
            onChange={(e) => setNewProduct(prev => ({ ...prev, origin: e.target.value }))}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Stock</Label>
          <FormInput
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Image URL</Label>
          <FormInput
            type="text"
            value={newProduct.image}
            onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
            required
          />
        </FormGroup>

        <Button type="submit" style={{ marginTop: 'auto' }}>
          Add Product
        </Button>
      </AddProductForm>

      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td>${product.price.toFixed(2)}</Td>
              <Td>
                <Input
                  type="number"
                  value={product.stock}
                  onChange={(e) => handleUpdateStock(product.id, e.target.value)}
                />
                <StockWarning low={product.stock < 20}>
                  {product.stock < 20 ? ' (Low Stock)' : ''}
                </StockWarning>
              </Td>
              <Td>
                <Button danger onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default InventoryManagement; 