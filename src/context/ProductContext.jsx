import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

const categories = [
  { id: 'indian', name: 'Indian Spices' },
  { id: 'middle-eastern', name: 'Middle Eastern' },
  { id: 'asian', name: 'Asian Spices' },
  { id: 'african', name: 'African Spices' },
  { id: 'latin', name: 'Latin American' },
  { id: 'blends', name: 'Spice Blends' },
  { id: 'organic', name: 'Organic' },
  { id: 'rare', name: 'Rare & Exotic' }
];

const initialProducts = [
  {
    id: 1,
    name: 'Saffron Threads',
    description: 'Premium grade Persian saffron threads with intense color and aroma.',
    price: 15.99,
    category: 'rare',
    origin: 'Iran',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2940&auto=format&fit=crop',
    stock: 50,
    rating: 4.8,
    reviews: 124,
    featured: true
  },
  {
    id: 2,
    name: 'Kashmiri Red Chili',
    description: 'Vibrant, mild chili powder perfect for color and flavor.',
    price: 8.99,
    category: 'indian',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1637099075323-b9ea58924167?q=80&w=2787&auto=format&fit=crop',
    stock: 200,
    rating: 4.6,
    reviews: 89,
    featured: true
  },
  {
    id: 3,
    name: 'Tellicherry Black Pepper',
    description: 'Premium black peppercorns with complex flavor profile.',
    price: 9.99,
    category: 'indian',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1599087052528-ea14a5851067?q=80&w=2940&auto=format&fit=crop',
    stock: 150,
    rating: 4.7,
    reviews: 156,
    featured: true
  },
  {
    id: 4,
    name: 'Ras El Hanout',
    description: 'Traditional Moroccan spice blend with over 20 ingredients.',
    price: 12.99,
    category: 'middle-eastern',
    origin: 'Morocco',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2940&auto=format&fit=crop',
    stock: 100,
    rating: 4.9,
    reviews: 78,
    featured: true
  },
  {
    id: 5,
    name: 'Organic Turmeric',
    description: 'High-curcumin organic turmeric powder.',
    price: 7.99,
    category: 'organic',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=2940&auto=format&fit=crop',
    stock: 250,
    rating: 4.8,
    reviews: 203,
    featured: true
  },
  {
    id: 6,
    name: 'Szechuan Peppercorns',
    description: 'Authentic Chinese peppercorns with unique numbing effect.',
    price: 11.99,
    category: 'asian',
    origin: 'China',
    image: 'https://images.unsplash.com/photo-1599087052528-ea14a5851067?q=80&w=2940&auto=format&fit=crop',
    stock: 120,
    rating: 4.7,
    reviews: 92,
    featured: false
  },
  {
    id: 7,
    name: 'Ethiopian Berbere',
    description: 'Traditional Ethiopian spice blend for stews and meats.',
    price: 10.99,
    category: 'african',
    origin: 'Ethiopia',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2940&auto=format&fit=crop',
    stock: 80,
    rating: 4.6,
    reviews: 67,
    featured: false
  },
  {
    id: 8,
    name: 'Smoked Paprika',
    description: 'Spanish smoked paprika with intense flavor.',
    price: 8.99,
    category: 'latin',
    origin: 'Spain',
    image: 'https://images.unsplash.com/photo-1637099075323-b9ea58924167?q=80&w=2787&auto=format&fit=crop',
    stock: 180,
    rating: 4.8,
    reviews: 145,
    featured: true
  },
  {
    id: 9,
    name: 'Garam Masala',
    description: 'House-made blend of premium Indian spices.',
    price: 9.99,
    category: 'blends',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2940&auto=format&fit=crop',
    stock: 150,
    rating: 4.9,
    reviews: 178,
    featured: true
  },
  {
    id: 10,
    name: 'Organic Cardamom Pods',
    description: 'Green cardamom pods with intense aroma.',
    price: 13.99,
    category: 'organic',
    origin: 'Guatemala',
    image: 'https://images.unsplash.com/photo-1599087052528-ea14a5851067?q=80&w=2940&auto=format&fit=crop',
    stock: 90,
    rating: 4.7,
    reviews: 89,
    featured: false
  },
  // Add more spices here...
];

function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    origin: '',
    sort: 'featured'
  });

  const applyFilters = () => {
    let filteredProducts = [...products];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
    }

    // Apply price range filter
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

    // Apply origin filter
    if (filters.origin) {
      filteredProducts = filteredProducts.filter(product =>
        product.origin.toLowerCase() === filters.origin.toLowerCase()
      );
    }

    // Apply sorting
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
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return filteredProducts;
  };

  const getProductsByCategory = (category) => {
    if (!category) return [];
    return products.filter(product => product.category === category);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: prev.length + 1 }]);
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
}

function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export { ProductProvider, useProducts }; 