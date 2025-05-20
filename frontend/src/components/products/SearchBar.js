import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for spices, sauces, and more..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar; 