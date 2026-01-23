const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res, next) => {
  try {
    const updateData = {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      farmName: req.body.farmName,
      location: req.body.location,
      bio: req.body.bio
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile image
// @route   PUT /api/users/profile/image
// @access  Private
exports.updateProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    const user = await User.findById(req.user.id);

    // Delete old image from Cloudinary if exists
    if (user.profileImage && user.profileImage.includes('cloudinary')) {
      try {
        const publicId = user.profileImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`freshfarm/profiles/${publicId}`);
      } catch (error) {
        console.error('Error deleting old profile image:', error);
      }
    }

    // Upload new image
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'freshfarm/profiles',
      width: 500,
      height: 500,
      crop: 'fill',
      gravity: 'face',
      quality: 'auto',
      format: 'webp'
    });

    // Delete local file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    user.profileImage = result.secure_url;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user dashboard stats
// @route   GET /api/users/dashboard
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    let stats = {};

    if (user.userType === 'farmer') {
      // Farmer stats
      const products = await Product.countDocuments({ farmer: req.user.id });
      const totalOrders = await Order.countDocuments({ farmer: req.user.id });
      
      const revenueResult = await Order.aggregate([
        { $match: { farmer: req.user.id, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]);

      const pendingOrders = await Order.countDocuments({ 
        farmer: req.user.id, 
        orderStatus: 'pending' 
      });

      const processingOrders = await Order.countDocuments({ 
        farmer: req.user.id, 
        orderStatus: 'processing' 
      });

      const deliveredOrders = await Order.countDocuments({ 
        farmer: req.user.id, 
        orderStatus: 'delivered' 
      });

      // Recent orders
      const recentOrders = await Order.find({ farmer: req.user.id })
        .sort('-createdAt')
        .limit(5)
        .populate('user', 'name email')
        .select('orderStatus totalPrice createdAt');

      // Low stock products
      const lowStockProducts = await Product.find({
        farmer: req.user.id,
        stock: { $lt: 10 },
        isAvailable: true
      }).limit(5);

      stats = {
        products,
        totalOrders,
        revenue: revenueResult[0]?.total || 0,
        pendingOrders,
        processingOrders,
        deliveredOrders,
        recentOrders,
        lowStockProducts,
        averageOrderValue: revenueResult[0]?.total ? (revenueResult[0].total / totalOrders).toFixed(2) : 0
      };
    } else {
      // Customer stats
      const orders = await Order.countDocuments({ user: req.user.id });
      const totalSpentResult = await Order.aggregate([
        { $match: { user: req.user.id, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]);

      const pendingOrders = await Order.countDocuments({ 
        user: req.user.id, 
        orderStatus: { $in: ['pending', 'processing'] } 
      });

      const deliveredOrders = await Order.countDocuments({ 
        user: req.user.id, 
        orderStatus: 'delivered' 
      });

      // Recent orders
      const recentOrders = await Order.find({ user: req.user.id })
        .sort('-createdAt')
        .limit(5)
        .populate('farmer', 'name farmName')
        .select('orderStatus totalPrice createdAt items');

      // Favorite products (if you implement favorites)
      const favorites = user.favorites || [];

      stats = {
        orders,
        totalSpent: totalSpentResult[0]?.total || 0,
        pendingOrders,
        deliveredOrders,
        recentOrders,
        favorites,
        averageOrderValue: totalSpentResult[0]?.total ? (totalSpentResult[0].total / orders).toFixed(2) : 0
      };
    }

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's orders
// @route   GET /api/users/orders
// @access  Private
exports.getUserOrders = async (req, res, next) => {
  try {
    let orders;
    
    if (req.user.userType === 'farmer') {
      orders = await Order.find({ farmer: req.user.id })
        .populate('user', 'name email phone')
        .populate('items.product', 'name images')
        .sort('-createdAt');
    } else {
      orders = await Order.find({ user: req.user.id })
        .populate('farmer', 'name farmName profileImage')
        .populate('items.product', 'name images')
        .sort('-createdAt');
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's products (for farmers)
// @route   GET /api/users/products
// @access  Private/Farmer
exports.getUserProducts = async (req, res, next) => {
  try {
    if (req.user.userType !== 'farmer') {
      return res.status(403).json({
        success: false,
        message: 'Only farmers can view their products'
      });
    }

    const products = await Product.find({ farmer: req.user.id })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product to favorites
// @route   POST /api/users/favorites/:productId
// @access  Private
exports.addToFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if already in favorites
    if (user.favorites.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product already in favorites'
      });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Product added to favorites',
      data: user.favorites
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from favorites
// @route   DELETE /api/users/favorites/:productId
// @access  Private
exports.removeFromFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;

    // Check if product is in favorites
    if (!user.favorites.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product not in favorites'
      });
    }

    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from favorites',
      data: user.favorites
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's favorites
// @route   GET /api/users/favorites
// @access  Private
exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    
    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
  try {
    // Don't allow password update via this route
    if (req.body.password) {
      delete req.body.password;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow deleting yourself if you're an admin
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate user (Admin only)
// @route   PUT /api/users/:id/deactivate
// @access  Private/Admin
exports.deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Activate user (Admin only)
// @route   PUT /api/users/:id/activate
// @access  Private/Admin
exports.activateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User activated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};