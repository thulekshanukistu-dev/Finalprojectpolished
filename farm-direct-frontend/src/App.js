import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbarj';
import Hero from './components/Hero';
import About from './components/About';
import Marketplace from './components/Marketplace';
import ProductModal from './components/ProductModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Checkout from './components/Checkout';
import './styles/App.css';
import './styles/Auth.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
      } else {
        setError('Failed to load products. Using demo data.');
        loadSampleProducts();
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Network error. Using demo products.');
      loadSampleProducts();
    } finally {
      setLoading(false);
    }
  };

  const loadSampleProducts = () => {
    const sampleProducts = [
      {
        _id: '1',
        name: 'Organic Tomatoes',
        category: 'vegetables',
        price: 80,
        unit: 'kg',
        farmer: 'Kumar Farm',
        rating: 4.5,
        stock: 25,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Fresh organic tomatoes grown without any pesticides or chemicals. Harvested daily from our sustainable farms. Perfect for salads, sauces, and fresh consumption.'
      },
      {
        _id: '2',
        name: 'Fresh Milk',
        category: 'dairy',
        price: 60,
        unit: 'liter',
        farmer: 'Dairy Valley',
        rating: 4.8,
        stock: 30,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Pure, unprocessed milk from grass-fed cows. No additives or preservatives. Delivered chilled within hours of milking.'
      },
      {
        _id: '3',
        name: 'Brown Eggs',
        category: 'poultry',
        price: 120,
        unit: 'dozen',
        farmer: 'Happy Hens Farm',
        rating: 4.7,
        stock: 40,
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Free-range brown eggs from happy, healthy chickens. Raised in natural environments with access to sunlight and fresh air.'
      },
      {
        _id: '4',
        name: 'Organic Rice',
        category: 'grains',
        price: 90,
        unit: 'kg',
        farmer: 'Green Fields',
        rating: 4.6,
        stock: 100,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Premium quality organic rice grown in fertile fields without chemical fertilizers.'
      }
    ];
    setProducts(sampleProducts);
  };

  const handleLogin = async (email, password) => {
    console.log('Login attempt with:', email, password);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log('Login response:', data);
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      const demoUser = {
        email: email,
        name: email.split('@')[0],
        userType: email.includes('farmer') ? 'farmer' : 'customer',
        _id: 'user_' + Date.now()
      };
      
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-token-fallback');
      setUser(demoUser);
      
      return { success: true };
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        const demoUser = { 
          _id: Date.now().toString(),
          ...userData,
          userType: userData.userType || 'customer',
          role: userData.userType || 'customer'
        };
        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('token', 'demo-token-' + Date.now());
        setUser(demoUser);
        return { success: true };
      }
    } catch (error) {
      console.error('Register error:', error);
      const demoUser = { 
        _id: Date.now().toString(),
        ...userData,
        userType: userData.userType || 'customer',
        role: userData.userType || 'customer'
      };
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-token-' + Date.now());
      setUser(demoUser);
      return { success: true };
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setCartItems([]);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item._id === product._id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    setIsModalOpen(false);
    alert(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  const handleUpdateCartQuantity = (productId, quantity) => {
    if (quantity < 1) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleContactSubmit = async (formData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Thank you for your message! We will get back to you within 24 hours.');
      return { success: true };
    } catch (error) {
      alert('Failed to send message. Please try again.');
      return { success: false };
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" /> : 
            <Login onLogin={handleLogin} />
          } />
          
          <Route path="/register" element={
            user ? <Navigate to="/" /> : 
            <Register onRegister={handleRegister} />
          } />
          
          <Route path="/forgot-password" element={
            <ForgotPassword />
          } />
          
          <Route path="/dashboard" element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          } />
          
          <Route path="/checkout" element={
            user ? 
            <Checkout 
              cartItems={cartItems} 
              onOrderSuccess={handleOrderSuccess} 
            /> : 
            <Navigate to="/login" />
          } />
          
          <Route path="/" element={
            <>
              <Navbar 
                user={user} 
                onLogout={handleLogout} 
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateCartQuantity={handleUpdateCartQuantity}
              />
              <main>
                <section id="home">
                  <Hero />
                </section>
                
                <section id="about">
                  <About />
                </section>
                
                <section id="marketplace">
                  {loading ? (
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                      <p>Loading fresh products...</p>
                    </div>
                  ) : error ? (
                    <div className="error-message">
                      <p>{error}</p>
                      <button onClick={fetchProducts} className="retry-btn">Retry</button>
                    </div>
                  ) : (
                    <Marketplace 
                      products={products} 
                      onProductClick={handleProductClick} 
                    />
                  )}
                </section>
                
                <section id="contact">
                  <Contact onSubmit={handleContactSubmit} />
                </section>
              </main>
              <Footer />
            </>
          } />
        </Routes>
        
        <ProductModal 
          isOpen={isModalOpen}
          product={selectedProduct}
          onClose={handleModalClose}
          onAddToCart={handleAddToCart}
        />
      </div>
    </Router>
  );
}

export default App;