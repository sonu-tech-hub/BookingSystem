// server/controllers/unitController.js
const asyncHandler = require('express-async-handler');
const Unit = require('../models/Unit');
const Listing = require('../models/Listing');

// @desc    Create a unit
// @route   POST /api/units
// @access  Private (Vendor)
const createUnit = asyncHandler(async (req, res) => {
  const { listingId, type, capacity, price, availability } = req.body;

  // Check if the listing exists and belongs to the vendor
  const listing = await Listing.findById(listingId);
  if (!listing || listing.vendorId.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Listing not found or unauthorized');
  }

  const unit = await Unit.create({
    listingId,
    type,
    capacity,
    price,
    availability,
  });

  if (unit) {
    res.status(201).json(unit);
  } else {
    res.status(400);
    throw new Error('Invalid unit data');
  }
});

// @desc    Get all units for a listing
// @route   GET /api/units/:listingId
// @access  Public
const getUnitsByListing = asyncHandler(async (req, res) => {
  const units = await Unit.find({ listingId: req.params.listingId });
  res.json(units);
});

// @desc    Get a unit by ID
// @route   GET /api/units/unit/:id
// @access  Public
const getUnitById = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);

  if (unit) {
    res.json(unit);
  } else {
    res.status(404);
    throw new Error('Unit not found');
  }
});

// @desc    Update a unit
// @route   PUT /api/units/unit/:id
// @access  Private (Vendor)
const updateUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  const { type, capacity, price, availability } = req.body;

  if (unit) {
    // Verify the listing belongs to the vendor
    const listing = await Listing.findById(unit.listingId);
    if (!listing || listing.vendorId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Unauthorized to update this unit');
    }

    unit.type = type || unit.type;
    unit.capacity = capacity || unit.capacity;
    unit.price = price || unit.price;
    unit.availability = availability !== undefined ? availability : unit.availability; // Allow toggling availability

    const updatedUnit = await unit.save();
    res.json(updatedUnit);
  } else {
    res.status(404);
    throw new Error('Unit not found');
  }
});

// @desc    Delete a unit
// @route   DELETE /api/units/unit/:id
// @access  Private (Vendor)
const deleteUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);

  if (unit) {
    // Verify the listing belongs to the vendor
    const listing = await Listing.findById(unit.listingId);
    if (!listing || listing.vendorId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Unauthorized to delete this unit');
    }

    await unit.remove();
    res.json({ message: 'Unit removed' });
  } else {
    res.status(404);
    throw new Error('Unit not found');
  }
});

module.exports = {
  createUnit,
  getUnitsByListing,
  getUnitById,
  updateUnit,
  deleteUnit,
};