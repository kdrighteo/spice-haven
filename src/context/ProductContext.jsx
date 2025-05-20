import React, { createContext, useContext, useState, useEffect } from 'react';

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
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    stock: 50,
    rating: 4.8,
    reviews: 24,
    featured: true
  },
  {
    id: 2,
    name: 'Black Cardamom',
    description: 'Whole black cardamom pods with intense smoky flavor.',
    price: 8.99,
    category: 'Indian Spices',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    stock: 100,
    rating: 4.5,
    reviews: 18,
    featured: true
  },
  {
    id: 3,
    name: 'Organic Turmeric',
    description: 'Pure organic turmeric powder with vibrant color.',
    price: 6.99,
    category: 'Organic',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    stock: 200,
    rating: 4.7,
    reviews: 45,
    featured: true
  },
  {
    id: 4,
    name: 'Za\'atar Blend',
    description: 'Traditional Middle Eastern herb and spice blend.',
    price: 7.99,
    category: 'Middle Eastern',
    origin: 'Lebanon',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    stock: 75,
    rating: 4.6,
    reviews: 32,
    featured: true
  },
  {
    id: 5,
    name: 'Garam Masala',
    description: 'Classic Indian spice blend for authentic flavor.',
    price: 5.99,
    category: 'Blends',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    stock: 150,
    rating: 4.9,
    reviews: 67,
    featured: true
  },
  {
    id: 6,
    name: 'Sumac',
    description: 'Tangy Middle Eastern spice with citrus notes.',
    price: 6.49,
    category: 'Middle Eastern',
    origin: 'Turkey',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    stock: 80,
    rating: 4.4,
    reviews: 29,
    featured: false
  },
  {
    id: 7,
    name: 'Organic Cinnamon',
    description: 'Premium organic Ceylon cinnamon sticks.',
    price: 9.99,
    category: 'Organic',
    origin: 'Sri Lanka',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    stock: 120,
    rating: 4.7,
    reviews: 38,
    featured: true
  },
  {
    id: 8,
    name: 'Vanilla Beans',
    description: 'Madagascar vanilla beans, grade A quality.',
    price: 24.99,
    category: 'Rare',
    origin: 'Madagascar',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    stock: 30,
    rating: 4.9,
    reviews: 42,
    featured: true
  }
];

// Main Provider Component
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'featured'
  });

  // Simulate loading products from an API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(initialProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
    loading,
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