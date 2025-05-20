import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import QuickView from './QuickView/QuickView';
import ErrorBoundary from './ErrorBoundary';

const Section = styled.section`
  padding: 2rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const QuickViewButton = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardHeader}:hover & {
    opacity: 1;
  }

  &:hover {
    background: white;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: var(--dark);
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1.1rem;
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  background: var(--primary);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--light-gray);
    cursor: not-allowed;
  }
`;

const StockBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  background: ${props => props.inStock ? 'var(--success-light)' : 'var(--error-light)'};
  color: ${props => props.inStock ? 'var(--success)' : 'var(--error)'};
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--gray);
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.isInWishlist ? 'var(--primary)' : 'none'};
    stroke: ${props => props.isInWishlist ? 'var(--primary)' : 'var(--dark)'};
    stroke-width: 2;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: var(--gray);
  font-weight: 500;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--dark);
  background: white;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--dark);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SortSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultsCount = styled.span`
  color: var(--gray);
  font-size: 0.9rem;
`;

const SortSelect = styled(FilterSelect)`
  width: 200px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid var(--light-gray);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

function FeaturedSpicesContent() {
  const { addToCart } = useCart();
  const { user, addToWishlist, removeFromWishlist, wishlist } = useAuth();
  const { products, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Filter and sort state
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    origin: '',
    searchQuery: ''
  });
  const [sortBy, setSortBy] = useState('featured');

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products
      .filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.origin && product.origin !== filters.origin) return false;
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
          );
        }
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(Number);
          return product.price >= min && product.price <= max;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [products, filters, sortBy]);

  // Get unique categories and origins for filters
  const categories = useMemo(() => 
    [...new Set(products?.map(p => p.category) || [])],
    [products]
  );
  
  const origins = useMemo(() => 
    [...new Set(products?.map(p => p.origin) || [])],
    [products]
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add items to your wishlist');
      return;
    }

    const isInWishlist = wishlist?.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (product, e) => {
    e?.stopPropagation();
    setSelectedProduct(product);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!products || products.length === 0) {
    return <NoResults>No spices found matching your criteria.</NoResults>;
  }

  return (
    <Section>
      <FilterSection>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Category</FilterLabel>
            <FilterSelect
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Price Range</FilterLabel>
            <FilterSelect
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">All Prices</option>
              <option value="0-10">Under $10</option>
              <option value="10-25">$10 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-999">Over $100</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Origin</FilterLabel>
            <FilterSelect
              name="origin"
              value={filters.origin}
              onChange={handleFilterChange}
            >
              <option value="">All Origins</option>
              {origins.map(origin => (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Search</FilterLabel>
            <FilterInput
              type="text"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
              placeholder="Search spices..."
            />
          </FilterGroup>
        </FilterGrid>
      </FilterSection>

      <SortSection>
        <ResultsCount>
          {filteredProducts.length} products found
        </ResultsCount>
        <SortSelect value={sortBy} onChange={handleSortChange}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </SortSelect>
      </SortSection>

      <Grid>
        {filteredProducts.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <Image src={product.image} alt={product.name} />
              <StockBadge inStock={product.stock > 0}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </StockBadge>
              <WishlistButton
                isInWishlist={wishlist?.some(item => item.id === product.id)}
                onClick={(e) => handleWishlistToggle(e, product)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </WishlistButton>
              <QuickViewButton onClick={(e) => handleQuickView(product, e)}>
                Quick View
              </QuickViewButton>
            </CardHeader>
            <CardBody>
              <Title>{product.name}</Title>
              <Price>${product.price.toFixed(2)}</Price>
              <Description>{product.description}</Description>
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={!product.stock}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </Section>
  );
}

function FeaturedSpices() {
  return (
    <ErrorBoundary>
      <FeaturedSpicesContent />
    </ErrorBoundary>
  );
}

export default FeaturedSpices; 