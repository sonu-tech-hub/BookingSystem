// // server/config/cloudinary.js
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// console.log(cloudinary.config());

// module.exports = cloudinary;
// In cloudinary.js
const cloudinary = require('cloudinary').v2;
// const dotenv = require('dotenv');

// dotenv.config();

const configureCloudinary = () => {
  console.log('Configuring Cloudinary with:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log(cloudinary.config());
};

module.exports = { cloudinary, configureCloudinary };