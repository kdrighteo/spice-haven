import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

const categories = [
  { id: 1, name: 'Indian Spices', description: 'Traditional spices from India' },
  { id: 2, name: 'Middle Eastern', description: 'Authentic Middle Eastern spices' },
  { id: 3, name: 'Organic', description: 'Certified organic spices' },
  { id: 4, name: 'Blends', description: 'Custom spice blends' },
  { id: 5, name: 'Rare', description: 'Hard-to-find specialty spices' }
];

const initialProducts = [
  {
    id: 1,
    name: 'Saffron Threads',
    description: 'Premium quality Spanish saffron threads with intense color and aroma.',
    price: 15.99,
    category: 'Rare',
    origin: 'Spain',
    image: '/images/saffron.jpg',
    stock: 50,
    rating: 4.8,
    reviews: 24,
    featured: true
  },
  // Add more products here
];

// Main Provider Component
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'featured'
  });

  const applyFilters = () => {
    let filteredProducts = [...products];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
    }

    // Price range filter
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(product =>
        product.price <= Number(filters.maxPrice)
      );
    }

    // Sorting
    switch (filters.sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filteredProducts;
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getProductsByCategory = (category) => {
    if (!category) return [];
    return products.filter(product => product.category === category);
  };

  // Admin functions
  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const updateProduct = (id, updates) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateStock = (id, quantity) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product
      )
    );
  };

  const value = {
    products: applyFilters(),
    categories,
    filters,
    updateFilters,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook
const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export default ProductProvider;
export { useProducts }; 