import React, { useState } from 'react';

const Marketplace = ({ products, onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛒' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'grains', name: 'Grains', icon: '🌾' },
    { id: 'poultry', name: 'Poultry', icon: '🥚' },
    { id: 'others', name: 'Others', icon: '🍯' }
  ];

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <section className="marketplace" id="marketplace">
      <div className="container">
        <h2>Farm Fresh Products</h2>
        <p className="section-subtitle">Direct from our partner farms to your table</p>
        
        <div className="filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleFilter(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => onProductClick(product)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image" 
                loading="lazy"
              />
              <div className="product-info">
                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="price">₹{product.price} <span className="unit">/{product.unit}</span></div>
                <div className="farmer">By {product.farmer}</div>
                <div className="rating">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                  <span> ({product.rating})</span>
                </div>
                {product.stock < 20 && (
                  <div className="stock-warning">
                    Only {product.stock} left in stock!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found in this category. Check back soon!</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .section-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .filter-icon {
          margin-right: 8px;
          font-size: 1.2rem;
        }
        
        .unit {
          font-size: 1rem;
          color: #666;
          font-weight: normal;
        }
        
        .stock-warning {
          background: #fff3cd;
          color: #856404;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.9rem;
          margin-top: 15px;
          border: 1px solid #ffeaa7;
          font-weight: 500;
        }
        
        .no-products {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 15px;
          margin-top: 40px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .no-products p {
          font-size: 1.2rem;
          color: #666;
        }
      `}</style>
    </section>
  );
};

export default Marketplace;