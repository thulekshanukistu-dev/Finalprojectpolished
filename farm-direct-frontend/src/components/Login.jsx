import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaLeaf, FaGoogle, FaFacebookF } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on change
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('Login form submitted:', formData);
  
  // Basic validation
  if (!formData.email || !formData.password) {
    setError('Please fill in all fields');
    return;
  }

  setLoading(true);
  setError('');

  try {
    // Direct API call to your working backend
    const response = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email.trim(),
        password: formData.password
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (data.success) {
      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Show success message
      alert('Login successful!');
      
      // Navigate to home
      navigate('/');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login catch error:', error);
    setError('Login failed. Please try again.');
    
    // Even if API fails, create demo user for testing
    const demoUser = {
      email: formData.email,
      name: formData.email.split('@')[0],
      role: formData.email.includes('farmer') ? 'farmer' : 'customer'
    };
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('token', 'demo-token-error');
    navigate('/');
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = () => {
    // Implement Google OAuth
    alert('Google login will be implemented');
  };

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth
    alert('Facebook login will be implemented');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Login Form */}
        <div className="login-form-container">
          <div className="login-header">
            <div className="logo">
              <FaLeaf className="logo-icon" />
              <span className="logo-text">FreshFarm</span>
            </div>
            <h1>Welcome Back</h1>
            <p className="subtitle">Sign in to your account to continue</p>
          </div>

          {/* Social Login Buttons */}
          <div className="social-login">
            <button 
              className="social-btn google-btn"
              onClick={handleGoogleLogin}
            >
              <FaGoogle />
              <span>Continue with Google</span>
            </button>
            <button 
              className="social-btn facebook-btn"
              onClick={handleFacebookLogin}
            >
              <FaFacebookF />
              <span>Continue with Facebook</span>
            </button>
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FaUser className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FaLock className="input-icon" />
                Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="loading">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="signup-link">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side - Hero Image & Info */}
        <div className="login-hero">
          <div className="hero-content">
            <h2>Fresh Produce Direct from Farmers</h2>
            <p>
              Join thousands of customers and farmers connecting directly through our platform.
              Enjoy fresh, organic produce at fair prices.
            </p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🌱</span>
                <span className="feature-text">100% Organic Products</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span className="feature-text">Fast Delivery</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💰</span>
                <span className="feature-text">Best Prices Guaranteed</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🤝</span>
                <span className="feature-text">Direct Farmer Support</span>
              </div>
            </div>
          </div>
          <div className="hero-image"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;