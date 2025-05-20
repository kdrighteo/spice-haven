import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { ReviewsProvider } from './context/ReviewsContext';
import ProductProvider from './context/ProductContext';
import { UserProfileProvider } from './context/UserProfileContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedSpices from './components/FeaturedSpices';
import SearchAndFilter from './components/SearchAndFilter';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './components/Admin/Dashboard';
import UserProfile from './components/UserProfile/UserProfile';
import OrderHistory from './components/UserProfile/OrderHistory';
import AddressBook from './components/UserProfile/AddressBook';
import Wishlist from './components/Wishlist';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  background: var(--light);
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Home = () => (
  <>
    <Hero />
    <ContentSection>
      <SearchAndFilter />
      <FeaturedSpices />
    </ContentSection>
  </>
);

function App() {
  return (
    <Router basename="/spice-haven-1">
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <ReviewsProvider>
              <AdminProvider>
                <UserProfileProvider>
                  <GlobalStyle />
                  <AppContainer>
                    <Navbar />
                    <Main>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        
                        {/* Admin Routes */}
                        <Route path="/admin/*" element={<Dashboard />} />
                        
                        {/* User Profile Routes */}
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/profile/orders" element={<OrderHistory />} />
                        <Route path="/profile/addresses" element={<AddressBook />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                      </Routes>
                    </Main>
                  </AppContainer>
                </UserProfileProvider>
              </AdminProvider>
            </ReviewsProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 