// server/routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  searchListings,
  updateListing,
  deleteListing,
  FilterData,
  getListingById
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
  // .get(searchListings)
  // .get(FilterData)
  .put(protect, vendor, updateListing)
  .delete(protect, vendor, deleteListing);
router.route('/filter').get(FilterData);
// router.route('/:id').get(getListingById);
router.get('/search', searchListings);

module.exports = router;