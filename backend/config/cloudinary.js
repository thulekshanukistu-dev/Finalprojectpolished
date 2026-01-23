const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Test connection
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.api.ping()
    .then(() => console.log('✅ Cloudinary connected successfully'))
    .catch(err => console.error('❌ Cloudinary connection error:', err.message));
} else {
  console.log('⚠️  Cloudinary not configured. Using local storage.');
}

module.exports = cloudinary;