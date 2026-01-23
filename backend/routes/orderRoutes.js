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
} = require('../controllers/orderController');
const { protect, isFarmer, authorize } = require('../middleware/auth');

// Protected routes
router.use(protect);

router.route('/')
  .post(createOrder);

router.get('/myorders', getMyOrders);
router.get('/farmerorders', isFarmer, getFarmerOrders);
router.get('/:id', getOrder);
router.put('/:id/pay', isFarmer, updateOrderToPaid);
router.put('/:id/status', isFarmer, updateOrderStatus);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.use(authorize('admin'));
router.get('/admin/all', getAllOrders);
router.get('/admin/stats', getOrderStats);

module.exports = router;