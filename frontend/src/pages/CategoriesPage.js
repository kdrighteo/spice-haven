import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import './Pages.css';

const CategoriesPage = () => {
  // Mock categories data
  const categories = [
    {
      id: 1,
      name: 'Hot Sauces',
      description: 'Discover our collection of artisanal hot sauces, from mild to extremely hot. Each sauce is crafted with premium ingredients and unique flavor profiles.',
      image: '/images/categories/hot-sauces.jpg',
      featuredProducts: [
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
        }
      ]
    },
    {
      id: 2,
      name: 'Spice Blends',
      description: 'Explore our carefully crafted spice blends, perfect for elevating your cooking. Each blend is a unique combination of premium spices and herbs.',
      image: '/images/categories/spice-blends.jpg',
      featuredProducts: [
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
        }
      ]
    },
    {
      id: 3,
      name: 'Whole Spices',
      description: 'Premium whole spices sourced from around the world. Perfect for grinding fresh or using whole in your recipes.',
      image: '/images/categories/whole-spices.jpg',
      featuredProducts: [
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
      ]
    }
  ];

  return (
    <div className="page-container">
      <h1>Our Categories</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-header">
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
            <div className="featured-products">
              <h3>Featured Products</h3>
              <div className="products-grid">
                {category.featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Link to={`/products?category=${category.name}`} className="view-all-button">
                View All {category.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage; 