const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByFarmer,
  getProductsByCategory,
  getFeaturedProducts,
  updateStock
} = require('../controllers/productController');
const { protect, isFarmer, checkOwnership } = require('../middleware/auth');
const { uploadMultiple, cloudinaryUpload, handleUploadError } = require('../middleware/upload');
const Product = require('../models/Product');

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/farmer/:farmerId', getProductsByFarmer);
router.get('/:id', getProduct);

// Protected routes
router.use(protect);

// Farmer routes
router.use(isFarmer);

router.post('/',
  uploadMultiple('images', 5),
  handleUploadError,
  cloudinaryUpload,
  createProduct
);

router.put('/:id', checkOwnership(Product), updateProduct);
router.delete('/:id', checkOwnership(Product), deleteProduct);
router.patch('/:id/stock', checkOwnership(Product), updateStock);

module.exports = router;