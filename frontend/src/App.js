import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import Footer from './components/layout/Footer';
import SearchBar from './components/common/SearchBar';
import ProductCard from './components/products/ProductCard';
import ProductDetail from './components/products/ProductDetail';
import CategoryFilter from './components/products/CategoryFilter';
import Cart from './components/cart/Cart';
import Categories from './components/pages/Categories';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import './App.css';

// Temporary mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: 'Premium Black Pepper',
    description: 'Freshly ground black pepper from India with intense aroma and flavor.',
    price: 12.99,
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80'],
    category: 'ground',
    origin: 'India',
    flavorProfile: ['spicy', 'aromatic'],
    heatLevel: 2,
    averageRating: 4.5
  },
  {
    id: 2,
    name: 'Organic Turmeric',
    description: 'Pure organic turmeric powder with vibrant color and health benefits.',
    price: 9.99,
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80'],
    category: 'ground',
    origin: 'India',
    flavorProfile: ['earthy', 'bitter'],
    heatLevel: 0,
    averageRating: 4.8
  },
  {
    id: 3,
    name: 'Whole Cinnamon Sticks',
    description: 'Premium quality cinnamon sticks from Sri Lanka.',
    price: 7.99,
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80'],
    category: 'whole',
    origin: 'Sri Lanka',
    flavorProfile: ['sweet', 'warm'],
    heatLevel: 0,
    averageRating: 4.6
  }
];

const HomePage = ({ isCartOpen, setIsCartOpen }) => {
  const [searchResults, setSearchResults] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Hero />
      <main className="main-content">
        <div className="filters-section">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <section className="featured-products">
            <h2>Featured Products</h2>
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
        )}
      </main>
    </>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar onCartClick={() => setIsCartOpen(true)} />
            <Routes>
              <Route path="/" element={<HomePage isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />} />
              <Route path="/products" element={<HomePage isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 