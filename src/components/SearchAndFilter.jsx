import React from 'react';
import styled from 'styled-components';
import { useProducts } from '../context/ProductContext';

const Container = styled.div`
  padding: 1rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PriceInput = styled.input`
  width: 80px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

function SearchAndFilter() {
  const { filters, updateFilters, categories } = useProducts();

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleCategoryChange = (e) => {
    updateFilters({ category: e.target.value });
  };

  const handleSortChange = (e) => {
    updateFilters({ sort: e.target.value });
  };

  const handleMinPriceChange = (e) => {
    updateFilters({ minPrice: e.target.value });
  };

  const handleMaxPriceChange = (e) => {
    updateFilters({ maxPrice: e.target.value });
  };

  return (
    <Container>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search spices..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </SearchBar>

      <FilterSection>
        <Select value={filters.category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        <PriceRange>
          <PriceInput
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleMinPriceChange}
            min="0"
          />
          <span>-</span>
          <PriceInput
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleMaxPriceChange}
            min="0"
          />
        </PriceRange>

        <Select value={filters.sort} onChange={handleSortChange}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </Select>
      </FilterSection>
    </Container>
  );
}

export default SearchAndFilter; 