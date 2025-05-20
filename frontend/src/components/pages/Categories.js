import React from 'react';
import './Categories.css';

const categories = [
  {
    id: 'ground',
    name: 'Ground Spices',
    description: 'Finely ground spices for immediate use in cooking',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'whole',
    name: 'Whole Spices',
    description: 'Whole spices for grinding or cooking whole',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'blends',
    name: 'Spice Blends',
    description: 'Curated blends of complementary spices',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'seeds',
    name: 'Seeds',
    description: 'Various seeds for cooking and seasoning',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'herbs',
    name: 'Herbs',
    description: 'Dried herbs for cooking and seasoning',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80'
  }
];

const Categories = () => {
  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Our Categories</h1>
        <p>Explore our wide range of premium spices and herbs</p>
      </div>
      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <div className="category-content">
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <button className="explore-button">Explore {category.name}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories; 