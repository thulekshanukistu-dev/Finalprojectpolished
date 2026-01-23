import React, { useEffect, useState } from 'react';

const ProductModal = ({ isOpen, product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease') {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  const handleBuyNowClick = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      window.location.href = '/checkout';
    }
  };

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <div className="modal-product">
          <img 
            src={product.image} 
            alt={product.name} 
            className="modal-image" 
          />
          <div className="modal-details">
            <span className="modal-category">{product.category}</span>
            <h3>{product.name}</h3>
            
            <div className="modal-price-section">
              <div className="price-main">₹{product.price} <span className="price-unit">/{product.unit}</span></div>
              <div className="original-price">₹{Math.round(product.price * 1.3)} (Market Price)</div>
              <div className="price-savings">You save 23%</div>
            </div>
            
            <div className="modal-info-grid">
              <div className="info-item">
                <span className="info-label">Farmer:</span>
                <span className="info-value">{product.farmer}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Rating:</span>
                <span className="info-value">
                  <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                  <span className="rating-text">{product.rating}/5</span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Stock:</span>
                <span className="info-value stock-available">{product.stock} {product.unit} available</span>
              </div>
              <div className="info-item">
                <span className="info-label">Delivery:</span>
                <span className="info-value delivery-time">Within 24 hours</span>
              </div>
            </div>
            
            <div className="modal-description">
              <h4>Product Description</h4>
              <p>{product.description}</p>
              <ul className="product-features">
                <li>✅ 100% Organic & Chemical-free</li>
                <li>✅ Harvested fresh daily</li>
                <li>✅ Direct from farm to you</li>
                <li>✅ Money-back freshness guarantee</li>
              </ul>
            </div>
            
            <div className="modal-actions">
              <div className="quantity-selector">
                <button 
                  className="qty-btn" 
                  onClick={() => handleQuantityChange('decrease')}
                  aria-label="Decrease quantity"
                >-</button>
                <span className="qty-value">{quantity} {product.unit}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => handleQuantityChange('increase')}
                  aria-label="Increase quantity"
                >+</button>
              </div>
              <button className="btn btn-add-to-cart" onClick={handleAddToCartClick}>
                Add to Cart - ₹{product.price * quantity}
              </button>
              <button className="btn btn-buy-now" onClick={handleBuyNowClick}>
                Buy Now
              </button>
            </div>
            
            <div className="modal-footer">
              <p className="shipping-info">🚚 Free delivery on orders above ₹500</p>
              <p className="return-policy">🔄 100% satisfaction guarantee or your money back</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .modal-category {
          display: inline-block;
          background: #e8f5e9;
          color: #2e7d32;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .modal-price-section {
          margin: 25px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }
        
        .price-main {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2e7d32;
          margin-bottom: 5px;
        }
        
        .price-unit {
          font-size: 1.2rem;
          color: #666;
          font-weight: normal;
        }
        
        .original-price {
          font-size: 1.1rem;
          color: #666;
          text-decoration: line-through;
          margin-bottom: 5px;
        }
        
        .price-savings {
          font-size: 1rem;
          color: #d32f2f;
          font-weight: 600;
          background: #ffebee;
          padding: 5px 10px;
          border-radius: 15px;
          display: inline-block;
        }
        
        .modal-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin: 25px 0;
        }
        
        .info-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .info-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }
        
        .info-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }
        
        .stars {
          color: #ff9800;
          font-size: 1.2rem;
          margin-right: 8px;
        }
        
        .rating-text {
          font-size: 1rem;
          color: #666;
        }
        
        .stock-available {
          color: #2e7d32;
        }
        
        .delivery-time {
          color: #1976d2;
        }
        
        .modal-description {
          margin: 30px 0;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
        }
        
        .modal-description h4 {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 15px;
        }
        
        .modal-description p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #555;
          margin-bottom: 20px;
        }
        
        .product-features {
          list-style: none;
          padding: 0;
        }
        
        .product-features li {
          padding: 10px 0;
          padding-left: 30px;
          position: relative;
          font-size: 1rem;
          color: #444;
        }
        
        .product-features li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #2e7d32;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .modal-actions {
          display: flex;
          gap: 20px;
          align-items: center;
          margin: 30px 0;
          flex-wrap: wrap;
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #f5f5f5;
          padding: 10px 20px;
          border-radius: 10px;
        }
        
        .qty-btn {
          width: 40px;
          height: 40px;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1.5rem;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .qty-btn:hover {
          border-color: #2e7d32;
          color: #2e7d32;
        }
        
        .qty-value {
          font-size: 1.2rem;
          font-weight: 600;
          min-width: 80px;
          text-align: center;
        }
        
        .btn-add-to-cart {
          flex: 1;
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
        }
        
        .btn-buy-now {
          flex: 1;
          background: linear-gradient(135deg, #1976d2, #1565c0);
        }
        
        .modal-footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }
        
        .shipping-info, .return-policy {
          font-size: 0.95rem;
          color: #666;
          margin: 10px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        @media (max-width: 768px) {
          .modal-info-grid {
            grid-template-columns: 1fr;
          }
          
          .modal-actions {
            flex-direction: column;
          }
          
          .quantity-selector {
            width: 100%;
            justify-content: center;
          }
          
          .btn-add-to-cart, .btn-buy-now {
            width: 100%;
          }
          
          .price-main {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductModal;