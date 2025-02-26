// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { createReview, getReviewsByListing } = require('../controllers/reviewController');
const { protect, customer } = require('../middleware/authMiddleware');

router.route('/').post(protect, customer, createReview);
router.route('/:listingId').get(getReviewsByListing);

module.exports = router;