import React, { createContext, useContext, useState } from 'react';

const ReviewsContext = createContext();

const initialReviews = {
  1: [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      text: 'Excellent quality spice! The aroma is incredible.',
      date: '2024-01-25'
    },
    {
      id: 2,
      author: 'Jane Smith',
      rating: 4,
      text: 'Great product, but a bit pricey.',
      date: '2024-01-24'
    }
  ],
  2: [
    {
      id: 1,
      author: 'Mike Johnson',
      rating: 5,
      text: 'The best cinnamon I have ever tried!',
      date: '2024-01-25'
    }
  ],
  3: [
    {
      id: 1,
      author: 'Sarah Wilson',
      rating: 4,
      text: 'Perfect balance of color and heat.',
      date: '2024-01-24'
    }
  ]
};

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(initialReviews);

  const addReview = (productId, review) => {
    setReviews(prev => ({
      ...prev,
      [productId]: [
        {
          ...review,
          id: prev[productId] ? Math.max(...prev[productId].map(r => r.id)) + 1 : 1
        },
        ...(prev[productId] || [])
      ]
    }));
  };

  const getReviews = (productId) => {
    return reviews[productId] || [];
  };

  const getAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    return productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length;
  };

  return (
    <ReviewsContext.Provider
      value={{
        addReview,
        getReviews,
        getAverageRating
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
} 