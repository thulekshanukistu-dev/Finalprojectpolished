import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaLeaf 
} from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    userType: 'customer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Registration Form */}
        <div className="register-form-container">
          <div className="register-header">
            <div className="logo">
              <FaLeaf className="logo-icon" />
              <span className="logo-text">FreshFarm</span>
            </div>
            <h1>Create Account</h1>
            <p className="subtitle">Join FreshFarm today</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                {success}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <FaUser className="input-icon" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope className="input-icon" />
                  Email Address *
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  <FaPhone className="input-icon" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+94 75 727 2324"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="userType" className="form-label">
                  I want to *
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-input"
                >
                  <option value="customer">Shop as Customer</option>
                  <option value="farmer">Sell as Farmer</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                <FaMapMarkerAlt className="input-icon" />
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <FaLock className="input-icon" />
                  Password *
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="At least 6 characters"
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

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <FaLock className="input-icon" />
                  Confirm Password *
                </label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="terms">
              <input
                type="checkbox"
                id="terms"
                required
                disabled={loading}
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <Link to="/terms" className="terms-link">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/privacy" className="terms-link">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="loading">
                  <span className="spinner"></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="register-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side - Benefits */}
        <div className="register-benefits">
          <div className="benefits-content">
            <h2>Why Join FreshFarm?</h2>
            
            <div className="benefits-list">
              <div className="benefit">
                <div className="benefit-icon">🚀</div>
                <div className="benefit-text">
                  <h3>Fast & Secure</h3>
                  <p>Quick registration and secure authentication</p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">🌾</div>
                <div className="benefit-text">
                  <h3>Direct from Farmers</h3>
                  <p>Connect directly with local farmers</p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">💰</div>
                <div className="benefit-text">
                  <h3>Best Prices</h3>
                  <p>Save up to 40% compared to supermarkets</p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">📦</div>
                <div className="benefit-text">
                  <h3>Fast Delivery</h3>
                  <p>Fresh produce delivered within 24 hours</p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">🌟</div>
                <div className="benefit-text">
                  <h3>Quality Guarantee</h3>
                  <p>100% satisfaction or your money back</p>
                </div>
              </div>
            </div>

            <div className="user-types">
              <h3>Choose Your Account Type</h3>
              <div className="type-cards">
                <div className="type-card customer">
                  <h4>👨‍💼 Customer</h4>
                  <ul>
                    <li>Browse fresh products</li>
                    <li>Order with one click</li>
                    <li>Track deliveries</li>
                    <li>Leave reviews</li>
                  </ul>
                </div>
                <div className="type-card farmer">
                  <h4>👨‍🌾 Farmer</h4>
                  <ul>
                    <li>List your products</li>
                    <li>Set your prices</li>
                    <li>Manage orders</li>
                    <li>Grow your business</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;