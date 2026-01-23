import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ user, onLogout, cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'contact', label: 'Contact' },
  ];

  
  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-container">
            {/* Brand Logo */}
            <div className="brand" onClick={() => scrollToSection('home')}>
              <FaLeaf className="logo-icon" />
              <div className="logo-text">
                <span className="logo-primary">FreshFarm</span>
                <span className="logo-subtitle">Direct from Farm</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-desktop">
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.id} className="nav-item">
                    <button
                      className="nav-link"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Actions */}
            <div className="nav-actions">
              <button className="action-btn cart-btn">
                <FaShoppingCart />
                <span className="cart-count">3</span>
              </button>
              
              {user ? (
                <div className="user-menu">
                  <button className="action-btn user-btn">
                    <FaUser />
                    <span>{user.email.split('@')[0]}</span>
                  </button>
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item">
                      <FaUser /> Profile
                    </Link>
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn-login">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-register">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMenu}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="mobile-brand">
                <FaLeaf />
                <span>FreshFarm</span>
              </div>
              <button className="mobile-close" onClick={toggleMenu}>
                <FaTimes />
              </button>
            </div>
            
            <div className="mobile-menu-content">
              <ul className="mobile-nav-list">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className="mobile-nav-link"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mobile-actions">
                {user ? (
                  <>
                    <div className="mobile-user-info">
                      <FaUser />
                      <span>{user.email}</span>
                    </div>
                    <Link to="/dashboard" className="mobile-action-btn">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="mobile-action-btn">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="mobile-cta-btn logout">
                      <FaSignOutAlt /> Logout
                    </button>
                    <button className="action-btn cart-btn">
  <FaShoppingCart />
  <span className="cart-count">{cartItems?.length || 0}</span> {/* ADD THIS */}
</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="mobile-action-btn">
                      Sign In
                    </Link>
                    <Link to="/register" className="mobile-cta-btn">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Add to existing Navbar styles */
        .btn-login {
          padding: 0.75rem 1.5rem;
          background: none;
          border: 2px solid #4CAF50;
          color: #4CAF50;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .btn-login:hover {
          background: #4CAF50;
          color: white;
        }
        
        .btn-register {
          padding: 0.75rem 1.5rem;
          background: #4CAF50;
          border: 2px solid #4CAF50;
          color: white;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .btn-register:hover {
          background: #2E7D32;
          border-color: #2E7D32;
          transform: translateY(-2px);
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          z-index: 100;
        }
        
        .user-menu:hover .user-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          text-decoration: none;
          color: #333;
          transition: all 0.3s ease;
          border-bottom: 1px solid #f0f0f0;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          font-size: 0.95rem;
        }
        
        .dropdown-item:hover {
          background: #f5f5f5;
          color: #4CAF50;
        }
        
        .dropdown-item.logout {
          color: #ff4444;
        }
        
        .dropdown-item.logout:hover {
          background: #ffebee;
        }
        
        .mobile-user-info {
          padding: 15px;
          background: #f5f5f5;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .mobile-user-info svg {
          color: #4CAF50;
        }
      `}</style>
    </>
  );
};

export default Navbar;