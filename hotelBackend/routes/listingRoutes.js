const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  searchListings,
  updateListing,
  deleteListing,
  FilterData,
  getListingById,
  getVendorListings,
} = require('../controllers/listingController');
const { protect, vendor, admin } = require('../middleware/authMiddleware');

router.get('/search', searchListings);
router.get('/filter', FilterData);

// Separate routes for creating and getting listings
router.post('/', protect, vendor, createListing);
router.get('/', getListings);

// Routes for a specific listing by ID (view, update, delete)
router.route('/:id').get(getListingById);
router.route('/:id').put(protect, vendor, admin, updateListing); // Vendor/Admin can update
router.route('/:id').delete(protect, vendor, deleteListing); // Only vendor can delete listing (unless admin too)

// Get listings for a vendor
router.route('/vendor').get(protect, vendor, getVendorListings);

module.exports = router;
