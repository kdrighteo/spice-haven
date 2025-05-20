import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const AuthPage = ({ type }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (type === 'register' && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page after successful authentication
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {type === 'register' && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {type === 'register' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              type === 'login' ? 'Login' : 'Register'
            )}
          </button>
        </form>

        <div className="auth-footer">
          {type === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button 
                className="link-button"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                className="link-button"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 