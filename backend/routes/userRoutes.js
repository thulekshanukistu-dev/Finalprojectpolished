const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
  getDashboardStats,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle, cloudinaryUpload, handleUploadError } = require('../middleware/upload');

// Public routes
// (Add any public user routes here)

// Protected routes
router.use(protect);

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.route('/profile/image')
  .put(
    uploadSingle('profileImage'),
    handleUploadError,
    cloudinaryUpload,
    updateProfileImage
  );

router.get('/dashboard', getDashboardStats);

// Admin routes
router.use(authorize('admin'));

router.route('/')
  .get(getAllUsers);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;