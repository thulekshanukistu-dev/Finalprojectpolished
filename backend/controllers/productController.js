const Product = require('../models/Product');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res, next) => {
  try {
    // Copy query string
    const queryObj = { ...req.query };
    
    // Fields to exclude from filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'minPrice', 'maxPrice'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Search functionality
    if (req.query.search) {
      queryObj.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { farmName: { $regex: req.query.search, $options: 'i' } },
        { tags: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      queryObj.price = {};
      if (req.query.minPrice) {
        queryObj.price.$gte = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        queryObj.price.$lte = parseFloat(req.query.maxPrice);
      }
    }

    // Category filter
    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    // Availability filter
    if (req.query.available === 'true') {
      queryObj.isAvailable = true;
    } else if (req.query.available === 'false') {
      queryObj.isAvailable = false;
    }

    // Organic filter
    if (req.query.organic === 'true') {
      queryObj.isOrganic = true;
    }

    // Featured filter
    if (req.query.featured === 'true') {
      queryObj.isFeatured = true;
    }

    // Best seller filter
    if (req.query.bestSeller === 'true') {
      queryObj.isBestSeller = true;
    }

    // Build query
    let query = Product.find(queryObj).populate('farmer', 'name email profileImage farmName location');

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort by newest
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || process.env.DEFAULT_PAGE_SIZE || 12;
    const skip = (page - 1) * limit;
    
    // Count total documents
    const total = await Product.countDocuments(queryObj);

    query = query.skip(skip).limit(limit);

    // Execute query
    const products = await query;

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages,
      currentPage: page,
      pageSize: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('farmer', 'name email phone farmName location profileImage bio');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views (if you add a views field)
    product.views = (product.views || 0) + 1;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Farmer
exports.createProduct = async (req, res, next) => {
  try {
    // Check if user is a farmer
    const user = await User.findById(req.user.id);
    if (user.userType !== 'farmer') {
      return res.status(403).json({
        success: false,
        message: 'Only farmers can create products'
      });
    }

    const productData = {
      ...req.body,
      farmer: req.user.id,
      farmName: user.farmName || user.name
    };

    // Handle image upload
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      const uploadedImages = [];
      
      for (const image of images) {
        try {
          const result = await cloudinary.uploader.upload(image.tempFilePath || image.path, {
            folder: 'freshfarm/products',
            width: 800,
            crop: 'scale',
            quality: 'auto',
            format: 'webp'
          });
          uploadedImages.push(result.secure_url);
          
          // Delete temporary file if exists
          if (image.tempFilePath && fs.existsSync(image.tempFilePath)) {
            fs.unlinkSync(image.tempFilePath);
          }
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          // Continue with other images
        }
      }
      
      productData.images = uploadedImages;
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Farmer
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.farmer.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    // Handle image updates if needed
    const updateData = { ...req.body };
    
    // Don't allow changing farmer
    if (updateData.farmer) {
      delete updateData.farmer;
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('farmer', 'name email');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Farmer
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.farmer.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    // Delete images from cloudinary (optional)
    if (product.images && product.images.length > 0 && process.env.CLOUDINARY_CLOUD_NAME) {
      for (const imageUrl of product.images) {
        try {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`freshfarm/products/${publicId}`);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
          // Continue with deletion even if image deletion fails
        }
      }
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by farmer
// @route   GET /api/products/farmer/:farmerId
// @access  Public
exports.getProductsByFarmer = async (req, res, next) => {
  try {
    const products = await Product.find({ farmer: req.params.farmerId })
      .populate('farmer', 'name email profileImage farmName')
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

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.category, isAvailable: true })
      .populate('farmer', 'name email profileImage')
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

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const products = await Product.find({ isAvailable: true, isFeatured: true })
      .sort('-rating -createdAt')
      .limit(limit)
      .populate('farmer', 'name email profileImage');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get best seller products
// @route   GET /api/products/best-sellers
// @access  Public
exports.getBestSellers = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const products = await Product.find({ isAvailable: true, isBestSeller: true })
      .sort('-numReviews -rating')
      .limit(limit)
      .populate('farmer', 'name email profileImage');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product stock
// @route   PATCH /api/products/:id/stock
// @access  Private/Farmer
exports.updateStock = async (req, res, next) => {
  try {
    const { stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.farmer.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    product.stock = stock;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product images
// @route   PUT /api/products/:id/images
// @access  Private/Farmer
exports.updateImages = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.farmer.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    // Handle image upload
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      const uploadedImages = [];
      
      for (const image of images) {
        try {
          const result = await cloudinary.uploader.upload(image.tempFilePath || image.path, {
            folder: 'freshfarm/products',
            width: 800,
            crop: 'scale',
            quality: 'auto',
            format: 'webp'
          });
          uploadedImages.push(result.secure_url);
          
          // Delete temporary file
          if (image.tempFilePath && fs.existsSync(image.tempFilePath)) {
            fs.unlinkSync(image.tempFilePath);
          }
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
        }
      }
      
      // Add new images to existing ones or replace (based on your logic)
      product.images = [...product.images, ...uploadedImages];
      await product.save();
    }

    res.status(200).json({
      success: true,
      message: 'Images updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product image
// @route   DELETE /api/products/:id/images/:imageIndex
// @access  Private/Farmer
exports.deleteImage = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.farmer.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    const imageIndex = parseInt(req.params.imageIndex);
    
    if (imageIndex < 0 || imageIndex >= product.images.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image index'
      });
    }

    // Remove image from array
    const removedImage = product.images.splice(imageIndex, 1)[0];
    
    // Delete from Cloudinary if it's a Cloudinary URL
    if (removedImage.includes('cloudinary') && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        const publicId = removedImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`freshfarm/products/${publicId}`);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
      }
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};