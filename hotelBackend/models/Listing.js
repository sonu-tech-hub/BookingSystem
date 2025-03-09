// server/models/Listing.js
const mongoose = require('mongoose');

const listingSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['hotel', 'restaurant'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String },
      city: { type: String, required: true },
      state: { type: String },
      zip: { type: String },
    },
    description: {
      type: String,
      required: true,
    },
    facilities: {
      type: [String],
    },
    pricing: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    approved: {
      type: Boolean,
      default: undefined,
    },
  },

  
  {
    timestamps: true,
  }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;