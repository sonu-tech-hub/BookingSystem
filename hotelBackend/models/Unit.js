// server/models/Unit.js
const mongoose = require('mongoose');

const unitSchema = mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Listing',
    },
    type: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;