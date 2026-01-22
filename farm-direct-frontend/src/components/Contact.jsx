import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaTag } from 'react-icons/fa';

const Contact = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: ''
      });
      
      // Show success message
      alert('Thank you for your message! We will get back to you within 24 hours.');
    } catch (error) {
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2>Contact Us / Buyer Form</h2>
        <p className="section-subtitle">Get in touch with us for any inquiries or become a seller on our platform</p>
        
        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Have questions about our products, want to become a seller, or need assistance? We're here to help!</p>
            
            <div className="info-item">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <h4>Email</h4>
                <p>kirupairasathulekshan45@gmail.com</p>
                <p>support@freshfarm.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FaPhone />
              </div>
              <div className="info-content">
                <h4>Phone</h4>
                <p>+94757272324</p>
                <p>+1 (555) 123-4567 (International)</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <h4>Address</h4>
                <p>Kathiraveli, Batticaloa</p>
                <p>Sri Lanka</p>
              </div>
            </div>
            
            <div className="business-hours">
              <h4>Business Hours</h4>
              <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday - Sunday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send us a Message</h3>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <FaUser /> Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  <FaPhone /> Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+94 75 727 2324"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="inquiryType" className="form-label">
                <FaTag /> Inquiry Type
              </label>
              <select
                id="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="product">Product Inquiry</option>
                <option value="order">Order Issue</option>
                <option value="seller">Become a Seller</option>
                <option value="wholesale">Wholesale Purchase</option>
                <option value="partnership">Business Partnership</option>
                <option value="feedback">Feedback & Suggestions</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Your Message
              </label>
              <textarea
                id="message"
                rows="6"
                placeholder="Please provide details about your inquiry..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            <p className="form-note">
              By submitting this form, you agree to our privacy policy. We'll respond within 24 hours.
            </p>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .section-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .info-item {
          display: flex;
          gap: 20px;
          margin: 25px 0;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .info-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .info-icon {
          color: #2e7d32;
          font-size: 1.5rem;
          width: 50px;
          height: 50px;
          background: #e8f5e9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .info-content h4 {
          color: #333;
          font-size: 1.1rem;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .info-content p {
          color: #666;
          font-size: 1rem;
          margin: 4px 0;
          line-height: 1.4;
        }
        
        .business-hours {
          margin-top: 40px;
          padding: 25px;
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          color: white;
          border-radius: 12px;
        }
        
        .business-hours h4 {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: white;
        }
        
        .business-hours p {
          color: rgba(255, 255, 255, 0.9);
          margin: 8px 0;
          font-size: 0.95rem;
        }
        
        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
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
        
        .btn-submit {
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          font-size: 1.1rem;
          font-weight: 600;
          padding: 16px;
          transition: all 0.3s ease;
        }
        
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(46, 125, 50, 0.4);
        }
        
        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .form-note {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};

export default Contact;

