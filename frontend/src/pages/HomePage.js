import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import SearchBar from '../components/products/SearchBar';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductCard from '../components/products/ProductCard';
import ProductDetail from '../components/products/ProductDetail';
import Cart from '../components/cart/Cart';
import { useCart } from '../context/CartContext';
import './Pages.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isCartOpen } = useCart();

  const categories = ["Hot Sauces", "Spice Blends", "Whole Spices"];

  const mockProducts = [
    {
      id: 1,
      name: "Ghost Pepper Sauce",
      description: "Extremely hot sauce made from ghost peppers",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      category: "Hot Sauces",
      origin: "India",
      flavorProfile: "Extremely Hot",
      heatLevel: 5,
      averageRating: 4.5
    },
    {
      id: 2,
      name: "Habanero Hot Sauce",
      description: "Spicy sauce with a fruity habanero flavor",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      category: "Hot Sauces",
      origin: "Mexico",
      flavorProfile: "Hot",
      heatLevel: 4,
      averageRating: 4.2
    },
    {
      id: 3,
      name: "Mediterranean Blend",
      description: "Aromatic blend of Mediterranean herbs and spices",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      category: "Spice Blends",
      origin: "Greece",
      flavorProfile: "Herbal",
      heatLevel: 1,
      averageRating: 4.8
    },
    {
      id: 4,
      name: "Black Peppercorns",
      description: "Whole black peppercorns for grinding",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      category: "Whole Spices",
      origin: "India",
      flavorProfile: "Peppery",
      heatLevel: 2,
      averageRating: 4.6
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-page">
      <Hero />
      <div className="container">
        <div className="search-filter-section">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      </div>
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

export default HomePage; 