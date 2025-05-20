import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import CategoryFilter from '../components/products/CategoryFilter';
import SearchBar from '../components/common/SearchBar';
import ProductDetail from '../components/products/ProductDetail';
import { useCart } from '../context/CartContext';
import './Pages.css';
import Cart from '../components/cart/Cart';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Ghost Pepper Sauce',
    description: 'Extremely hot sauce made with ghost peppers',
    price: 12.99,
    image: '/images/products/ghost-pepper.jpg',
    category: 'Hot Sauces',
    origin: 'Caribbean',
    flavorProfile: 'Fruity, Smoky',
    heatLevel: 'Extreme',
    averageRating: 4.8
  },
  {
    id: 2,
    name: 'Habanero Hot Sauce',
    description: 'Classic habanero sauce with a citrus twist',
    price: 9.99,
    image: '/images/products/habanero.jpg',
    category: 'Hot Sauces',
    origin: 'Mexico',
    flavorProfile: 'Citrus, Fruity',
    heatLevel: 'Hot',
    averageRating: 4.5
  },
  {
    id: 3,
    name: 'Mediterranean Blend',
    description: 'Aromatic blend of Mediterranean herbs and spices',
    price: 8.99,
    image: '/images/products/mediterranean-blend.jpg',
    category: 'Spice Blends',
    origin: 'Mediterranean',
    flavorProfile: 'Herbal, Savory',
    heatLevel: 'Mild',
    averageRating: 4.7
  },
  {
    id: 4,
    name: 'Black Peppercorns',
    description: 'Premium whole black peppercorns',
    price: 7.99,
    image: '/images/products/black-peppercorns.jpg',
    category: 'Whole Spices',
    origin: 'India',
    flavorProfile: 'Peppery, Warm',
    heatLevel: 'Mild',
    averageRating: 4.9
  }
];

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isCartOpen } = useCart();

  const categories = ["Hot Sauces", "Spice Blends", "Whole Spices", "All"];

  const handleSearch = (term) => {
    const filtered = mockProducts.filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(term.toLowerCase()) ||
       product.description.toLowerCase().includes(term.toLowerCase()) ||
       product.category.toLowerCase().includes(term.toLowerCase()) ||
       product.origin.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = category === 'all'
      ? mockProducts
      : mockProducts.filter(product => product.category === category);
    setSearchResults(filtered);
  };

  const handleSort = (value) => {
    setSortBy(value);
    const sorted = [...searchResults].sort((a, b) => {
      switch (value) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.averageRating - a.averageRating;
        default:
          return 0;
      }
    });
    setSearchResults(sorted);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="page-container">
      <div className="filters-section">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="sort-section">
          <h3>Sort By</h3>
          <select 
            value={sortBy} 
            onChange={(e) => handleSort(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <section className="products-section">
        <h2>All Products</h2>
        <div className="products-grid">
          {searchResults.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </section>
      {isCartOpen && <Cart />}
      {isCartOpen && <Cart />}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage; 