// server/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBooking,
  getCustomerBookings,
  getVendorBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController'); // Correct import
const { protect, customer, vendor } = require('../middleware/authMiddleware');

router.route('/').post(protect, customer, createBooking);
router.route('/customer').get(protect, customer, getCustomerBookings);
router.route('/vendor').get(protect, vendor, getVendorBookings);
router
  .route('/:id')
  .get(protect, getBookingById)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

module.exports = router;