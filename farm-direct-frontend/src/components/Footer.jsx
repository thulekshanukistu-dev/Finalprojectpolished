import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLeaf, FaTruck, FaShieldAlt, FaCreditCard, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { 
      title: 'Shop', 
      links: [
        { name: 'All Products', url: '#' },
        { name: 'Vegetables', url: '#' },
        { name: 'Fruits', url: '#' },
        { name: 'Dairy', url: '#' },
        { name: 'Grains', url: '#' },
        { name: 'Seasonal Specials', url: '#' }
      ] 
    },
    { 
      title: 'Farmers', 
      links: [
        { name: 'Join Our Network', url: '#' },
        { name: 'Seller Dashboard', url: '#' },
        { name: 'Resources & Training', url: '#' },
        { name: 'Success Stories', url: '#' },
        { name: 'Pricing & Commission', url: '#' },
        { name: 'Farm Tools', url: '#' }
      ] 
    },
    { 
      title: 'Company', 
      links: [
        { name: 'About Us', url: '#about' },
        { name: 'Blog', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Press', url: '#' },
        { name: 'Sustainability', url: '#' },
        { name: 'Impact Report', url: '#' }
      ] 
    },
    { 
      title: 'Support', 
      links: [
        { name: 'Help Center', url: '#' },
        { name: 'Contact Us', url: '#contact' },
        { name: 'Shipping Info', url: '#' },
        { name: 'Returns & Refunds', url: '#' },
        { name: 'FAQ', url: '#' },
        { name: 'Order Tracking', url: '#' }
      ] 
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/freshfarm', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com/freshfarm', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/freshfarm', label: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/company/freshfarm', label: 'LinkedIn' },
  ];

  const contactInfo = [
    { icon: <FaPhone />, text: '+94757272324', description: 'Call us anytime' },
    { icon: <FaEnvelope />, text: 'support@freshfarm.com', description: 'Email support' },
    { icon: <FaMapMarkerAlt />, text: 'Kathiraveli, Batticaloa', description: 'Sri Lanka' },
  ];

  const certifications = [
    { icon: '🌱', label: 'Certified Organic', description: '100% Organic Produce' },
    { icon: '🏠', label: 'Locally Sourced', description: 'Direct from Local Farms' },
    { icon: '♻️', label: 'Sustainable', description: 'Eco-friendly Practices' },
    { icon: '💚', label: 'Fair Trade', description: 'Fair Prices for Farmers' },
  ];

  const paymentMethods = [
    { icon: '💳', label: 'Visa' },
    { icon: '💳', label: 'Mastercard' },
    { icon: '💳', label: 'American Express' },
    { icon: '💰', label: 'PayPal' },
    { icon: '📱', label: 'Apple Pay' },
    { icon: '📱', label: 'Google Pay' },
    { icon: '🏦', label: 'Bank Transfer' },
    { icon: '💵', label: 'Cash on Delivery' },
  ];

  const features = [
    { icon: <FaTruck />, title: 'Fast Delivery', description: 'Within 24 hours' },
    { icon: <FaShieldAlt />, title: 'Secure Payment', description: '100% secure' },
    { icon: <FaLeaf />, title: 'Fresh Guarantee', description: 'Quality assured' },
    { icon: <FaHeart />, title: 'Farmers First', description: 'Supporting local' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Features Banner */}
        <div className="features-banner">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand & Newsletter Section */}
          <div className="footer-brand">
            <div className="brand-header">
              <FaLeaf className="logo-icon" />
              <div className="brand-text">
                <h2>FreshFarm</h2>
                <p className="tagline">Direct from Farm to Table</p>
              </div>
            </div>
            
            <p className="brand-description">
              Connecting local farmers directly with consumers since 2024. 
              We're committed to sustainable agriculture and supporting our farming communities.
            </p>
            
            <div className="newsletter">
              <h4>Stay Updated with Fresh Deals</h4>
              <p>Subscribe to our newsletter for exclusive offers and farm updates</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  aria-label="Email for newsletter"
                  className="newsletter-input"
                />
                <button type="submit" className="btn-newsletter">
                  Subscribe
                </button>
              </form>
              <p className="newsletter-note">No spam, unsubscribe anytime.</p>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="footer-links-grid">
            {footerLinks.map((section, index) => (
              <div key={index} className="link-section">
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.url} 
                        aria-label={`Navigate to ${link.name}`}
                        className="footer-link"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Certifications */}
          <div className="footer-right">
            <div className="contact-section">
              <h4>Contact Information</h4>
              <div className="contact-info-list">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-info-item">
                    <span className="contact-icon">{item.icon}</span>
                    <div className="contact-details">
                      <p className="contact-text">{item.text}</p>
                      <p className="contact-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="certifications-section">
              <h4>Our Certifications</h4>
              <div className="certifications-grid">
                {certifications.map((cert, index) => (
                  <div key={index} className="cert-badge">
                    <span className="cert-icon">{cert.icon}</span>
                    <div className="cert-text">
                      <span className="cert-label">{cert.label}</span>
                      <span className="cert-desc">{cert.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social & Legal Section */}
        <div className="footer-bottom">
          {/* Social Links */}
          <div className="social-section">
            <h5>Follow Us</h5>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={`Visit our ${social.label} page`}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                  <span className="social-label">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-section">
            <h5>Accepted Payment Methods</h5>
            <div className="payment-methods">
              {paymentMethods.map((method, index) => (
                <span 
                  key={index} 
                  className="payment-icon" 
                  aria-label={method.label}
                  title={method.label}
                >
                  {method.icon}
                </span>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="legal-section">
            <div className="legal-links">
              <a href="#" aria-label="Privacy Policy">Privacy Policy</a>
              <span className="separator">•</span>
              <a href="#" aria-label="Terms of Service">Terms of Service</a>
              <span className="separator">•</span>
              <a href="#" aria-label="Cookie Policy">Cookie Policy</a>
              <span className="separator">•</span>
              <a href="#" aria-label="Sitemap">Sitemap</a>
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright-section">
            <p className="copyright">
              &copy; {currentYear} FreshFarm Marketplace. All rights reserved.
            </p>
            <p className="mission">
              Made with ❤️ for farmers and food lovers. Supporting sustainable agriculture and happy communities. 🌾
            </p>
            <p className="disclaimer">
              FreshFarm is a registered trademark. All product names, logos, and brands are property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;