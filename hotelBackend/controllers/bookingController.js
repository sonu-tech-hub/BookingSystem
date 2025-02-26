// server/controllers/bookingController.js
const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const Unit = require('../models/Unit');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private (Customer)
const createBooking = asyncHandler(async (req, res) => {
  const { listingId, unitId, bookingDates, bookingTime } = req.body;
  const customerId = req.user._id; // Assuming req.user is set by auth middleware

  // Check if the listing and unit exist
  const listing = await Listing.findById(listingId);
  const unit = await Unit.findById(unitId);
  if (!listing ||!unit) {
    res.status(404);
    throw new Error('Listing or unit not found');
  }

  // Basic availability check (replace with more robust logic if needed)
  if (!unit.availability) {
    res.status(400);
    throw new Error('Unit is not available');
  }

  const booking = await Booking.create({
    customerId,
    listingId,
    unitId,
    bookingDates,
    bookingTime,
  });

  if (booking) {
    res.status(201).json(booking);
  } else {
    res.status(400);
    throw new Error('Invalid booking data');
  }
});

// @desc    Get all bookings for a customer
// @route   GET /api/bookings/customer
// @access  Private (Customer)
const getCustomerBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ customerId: req.user._id });
  res.json(bookings);
});

// @desc    Get all bookings for a vendor
// @route   GET /api/bookings/vendor
// @access  Private (Vendor)
const getVendorBookings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ vendorId: req.user._id });
  const listingIds = listings.map((listing) => listing._id);
  const bookings = await Booking.find({ listingId: { $in: listingIds } });
  res.json(bookings);
});

// @desc    Get a booking by ID
// @route   GET /api/bookings/:id
// @access  Private (Customer/Vendor)
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    // Check if the booking belongs to the customer or vendor
    if (
      booking.customerId.toString() === req.user._id.toString() ||
      (await Listing.findOne({ _id: booking.listingId, vendorId: req.user._id }))
    ) {
      res.json(booking);
    } else {
      res.status(401);
      throw new Error('Unauthorized to access this booking');
    }
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Update a booking
// @route   PUT /api/bookings/:id
// @access  Private (Customer/Vendor)
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  const { bookingDates, bookingTime, status } = req.body;

  if (booking) {
    // Check if the booking belongs to the customer or vendor
    if (
      booking.customerId.toString() === req.user._id.toString() ||
      (await Listing.findOne({ _id: booking.listingId, vendorId: req.user._id }))
    ) {
      booking.bookingDates = bookingDates || booking.bookingDates;
      booking.bookingTime = bookingTime || booking.bookingTime;
      booking.status = status || booking.status;

      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(401);
      throw new Error('Unauthorized to update this booking');
    }
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private (Customer/Vendor)
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    // Check if the booking belongs to the customer or vendor
    if (
      booking.customerId.toString() === req.user._id.toString() ||
      (await Listing.findOne({ _id: booking.listingId, vendorId: req.user._id }))
    ) {
      await booking.remove();
      res.json({ message: 'Booking removed' });
    } else {
      res.status(401);
      throw new Error('Unauthorized to delete this booking');
    }
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

module.exports = {
  createBooking,
  getCustomerBookings,
  getVendorBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};