// server/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Listing',
    },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Unit',
    },
    bookingDates: {
      type: [Date],
    },
    bookingTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    paymentDetails: {
      type: Object, // Dummy payment data
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;