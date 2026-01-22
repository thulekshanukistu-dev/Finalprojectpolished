import React from 'react';
import { FaLeaf, FaBox, FaShoppingCart, FaChartLine, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const Dashboard = ({ user }) => {
  const stats = [
    { icon: <FaBox />, label: 'Products', value: '24', color: '#4CAF50' },
    { icon: <FaShoppingCart />, label: 'Orders', value: '156', color: '#2196F3' },
    { icon: <FaMoneyBillWave />, label: 'Revenue', value: '₹45,820', color: '#FF9800' },
    { icon: <FaChartLine />, label: 'Growth', value: '+24%', color: '#9C27B0' },
  ];

  const recentOrders = [
    { id: 1, product: 'Organic Tomatoes', date: '2024-01-10', status: 'Delivered', amount: '₹320' },
    { id: 2, product: 'Fresh Milk', date: '2024-01-09', status: 'Shipped', amount: '₹180' },
    { id: 3, product: 'Brown Eggs', date: '2024-01-08', status: 'Processing', amount: '₹240' },
  ];

  const userType = user?.role || 'customer';
  
  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Section */}
        <div className="dashboard-header">
          <div className="welcome">
            <h1>Welcome back, {user?.email?.split('@')[0] || 'User'}!</h1>
            <p className="subtitle">
              {userType === 'farmer' 
                ? 'Manage your farm products and track sales' 
                : 'Track your orders and explore fresh produce'}
            </p>
          </div>
          <div className="date-time">
            <p>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderLeft: `5px solid ${stat.color}` }}>
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Left Column */}
          <div className="dashboard-left">
            {/* Recent Orders */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Recent Orders</h3>
                <button className="view-all">View All</button>
              </div>
              <div className="orders-list">
                {recentOrders.map(order => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <h4>{order.product}</h4>
                      <p className="order-date">{order.date}</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-amount">
                      {order.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="quick-actions">
                {userType === 'farmer' ? (
                  <>
                    <button className="action-btn">
                      <FaBox /> Add New Product
                    </button>
                    <button className="action-btn">
                      <FaChartLine /> View Analytics
                    </button>
                    <button className="action-btn">
                      <FaMoneyBillWave /> Manage Pricing
                    </button>
                  </>
                ) : (
                  <>
                    <button className="action-btn">
                      <FaShoppingCart /> Continue Shopping
                    </button>
                    <button className="action-btn">
                      <FaBox /> Track Orders
                    </button>
                    <button className="action-btn">
                      <FaUser /> Update Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right">
            {/* User Profile */}
            <div className="dashboard-card profile-card">
              <div className="profile-header">
                <div className="avatar">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="profile-info">
                  <h3>{user?.email?.split('@')[0] || 'User'}</h3>
                  <p className="user-role">
                    <FaUser /> {userType.charAt(0).toUpperCase() + userType.slice(1)}
                  </p>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{user?.email || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Member Since:</span>
                  <span className="value">January 2024</span>
                </div>
                <div className="detail-item">
                  <span className="label">Total Orders:</span>
                  <span className="value">15</span>
                </div>
              </div>
              <button className="edit-profile">Edit Profile</button>
            </div>

            {/* Notifications */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Notifications</h3>
                <span className="badge">3 new</span>
              </div>
              <div className="notifications">
                <div className="notification">
                  <div className="notification-icon">🎉</div>
                  <div className="notification-content">
                    <p>Welcome bonus! Get 20% off your first order</p>
                    <span className="time">2 hours ago</span>
                  </div>
                </div>
                <div className="notification">
                  <div className="notification-icon">🚚</div>
                  <div className="notification-content">
                    <p>Your order #12345 has been shipped</p>
                    <span className="time">1 day ago</span>
                  </div>
                </div>
                <div className="notification">
                  <div className="notification-icon">📢</div>
                  <div className="notification-content">
                    <p>New organic vegetables available</p>
                    <span className="time">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .dashboard {
          padding: 100px 0 60px;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .welcome h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: #333;
        }
        
        .subtitle {
          color: #666;
          font-size: 1.1rem;
        }
        
        .date-time p {
          color: #666;
          font-size: 1rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-icon {
          font-size: 2.5rem;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(76, 175, 80, 0.1);
          border-radius: 15px;
        }
        
        .stat-content h3 {
          font-size: 2rem;
          margin-bottom: 5px;
          color: #333;
        }
        
        .stat-content p {
          color: #666;
          font-size: 0.95rem;
        }
        
        .dashboard-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        @media (max-width: 1024px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }
        
        .dashboard-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .card-header h3 {
          font-size: 1.5rem;
          color: #333;
        }
        
        .view-all {
          background: none;
          border: none;
          color: #4CAF50;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .view-all:hover {
          color: #2E7D32;
          text-decoration: underline;
        }
        
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .order-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 20px;
          align-items: center;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .order-item:hover {
          background: #f0f0f0;
        }
        
        .order-info h4 {
          margin-bottom: 5px;
          color: #333;
        }
        
        .order-date {
          color: #666;
          font-size: 0.9rem;
        }
        
        .status-badge {
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .status-badge.delivered {
          background: #e8f5e9;
          color: #2e7d32;
        }
        
        .status-badge.shipped {
          background: #e3f2fd;
          color: #1976d2;
        }
        
        .status-badge.processing {
          background: #fff3e0;
          color: #f57c00;
        }
        
        .order-amount {
          font-weight: 700;
          color: #333;
          font-size: 1.1rem;
          text-align: right;
        }
        
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .action-btn:hover {
          background: #2E7D32;
          transform: translateY(-2px);
        }
        
        .profile-card {
          text-align: center;
        }
        
        .profile-header {
          margin-bottom: 25px;
        }
        
        .avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #4CAF50, #2E7D32);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: white;
          margin: 0 auto 20px;
        }
        
        .profile-info h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
          color: #333;
        }
        
        .user-role {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #666;
          font-size: 0.95rem;
        }
        
        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin: 25px 0;
          text-align: left;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .detail-item:last-child {
          border-bottom: none;
        }
        
        .label {
          color: #666;
          font-weight: 500;
        }
        
        .value {
          color: #333;
          font-weight: 600;
        }
        
        .edit-profile {
          width: 100%;
          padding: 15px;
          background: none;
          border: 2px solid #4CAF50;
          color: #4CAF50;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .edit-profile:hover {
          background: #4CAF50;
          color: white;
        }
        
        .badge {
          background: #ff4444;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .notifications {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .notification {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .notification:hover {
          background: #f0f0f0;
        }
        
        .notification-icon {
          font-size: 1.5rem;
          min-width: 40px;
        }
        
        .notification-content {
          flex: 1;
        }
        
        .notification-content p {
          margin-bottom: 5px;
          color: #333;
          font-weight: 500;
        }
        
        .time {
          color: #666;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;