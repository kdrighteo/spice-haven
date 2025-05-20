import React from 'react';
import './CategoryFilter.css';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'ground', name: 'Ground Spices' },
  { id: 'whole', name: 'Whole Spices' },
  { id: 'blends', name: 'Spice Blends' },
  { id: 'seeds', name: 'Seeds' },
  { id: 'herbs', name: 'Herbs' }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-list">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 