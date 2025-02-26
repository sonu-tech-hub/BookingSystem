// server/routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');
const { protect, vendor } = require('../middleware/authMiddleware');

router.use((req, res, next) => {
  console.log('Auth Header:', req.headers.authorization);
  next();
});

router.route('/').post(protect, vendor, createListing).get(getListings);
router
  .route('/:id')
  .get(getListingById)
  .put(protect, vendor, updateListing)
  .delete(protect, vendor, deleteListing);

module.exports = router;