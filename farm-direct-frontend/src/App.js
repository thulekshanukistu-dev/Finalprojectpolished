// import React, { useState } from 'react';
// import Navbar from './components/Navbarj.jsx';
// import Hero from './components/Hero';
// import About from './components/About';
// import Marketplace from './components/Marketplace';
// import ProductModal from './components/ProductModal';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
// import './styles/App.css';

// const App = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Sample products data
//   const products = [
//     {
//       id: 1,
//       name: 'Organic Tomatoes',
//       category: 'vegetables',
//       price: 80,
//       unit: 'kg',
//       farmer: 'Kumar Farm',
//       rating: 4.5,
//       stock: 25,
//       image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Fresh organic tomatoes grown without any pesticides or chemicals. Harvested daily from our sustainable farms. Perfect for salads, sauces, and fresh consumption. Each tomato is hand-picked at peak ripeness for maximum flavor and nutrition.'
//     },
//     {
//       id: 2,
//       name: 'Fresh Milk',
//       category: 'dairy',
//       price: 60,
//       unit: 'liter',
//       farmer: 'Dairy Valley',
//       rating: 4.8,
//       stock: 30,
//       image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Pure, unprocessed milk from grass-fed cows. No additives or preservatives. Delivered chilled within hours of milking. Rich in calcium and essential nutrients. Perfect for daily consumption, cooking, and making dairy products.'
//     },
//     {
//       id: 3,
//       name: 'Brown Eggs',
//       category: 'poultry',
//       price: 120,
//       unit: 'dozen',
//       farmer: 'Happy Hens Farm',
//       rating: 4.7,
//       stock: 40,
//       image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Free-range brown eggs from happy, healthy chickens. Raised in natural environments with access to sunlight and fresh air. Rich in omega-3 and protein. Each egg is carefully inspected and packed for freshness.'
//     },
//     {
//       id: 4,
//       name: 'Organic Rice',
//       category: 'grains',
//       price: 90,
//       unit: 'kg',
//       farmer: 'Green Fields',
//       rating: 4.6,
//       stock: 100,
//       image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Premium quality organic rice grown in fertile fields without chemical fertilizers. Naturally aromatic with excellent texture. Perfect for daily meals, special occasions, and healthy eating. Rich in fiber and essential nutrients.'
//     },
//     {
//       id: 5,
//       name: 'Fresh Carrots',
//       category: 'vegetables',
//       price: 50,
//       unit: 'kg',
//       farmer: 'Kumar Farm',
//       rating: 4.4,
//       stock: 60,
//       image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Sweet and crunchy carrots grown in mineral-rich soil. Packed with beta-carotene and vitamins. Perfect for salads, juices, cooking, and snacking. Each carrot is washed and sorted for quality assurance.'
//     },
//     {
//       id: 6,
//       name: 'Pure Honey',
//       category: 'others',
//       price: 300,
//       unit: 'kg',
//       farmer: 'Bee Happy Farm',
//       rating: 4.9,
//       stock: 20,
//       image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Pure, raw honey from local wildflowers. No processing or heating involved to preserve natural enzymes and nutrients. Natural sweetener with antimicrobial properties. Great for health benefits and culinary uses.'
//     },
//     {
//       id: 7,
//       name: 'Fresh Apples',
//       category: 'fruits',
//       price: 70,
//       unit: 'kg',
//       farmer: 'Orchard Fresh',
//       rating: 4.5,
//       stock: 45,
//       image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Crisp, juicy apples from our mountain orchards. Grown using sustainable farming practices. Rich in antioxidants and fiber. Perfect for snacking, baking, and making healthy juices.'
//     },
//     {
//       id: 8,
//       name: 'Artisanal Cheese',
//       category: 'dairy',
//       price: 200,
//       unit: 'kg',
//       farmer: 'Dairy Valley',
//       rating: 4.7,
//       stock: 15,
//       image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Handcrafted cheese made from fresh cow milk. Aged to perfection for rich flavor and texture. Perfect for gourmet cooking, sandwiches, and cheese platters. Made using traditional methods.'
//     },
//     {
//       id: 9,
//       name: 'Spinach Leaves',
//       category: 'vegetables',
//       price: 40,
//       unit: 'bunch',
//       farmer: 'Green Thumb Farm',
//       rating: 4.3,
//       stock: 35,
//       image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Fresh organic spinach leaves packed with iron and vitamins. Grown in nutrient-rich soil without pesticides. Perfect for salads, smoothies, and cooked dishes. Delivered crisp and fresh.'
//     },
//     {
//       id: 10,
//       name: 'Bananas',
//       category: 'fruits',
//       price: 55,
//       unit: 'dozen',
//       farmer: 'Tropical Farms',
//       rating: 4.6,
//       stock: 50,
//       image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Sweet, ripe bananas from local plantations. Rich in potassium and natural sugars. Perfect for snacking, baking, and smoothies. Harvested at optimal ripeness for best flavor.'
//     },
//     {
//       id: 11,
//       name: 'Potatoes',
//       category: 'vegetables',
//       price: 45,
//       unit: 'kg',
//       farmer: 'Root Vegetable Co',
//       rating: 4.4,
//       stock: 80,
//       image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Fresh potatoes from organic farms. Versatile and perfect for all cooking methods. Rich in carbohydrates and essential nutrients. Stored properly to maintain freshness.'
//     },
//     {
//       id: 12,
//       name: 'Ghee',
//       category: 'dairy',
//       price: 180,
//       unit: '500g',
//       farmer: 'Pure Dairy',
//       rating: 4.8,
//       stock: 25,
//       image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       description: 'Pure clarified butter made from fresh cream. Traditional preparation method for authentic flavor. Perfect for cooking, baking, and traditional recipes. Rich in healthy fats.'
//     }
//   ];

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleContactSubmit = (formData) => {
//     console.log('Contact form submitted:', formData);
//     // In a real app, you would send this data to your backend API
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="app">
//       <Navbar />
      
//       <main>
//         <section id="home">
//           <Hero />
//         </section>
        
//         <section id="about">
//           <About />
//         </section>
        
//         <section id="marketplace">
//           <Marketplace 
//             products={products} 
//             onProductClick={handleProductClick} 
//           />
//         </section>
        
//         <section id="contact">
//           <Contact onSubmit={handleContactSubmit} />
//         </section>
//       </main>
      
//       <Footer />
      
//       <ProductModal 
//         isOpen={isModalOpen}
//         product={selectedProduct}
//         onClose={handleModalClose}
//       />
      
//       {/* Global Styles for Footer */}
//       <style jsx global>{`
//         /* Footer Styles */
//         .footer {
//           background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
//           color: white;
//           padding: 80px 0 20px;
//           margin-top: auto;
//         }
        
//         .features-banner {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 30px;
//           margin-bottom: 60px;
//           padding: 40px;
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 20px;
//           backdrop-filter: blur(10px);
//         }
        
//         .feature-item {
//           display: flex;
//           align-items: center;
//           gap: 20px;
//           padding: 20px;
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 15px;
//           transition: all 0.3s ease;
//         }
        
//         .feature-item:hover {
//           background: rgba(255, 255, 255, 0.15);
//           transform: translateY(-5px);
//         }
        
//         .feature-icon {
//           font-size: 2rem;
//           color: #2e7d32;
//           background: rgba(46, 125, 50, 0.2);
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .feature-text h4 {
//           font-size: 1.2rem;
//           margin-bottom: 5px;
//           color: white;
//         }
        
//         .feature-text p {
//           color: rgba(255, 255, 255, 0.7);
//           font-size: 0.9rem;
//         }
        
//         .footer-content {
//           display: grid;
//           grid-template-columns: 1fr 2fr 1fr;
//           gap: 60px;
//           margin-bottom: 60px;
//         }
        
//         @media (max-width: 1200px) {
//           .footer-content {
//             grid-template-columns: 1fr;
//             gap: 40px;
//           }
//         }
        
//         .footer-brand {
//           display: flex;
//           flex-direction: column;
//           gap: 25px;
//         }
        
//         .brand-header {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//         }
        
//         .logo-icon {
//           font-size: 3rem;
//           color: #2e7d32;
//         }
        
//         .brand-text h2 {
//           font-size: 2rem;
//           font-weight: 700;
//           margin-bottom: 5px;
//           color: white;
//         }
        
//         .tagline {
//           color: rgba(255, 255, 255, 0.7);
//           font-size: 0.9rem;
//         }
        
//         .brand-description {
//           color: rgba(255, 255, 255, 0.8);
//           line-height: 1.6;
//           font-size: 1rem;
//         }
        
//         .newsletter {
//           background: rgba(255, 255, 255, 0.05);
//           padding: 25px;
//           border-radius: 15px;
//           margin-top: 20px;
//         }
        
//         .newsletter h4 {
//           font-size: 1.2rem;
//           margin-bottom: 10px;
//           color: white;
//         }
        
//         .newsletter > p {
//           color: rgba(255, 255, 255, 0.7);
//           margin-bottom: 20px;
//           font-size: 0.95rem;
//         }
        
//         .newsletter-form {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 15px;
//         }
        
//         .newsletter-input {
//           flex: 1;
//           padding: 12px 15px;
//           background: rgba(255, 255, 255, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           border-radius: 8px;
//           color: white;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//         }
        
//         .newsletter-input:focus {
//           outline: none;
//           border-color: #2e7d32;
//           background: rgba(255, 255, 255, 0.15);
//         }
        
//         .newsletter-input::placeholder {
//           color: rgba(255, 255, 255, 0.5);
//         }
        
//         .btn-newsletter {
//           padding: 12px 25px;
//           background: #2e7d32;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           white-space: nowrap;
//         }
        
//         .btn-newsletter:hover {
//           background: #1b5e20;
//           transform: translateY(-2px);
//         }
        
//         .newsletter-note {
//           font-size: 0.85rem;
//           color: rgba(255, 255, 255, 0.5);
//           text-align: center;
//         }
        
//         .footer-links-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 40px;
//         }
        
//         @media (max-width: 768px) {
//           .footer-links-grid {
//             grid-template-columns: 1fr;
//           }
//         }
        
//         .link-section h4 {
//           font-size: 1.1rem;
//           margin-bottom: 20px;
//           color: white;
//           position: relative;
//           padding-bottom: 10px;
//         }
        
//         .link-section h4::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 40px;
//           height: 2px;
//           background: #2e7d32;
//         }
        
//         .link-section ul {
//           list-style: none;
//           padding: 0;
//         }
        
//         .link-section li {
//           margin-bottom: 12px;
//         }
        
//         .footer-link {
//           color: rgba(255, 255, 255, 0.7);
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//           display: inline-block;
//           padding: 5px 0;
//         }
        
//         .footer-link:hover {
//           color: #2e7d32;
//           transform: translateX(5px);
//         }
        
//         .footer-right {
//           display: flex;
//           flex-direction: column;
//           gap: 40px;
//         }
        
//         .contact-section h4,
//         .certifications-section h4 {
//           font-size: 1.1rem;
//           margin-bottom: 20px;
//           color: white;
//           position: relative;
//           padding-bottom: 10px;
//         }
        
//         .contact-section h4::after,
//         .certifications-section h4::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 40px;
//           height: 2px;
//           background: #2e7d32;
//         }
        
//         .contact-info-list {
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }
        
//         .contact-info-item {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           padding: 15px;
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//           transition: all 0.3s ease;
//         }
        
//         .contact-info-item:hover {
//           background: rgba(255, 255, 255, 0.1);
//           transform: translateX(5px);
//         }
        
//         .contact-icon {
//           font-size: 1.2rem;
//           color: #2e7d32;
//           min-width: 30px;
//         }
        
//         .contact-details {
//           display: flex;
//           flex-direction: column;
//           gap: 5px;
//         }
        
//         .contact-text {
//           font-size: 1rem;
//           font-weight: 500;
//           color: white;
//         }
        
//         .contact-description {
//           font-size: 0.85rem;
//           color: rgba(255, 255, 255, 0.6);
//         }
        
//         .certifications-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 15px;
//         }
        
//         .cert-badge {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 12px;
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//           transition: all 0.3s ease;
//         }
        
//         .cert-badge:hover {
//           background: rgba(255, 255, 255, 0.1);
//           transform: translateY(-3px);
//         }
        
//         .cert-icon {
//           font-size: 1.5rem;
//         }
        
//         .cert-text {
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//         }
        
//         .cert-label {
//           font-size: 0.9rem;
//           font-weight: 500;
//           color: white;
//         }
        
//         .cert-desc {
//           font-size: 0.8rem;
//           color: rgba(255, 255, 255, 0.6);
//         }
        
//         .footer-bottom {
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           padding-top: 40px;
//           display: flex;
//           flex-direction: column;
//           gap: 30px;
//         }
        
//         .social-section,
//         .payment-section,
//         .legal-section,
//         .copyright-section {
//           text-align: center;
//         }
        
//         .social-section h5,
//         .payment-section h5 {
//           font-size: 1rem;
//           margin-bottom: 15px;
//           color: rgba(255, 255, 255, 0.8);
//         }
        
//         .social-links {
//           display: flex;
//           justify-content: center;
//           gap: 20px;
//           flex-wrap: wrap;
//         }
        
//         .social-link {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           padding: 10px 20px;
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 25px;
//           color: white;
//           text-decoration: none;
//           transition: all 0.3s ease;
//         }
        
//         .social-link:hover {
//           background: #2e7d32;
//           transform: translateY(-3px);
//         }
        
//         .social-link svg {
//           font-size: 1.2rem;
//         }
        
//         .social-label {
//           font-size: 0.9rem;
//           font-weight: 500;
//         }
        
//         .payment-methods {
//           display: flex;
//           justify-content: center;
//           gap: 15px;
//           flex-wrap: wrap;
//           margin-bottom: 30px;
//         }
        
//         .payment-icon {
//           font-size: 1.8rem;
//           opacity: 0.8;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }
        
//         .payment-icon:hover {
//           opacity: 1;
//           transform: scale(1.2);
//         }
        
//         .legal-links {
//           display: flex;
//           justify-content: center;
//           gap: 20px;
//           flex-wrap: wrap;
//           margin-bottom: 30px;
//         }
        
//         .legal-links a {
//           color: rgba(255, 255, 255, 0.7);
//           font-size: 0.9rem;
//           transition: all 0.3s ease;
//         }
        
//         .legal-links a:hover {
//           color: #2e7d32;
//         }
        
//         .separator {
//           color: rgba(255, 255, 255, 0.3);
//         }
        
//         .copyright {
//           font-size: 0.9rem;
//           color: rgba(255, 255, 255, 0.7);
//           margin-bottom: 10px;
//         }
        
//         .mission {
//           font-size: 0.95rem;
//           color: rgba(255, 255, 255, 0.8);
//           margin-bottom: 10px;
//           line-height: 1.5;
//         }
        
//         .disclaimer {
//           font-size: 0.8rem;
//           color: rgba(255, 255, 255, 0.5);
//           line-height: 1.4;
//           max-width: 800px;
//           margin: 0 auto;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from './components/Navbarj.jsx';
// import Hero from './components/Hero';
// import About from './components/About';
// import Marketplace from './components/Marketplace';
// import ProductModal from './components/ProductModal';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import { productAPI, contactAPI } from './services/api.jsx';
// import './styles/App.css';
// import './styles/Auth.css';

// function App() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetchProducts();
    
//     // Check if user is logged in
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await productAPI.getProducts();
      
//       if (response.success) {
//         setProducts(response.products);
//       } else {
//         setError('Failed to load products');
//       }
//     } catch (err) {
//       console.error('Error fetching products:', err);
//       setError('Network error. Using sample data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleContactSubmit = async (formData) => {
//     try {
//       const response = await contactAPI.submitContact(formData);
//       alert(response.message);
//       return { success: true };
//     } catch (error) {
//       alert('Failed to send message. Please try again.');
//       return { success: false };
//     }
//   };

//   const handleLogin = async (email, password) => {
//     // For demo - in real app, use authAPI.login()
//     const user = { 
//       email, 
//       name: email.split('@')[0],
//       role: email.includes('farmer') ? 'farmer' : 'customer' 
//     };
//     setUser(user);
//     localStorage.setItem('user', JSON.stringify(user));
//     return { success: true };
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Routes>
//           <Route path="/login" element={
//             user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
//           } />
          
//           <Route path="/register" element={
//             user ? <Navigate to="/" /> : <Register />
//           } />
          
//           <Route path="/dashboard" element={
//             user ? <Dashboard user={user} /> : <Navigate to="/login" />
//           } />
          
//           <Route path="/" element={
//             <>
//               <Navbar user={user} onLogout={handleLogout} />
//               <main>
//                 <section id="home">
//                   <Hero />
//                 </section>
                
//                 <section id="about">
//                   <About />
//                 </section>
                
//                 <section id="marketplace">
//                   {loading ? (
//                     <div className="loading">Loading products...</div>
//                   ) : error ? (
//                     <div className="error">{error}</div>
//                   ) : (
//                     <Marketplace 
//                       products={products} 
//                       onProductClick={handleProductClick} 
//                     />
//                   )}
//                 </section>
                
//                 <section id="contact">
//                   <Contact onSubmit={handleContactSubmit} />
//                 </section>
//               </main>
//               <Footer />
//             </>
//           } />
//         </Routes>
        
//         <ProductModal 
//           isOpen={isModalOpen}
//           product={selectedProduct}
//           onClose={handleModalClose}
//         />
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbarj.jsx';
import Hero from './components/Hero';
import About from './components/About';
import Marketplace from './components/Marketplace';
import ProductModal from './components/ProductModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { productAPI, contactAPI } from './services/api.jsx';
import './styles/App.css';
import './styles/Auth.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProducts();
    
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts();
      
      if (response.success) {
        setProducts(response.products);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Network error. Using sample data.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleContactSubmit = async (formData) => {
    try {
      const response = await contactAPI.submitContact(formData);
      alert(response.message);
      return { success: true };
    } catch (error) {
      alert('Failed to send message. Please try again.');
      return { success: false };
    }
  };

  const handleLogin = async (email, password) => {
    // For demo - in real app, use authAPI.login()
    const user = { 
      email, 
      name: email.split('@')[0],
      role: email.includes('farmer') ? 'farmer' : 'customer' 
    };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true };
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } />
          
          <Route path="/register" element={
            user ? <Navigate to="/" /> : <Register />
          } />
          
          <Route path="/dashboard" element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          } />
          
          <Route path="/" element={
            <>
              <Navbar user={user} onLogout={handleLogout} />
              <main>
                <section id="home">
                  <Hero />
                </section>
                
                <section id="about">
                  <About />
                </section>
                
                <section id="marketplace">
                  {loading ? (
                    <div className="loading">Loading products...</div>
                  ) : error ? (
                    <div className="error">{error}</div>
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
        />
      </div>
    </Router>
  );
}

export default App;