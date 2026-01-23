const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
  getDashboardStats,
  getUserOrders,
  getUserProducts,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser
} = require('./userController'); 
const { protect, authorize, isFarmer, isAdmin } = require('../middleware/auth');
const { uploadSingle, handleUploadError, cleanupTempFiles } = require('../middleware/upload');

// All user routes require authentication
router.use(protect);

// User profile routes
router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.route('/profile/image')
  .put(
    uploadSingle('profileImage'),
    handleUploadError,
    updateProfileImage,
    cleanupTempFiles
  );

// Dashboard and user data
router.get('/dashboard', getDashboardStats);
router.get('/orders', getUserOrders);
router.get('/favorites', getFavorites);
router.post('/favorites/:productId', addToFavorites);
router.delete('/favorites/:productId', removeFromFavorites);

// Farmer-specific routes
router.get('/products', isFarmer, getUserProducts);

// Admin routes
router.use(authorize('admin'));

router.route('/')
  .get(getAllUsers);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.put('/:id/deactivate', deactivateUser);
router.put('/:id/activate', activateUser);

module.exports = router;