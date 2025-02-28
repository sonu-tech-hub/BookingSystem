// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { createReview, getReviewsByListing,getReviewsByCustomer } = require('../controllers/reviewController');
const { protect, customer } = require('../middleware/authMiddleware');

router.route('/').post(protect, customer, createReview);
router.route('/customer').get(protect, customer, getReviewsByCustomer); // Add new route
router.route('/:listingId').get(getReviewsByListing);

module.exports = router;