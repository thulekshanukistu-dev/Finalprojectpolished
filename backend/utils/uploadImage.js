const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// Upload single image to Cloudinary
exports.uploadToCloudinary = async (filePath, folder = 'freshfarm') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      width: 800,
      crop: "scale",
      quality: "auto",
      fetch_format: "auto"
    });

    // Delete local file after upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    // Clean up local file if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

// Upload multiple images
exports.uploadMultipleToCloudinary = async (filePaths, folder = 'freshfarm/products') => {
  try {
    const uploadPromises = filePaths.map(filePath => 
      exports.uploadToCloudinary(filePath, folder)
    );

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw error;
  }
};

// Delete image from Cloudinary
exports.deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

// Generate image URL with transformations
exports.generateImageUrl = (publicId, transformations = {}) => {
  const defaultTransformations = {
    width: 800,
    crop: 'scale',
    quality: 'auto',
    fetch_format: 'auto'
  };

  const finalTransformations = { ...defaultTransformations, ...transformations };
  
  return cloudinary.url(publicId, finalTransformations);
};

// Validate image file
exports.validateImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }

  return true;
};

// Generate file name
exports.generateFileName = (originalName, userId) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `user_${userId}_${timestamp}_${randomString}.${extension}`;
};

// Create local directory if not exists
exports.ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Process and optimize image (placeholder for actual image processing)
exports.processImage = async (filePath) => {
  // In a real application, you would use sharp or gm to process images
  // This is a placeholder function
  console.log(`Processing image: ${filePath}`);
  return filePath;
};

// Handle image upload errors
exports.handleUploadError = (error) => {
  let message = 'Image upload failed';
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    message = 'File size too large. Maximum size is 5MB';
  } else if (error.code === 'LIMIT_FILE_TYPE') {
    message = 'Invalid file type. Only images are allowed';
  } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    message = 'Too many files uploaded';
  }
  
  return { success: false, message };
};