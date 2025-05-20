import React from 'react';
import PropTypes from 'prop-types';
import './CategoryFilter.css';

const CategoryFilter = ({ categories = [], selectedCategory, onCategoryChange }) => {
  if (!Array.isArray(categories)) {
    console.warn('CategoryFilter: categories prop must be an array');
    return null;
  }

  return (
    <div className="category-filter">
      <button
        className={`category-btn ${!selectedCategory ? 'active' : ''}`}
        onClick={() => onCategoryChange(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired
};

export default CategoryFilter; 