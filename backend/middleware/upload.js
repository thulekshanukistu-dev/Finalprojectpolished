const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let folder = 'uploads';
    
    if (file.fieldname === 'profileImage') {
      folder = 'uploads/profiles';
    } else if (file.fieldname === 'productImages') {
      folder = 'uploads/products';
    }
    
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    
    cb(null, folder);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images only! (jpeg, jpg, png, gif, webp)'));
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

// Upload single image
exports.uploadSingle = (fieldName) => {
  return upload.single(fieldName);
};

// Upload multiple images
exports.uploadMultiple = (fieldName, maxCount = 5) => {
  return upload.array(fieldName, maxCount);
};

// Handle upload errors
exports.handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

// Cloudinary upload middleware (if using cloudinary)
exports.cloudinaryUpload = async (req, res, next) => {
  if (!req.file && !req.files) {
    return next();
  }

  try {
    const cloudinary = require('../config/cloudinary');
    
    if (req.file) {
      // Single file upload
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `freshfarm/${req.file.fieldname === 'profileImage' ? 'profiles' : 'products'}`,
        width: 800,
        crop: "scale"
      });
      
      req.file.cloudinaryUrl = result.secure_url;
      req.file.publicId = result.public_id;
      
      // Delete local file after upload
      fs.unlinkSync(req.file.path);
    }
    
    if (req.files && req.files.length > 0) {
      // Multiple files upload
      const uploadPromises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'freshfarm/products',
          width: 800,
          crop: "scale"
        });
        
        file.cloudinaryUrl = result.secure_url;
        file.publicId = result.public_id;
        
        // Delete local file after upload
        fs.unlinkSync(file.path);
        
        return file.cloudinaryUrl;
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
      req.body.images = uploadedUrls;
    }
    
    next();
  } catch (error) {
    next(error);
  }
};