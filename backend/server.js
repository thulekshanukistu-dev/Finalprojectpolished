const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ MongoDB Connected');
    } else {
      console.log('⚠️  Using demo mode (no database)');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

// Basic Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'FreshFarm API is running 🚜🌱',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Demo Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, userType } = req.body;
  
  console.log('Register request:', { name, email, userType });

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and password'
    });
  }

  // Generate demo token
  const token = 'demo-jwt-token-' + Date.now();

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token: token,
    user: {
      _id: 'user_' + Date.now(),
      name: name,
      email: email,
      userType: userType || 'customer',
      phone: '',
      address: ''
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login request:', { email });

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Demo login - accept any email/password
  const token = 'demo-jwt-token-' + Date.now();
  const userType = email.includes('farmer') ? 'farmer' : 'customer';

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token: token,
    user: {
      _id: 'user_123456',
      name: email.split('@')[0],
      email: email,
      userType: userType,
      phone: '+94757272324',
      address: 'Kathiraveli, Batticaloa'
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      _id: 'user_123456',
      name: 'Demo User',
      email: 'demo@freshfarm.com',
      userType: 'customer',
      phone: '+94757272324',
      address: 'Kathiraveli, Batticaloa',
      createdAt: new Date()
    }
  });
});

// Demo Products Route
app.get('/api/products', (req, res) => {
  const products = [
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
      description: 'Fresh organic tomatoes grown without any pesticides or chemicals.'
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
      description: 'Pure, unprocessed milk from grass-fed cows.'
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
      description: 'Free-range brown eggs from happy, healthy chickens.'
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
      description: 'Premium quality organic rice grown in fertile fields.'
    },
    {
      _id: '5',
      name: 'Fresh Carrots',
      category: 'vegetables',
      price: 50,
      unit: 'kg',
      farmer: 'Kumar Farm',
      rating: 4.4,
      stock: 60,
      image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Sweet and crunchy carrots grown in mineral-rich soil.'
    },
    {
      _id: '6',
      name: 'Pure Honey',
      category: 'others',
      price: 300,
      unit: 'kg',
      farmer: 'Bee Happy Farm',
      rating: 4.9,
      stock: 20,
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Pure, raw honey from local wildflowers.'
    }
  ];

  // Apply filters if provided
  let filteredProducts = [...products];
  
  if (req.query.category && req.query.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === req.query.category);
  }
  
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm) ||
      p.farmer.toLowerCase().includes(searchTerm)
    );
  }

  res.status(200).json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  });
});

app.get('/api/products/:id', (req, res) => {
  const products = {
    '1': {
      _id: '1',
      name: 'Organic Tomatoes',
      category: 'vegetables',
      price: 80,
      unit: 'kg',
      farmer: 'Kumar Farm',
      rating: 4.5,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      description: 'Fresh organic tomatoes grown without any pesticides or chemicals. Harvested daily from our sustainable farms.',
      isOrganic: true,
      isAvailable: true,
      createdAt: new Date()
    },
    '2': {
      _id: '2',
      name: 'Fresh Milk',
      category: 'dairy',
      price: 60,
      unit: 'liter',
      farmer: 'Dairy Valley',
      rating: 4.8,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      description: 'Pure, unprocessed milk from grass-fed cows. No additives or preservatives.',
      isOrganic: true,
      isAvailable: true,
      createdAt: new Date()
    }
  };

  const product = products[req.params.id];
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// Demo Orders Route
app.post('/api/orders', (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No items in order'
    });
  }

  const itemsPrice = items.reduce((total, item) => {
    return total + (item.price || 0) * (item.quantity || 1);
  }, 0);

  const order = {
    _id: 'order_' + Date.now(),
    items: items,
    shippingAddress: shippingAddress || {
      name: 'Demo User',
      address: 'Kathiraveli, Batticaloa',
      phone: '+94757272324',
      city: 'Batticaloa'
    },
    paymentMethod: paymentMethod || 'cash_on_delivery',
    itemsPrice: itemsPrice,
    shippingPrice: itemsPrice > 500 ? 0 : 50,
    taxPrice: itemsPrice * 0.05,
    totalPrice: itemsPrice + (itemsPrice > 500 ? 0 : 50) + (itemsPrice * 0.05),
    orderStatus: 'pending',
    paymentStatus: 'pending',
    isPaid: false,
    isDelivered: false,
    createdAt: new Date()
  };

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: order
  });
});

app.get('/api/orders/myorders', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }

  const orders = [
    {
      _id: 'order_1',
      totalPrice: 320,
      orderStatus: 'delivered',
      paymentStatus: 'paid',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      items: [
        { name: 'Organic Tomatoes', quantity: 2, price: 80 }
      ]
    },
    {
      _id: 'order_2',
      totalPrice: 180,
      orderStatus: 'processing',
      paymentStatus: 'paid',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      items: [
        { name: 'Fresh Milk', quantity: 3, price: 60 }
      ]
    }
  ];

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// User Profile Route
app.get('/api/users/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      _id: 'user_123456',
      name: 'Demo User',
      email: 'demo@freshfarm.com',
      userType: 'customer',
      phone: '+94757272324',
      address: 'Kathiraveli, Batticaloa',
      profileImage: '',
      createdAt: new Date()
    }
  });
});

// Test Route
app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FreshFarm API is working! 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to FreshFarm Backend API 🚜🌱',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      test: '/api/test',
      products: '/api/products',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      }
    }
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/test',
      'GET /api/products',
      'GET /api/products/:id',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'GET /api/users/profile',
      'POST /api/orders',
      'GET /api/orders/myorders'
    ]
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`
    🚀 FreshFarm Backend Server Started!
    🌐 URL: http://localhost:${PORT}
    🔗 Frontend: http://localhost:3000
    📊 Health: http://localhost:${PORT}/api/health
    🧪 Test: http://localhost:${PORT}/api/test
    📅 ${new Date().toLocaleString()}
    `);
  });
};

startServer();