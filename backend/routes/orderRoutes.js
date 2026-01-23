const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getFarmerOrders,
  getOrder,
  updateOrderToPaid,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
  getOrderStats
} = require('./orderController');
const { protect, isFarmer, isAdmin } = require('../middleware/auth');

// All order routes require authentication
router.use(protect);

// Order creation
router.route('/')
  .post(createOrder);

// User orders
router.get('/myorders', getMyOrders);

// Single order operations
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Farmer order routes
router.get('/farmer/orders', isFarmer, getFarmerOrders);
router.get('/farmer/stats', isFarmer, getFarmerOrderStats);
router.put('/:id/pay', isFarmer, updateOrderToPaid);
router.put('/:id/status', isFarmer, updateOrderStatus);

// Admin routes
router.use(isAdmin);
router.get('/admin/all', getAllOrders);
router.get('/admin/stats', getOrderStats);

module.exports = router;