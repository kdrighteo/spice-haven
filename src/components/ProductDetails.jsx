import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewsContext';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;
`;

const Panel = styled.div`
  background: white;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 8px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  padding: 2rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  padding: 2rem;
  border-left: 1px solid #eee;

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid #eee;
  }
`;

const ProductName = styled.h2`
  color: var(--dark);
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: var(--gray);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const Specs = styled.div`
  margin-bottom: 2rem;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

const ReviewsSection = styled.div`
  margin-top: 2rem;
`;

const ReviewsList = styled.div`
  margin-top: 1rem;
`;

const Review = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ReviewAuthor = styled.span`
  font-weight: 500;
`;

const Rating = styled.div`
  color: #ffc107;
`;

const ReviewText = styled.p`
  color: var(--gray);
`;

const AddReviewForm = styled.form`
  margin-top: 1rem;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const RatingInput = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.active ? '#ffc107' : '#ddd'};
  transition: color 0.2s;

  &:hover {
    color: #ffc107;
  }
`;

const Button = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #ff5252;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--dark);
`;

function ProductDetails({ product, isOpen, onClose }) {
  const { user } = useAuth();
  const { addReview, getReviews, getAverageRating } = useReviews();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const reviews = product ? getReviews(product.id) : [];
  const averageRating = product ? getAverageRating(product.id) : 0;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) {
      alert('Please provide both rating and review text');
      return;
    }

    const newReview = {
      author: user.name,
      rating,
      text: reviewText,
      date: new Date().toISOString().split('T')[0]
    };

    addReview(product.id, newReview);
    setReviewText('');
    setRating(0);
    setShowReviewForm(false);
  };

  if (!product) return null;

  return (
    <Container isOpen={isOpen}>
      <Panel>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ImageSection>
          <ProductImage src={product.image} alt={product.name} />
        </ImageSection>
        <InfoSection>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <Description>{product.description}</Description>
          <Specs>
            <SpecItem>
              <span>Origin:</span>
              <span>{product.origin}</span>
            </SpecItem>
            <SpecItem>
              <span>Texture:</span>
              <span>{product.texture}</span>
            </SpecItem>
            <SpecItem>
              <span>Average Rating:</span>
              <Rating>{'★'.repeat(Math.round(averageRating))}{'☆'.repeat(5 - Math.round(averageRating))}</Rating>
            </SpecItem>
          </Specs>

          <ReviewsSection>
            <h3>Reviews ({reviews.length})</h3>
            {user && !showReviewForm && (
              <Button onClick={() => setShowReviewForm(true)}>Write a Review</Button>
            )}

            <AddReviewForm isVisible={showReviewForm} onSubmit={handleSubmitReview}>
              <RatingInput>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarButton
                    key={star}
                    type="button"
                    active={star <= rating}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </StarButton>
                ))}
              </RatingInput>
              <TextArea
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button type="submit">Submit Review</Button>
            </AddReviewForm>

            <ReviewsList>
              {reviews.map(review => (
                <Review key={review.id}>
                  <ReviewHeader>
                    <ReviewAuthor>{review.author}</ReviewAuthor>
                    <Rating>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Rating>
                  </ReviewHeader>
                  <ReviewText>{review.text}</ReviewText>
                  <small>{review.date}</small>
                </Review>
              ))}
            </ReviewsList>
          </ReviewsSection>
        </InfoSection>
      </Panel>
    </Container>
  );
}

export default ProductDetails; 