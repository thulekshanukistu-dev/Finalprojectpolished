
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaCreditCard, FaTruck } from 'react-icons/fa';

const Checkout = ({ cartItems, onOrderSuccess }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    instructions: '',
    paymentMethod: 'cash_on_delivery'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate cart totals
  const calculateTotals = () => {
    const itemsPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = itemsPrice * 0.05;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    
    return {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice: taxPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2)
    };
  };

  const totals = calculateTotals();

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/marketplace');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      setError('Please fill all required fields');
      return;
    }

    if (formData.phone.length < 9) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
          image: item.image
        })),
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          instructions: formData.instructions
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.instructions
      };

      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Order placed successfully!');
        if (onOrderSuccess) {
          onOrderSuccess();
        }
        navigate('/dashboard');
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p className="checkout-steps">
            <span className="step active">1. Cart</span> → 
            <span className="step active">2. Information</span> → 
            <span className="step active">3. Payment</span>
          </p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="checkout-grid">
          {/* Left Column - Order Summary */}
          <div className="checkout-summary">
            <div className="summary-card">
              <h3>
                <FaShoppingCart /> Order Summary
              </h3>
              
              <div className="order-items">
                {cartItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>By {item.farmer}</p>
                      <div className="item-quantity">
                        {item.quantity} {item.unit} × ₹{item.price}
                      </div>
                    </div>
                    <div className="item-total">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Items Price:</span>
                  <span>₹{totals.itemsPrice}</span>
                </div>
                <div className="price-row">
                  <span>Shipping:</span>
                  <span>{parseFloat(totals.shippingPrice) === 0 ? 'FREE' : `₹${totals.shippingPrice}`}</span>
                </div>
                <div className="price-row">
                  <span>Tax (5%):</span>
                  <span>₹{totals.taxPrice}</span>
                </div>
                <div className="price-row total">
                  <span>Total Amount:</span>
                  <span className="total-price">₹{totals.totalPrice}</span>
                </div>
              </div>

              <div className="shipping-note">
                <FaTruck /> Free shipping on orders above ₹500
              </div>
            </div>
          </div>

          {/* Right Column - Checkout Form */}
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="form-section">
                <h3>
                  <FaUser /> Shipping Information
                </h3>
                
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94 75 727 2324"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Batticaloa"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Eastern Province"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="30000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instructions">Delivery Instructions</label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Any special instructions for delivery?"
                    rows="2"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-section">
                <h3>
                  <FaCreditCard /> Payment Method
                </h3>
                
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={formData.paymentMethod === 'cash_on_delivery'}
                      onChange={handleChange}
                    />
                    <div className="payment-content">
                      <span className="payment-icon">💰</span>
                      <div>
                        <h4>Cash on Delivery</h4>
                        <p>Pay when you receive your order</p>
                      </div>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online_banking"
                      checked={formData.paymentMethod === 'online_banking'}
                      onChange={handleChange}
                    />
                    <div className="payment-content">
                      <span className="payment-icon">🏦</span>
                      <div>
                        <h4>Online Banking</h4>
                        <p>Pay via bank transfer</p>
                      </div>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <div className="payment-content">
                      <span className="payment-icon">💳</span>
                      <div>
                        <h4>Credit/Debit Card</h4>
                        <p>Pay securely with your card</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Review */}
              <div className="order-review">
                <h3>Order Review</h3>
                <p>Please review your order before placing it.</p>
                
                <div className="review-summary">
                  <div className="review-item">
                    <span>Items ({cartItems.length}):</span>
                    <span>₹{totals.itemsPrice}</span>
                  </div>
                  <div className="review-item">
                    <span>Shipping:</span>
                    <span>{parseFloat(totals.shippingPrice) === 0 ? 'FREE' : `₹${totals.shippingPrice}`}</span>
                  </div>
                  <div className="review-item total">
                    <span>Total:</span>
                    <span>₹{totals.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="place-order-btn"
                disabled={loading || cartItems.length === 0}
              >
                {loading ? 'Processing...' : `Place Order - ₹${totals.totalPrice}`}
              </button>

              <p className="terms-note">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          padding: 100px 0 60px;
          min-height: 100vh;
          background: #f8f9fa;
        }

        .checkout-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .checkout-header h1 {
          font-size: 2.5rem;
          color: #2e7d32;
          margin-bottom: 10px;
        }

        .checkout-steps {
          color: #666;
          font-size: 1.1rem;
        }

        .step {
          padding: 5px 15px;
          margin: 0 10px;
        }

        .step.active {
          background: #e8f5e9;
          color: #2e7d32;
          border-radius: 20px;
          font-weight: 600;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 40px;
        }

        @media (max-width: 992px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
        }

        .summary-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 120px;
        }

        .summary-card h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #333;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .order-items {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 25px;
        }

        .order-item {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          gap: 15px;
          padding: 15px 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .order-item:last-child {
          border-bottom: none;
        }

        .item-image img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
        }

        .item-details h4 {
          font-size: 1rem;
          margin-bottom: 5px;
          color: #333;
        }

        .item-details p {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 5px;
        }

        .item-quantity {
          font-size: 0.9rem;
          color: #666;
        }

        .item-total {
          font-weight: 600;
          color: #2e7d32;
          font-size: 1.1rem;
        }

        .price-breakdown {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          color: #666;
        }

        .price-row.total {
          border-top: 2px solid #e0e0e0;
          margin-top: 10px;
          padding-top: 15px;
          font-weight: 600;
          color: #333;
        }

        .total-price {
          color: #2e7d32;
          font-size: 1.3rem;
        }

        .shipping-note {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
        }

        .checkout-form {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .form-section {
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 2px solid #f8f9fa;
        }

        .form-section h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #333;
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #2e7d32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .payment-option:hover {
          border-color: #2e7d32;
          background: #f8f9fa;
        }

        .payment-option input[type="radio"] {
          width: 20px;
          height: 20px;
          accent-color: #2e7d32;
        }

        .payment-content {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
        }

        .payment-icon {
          font-size: 2rem;
        }

        .payment-content h4 {
          margin: 0 0 5px 0;
          color: #333;
        }

        .payment-content p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        .order-review {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          margin: 30px 0;
        }

        .order-review h3 {
          color: #333;
          margin-bottom: 10px;
        }

        .order-review p {
          color: #666;
          margin-bottom: 20px;
        }

        .review-summary {
          background: white;
          padding: 20px;
          border-radius: 10px;
        }

        .review-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          color: #666;
        }

        .review-item.total {
          border-top: 2px solid #e0e0e0;
          margin-top: 10px;
          padding-top: 15px;
          font-weight: 600;
          color: #333;
        }

        .place-order-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .place-order-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(46, 125, 50, 0.4);
        }

        .place-order-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .terms-note {
          text-align: center;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 15px 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #ffcdd2;
        }

        .error-icon {
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
