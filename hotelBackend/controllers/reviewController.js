// server/controllers/reviewController.js
const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private (Customer)
const createReview = asyncHandler(async (req, res) => {
  const { bookingId, rating, comments } = req.body;
  const customerId = req.user._id;
  
  
  

  // Check if the booking exists and belongs to the customer
  const booking = await Booking.findById(bookingId);
  if (!booking || booking.customerId.toString() !== customerId.toString()) {
    res.status(404);
    throw new Error('Booking not found or unauthorized');
  }

  const review = await Review.create({
    bookingId,
    customerId,
    rating,
    comments,
  });

  if (review) {
    res.status(201).json(review);
  } else {
    res.status(400);
    throw new Error('Invalid review data');
  }
});
// @desc    Get all reviews for a customer
// @route   GET /api/reviews/customer
// @access  Private (Customer)
const getReviewsByCustomer = asyncHandler(async (req, res) => {
  const customerId = req.user._id;

  const reviews = await Review.find({ customerId });

  res.json(reviews);
});

// @desc    Get all reviews for a listing
// @route   GET /api/reviews/:listingId
// @access  Public
// server/controllers/reviewController.js

const getReviewsByListing = asyncHandler(async (req, res) => {
  const listingId = req.params.listingId;

  // Find all bookings for the listing
  const bookings = await Booking.find({ listingId });

  // Extract booking IDs
  const bookingIds = bookings.map((booking) => booking._id);

  // Find reviews for those booking IDs and populate customerId field with name
  const reviews = await Review.find({ bookingId: { $in: bookingIds } })
    .populate('customerId', 'name');  // Populate the customerId field with the 'name' field

  res.json(reviews);
});



module.exports = {
  createReview,
  getReviewsByListing,
  getReviewsByCustomer
};