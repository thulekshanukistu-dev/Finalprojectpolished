const express = require('express');
const router = express.Router();

// Test route to verify API is working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'FreshFarm API is working! 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Database connection test
router.get('/db', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const connectionState = mongoose.connection.readyState;
    
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      success: true,
      database: {
        state: states[connectionState] || 'unknown',
        code: connectionState,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        models: Object.keys(mongoose.connection.models)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Environment variables test (excluding sensitive info)
router.get('/env', (req, res) => {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not Set',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not Set',
    MONGODB_URI: process.env.MONGODB_URI ? 'Set (hidden)' : 'Not Set'
  };
  
  res.json({
    success: true,
    environment: env
  });
});

module.exports = router;