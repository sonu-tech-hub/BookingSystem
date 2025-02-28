// server/controllers/listingController.js
const asyncHandler = require('express-async-handler');
const Listing = require('../models/Listing');
// const cloudinary = require('../config/cloudinary');
const { configureCloudinary, cloudinary } = require('../config/cloudinary');
configureCloudinary();



// @desc    Create a listing
// @route   POST /api/listings
// @access  Private (Vendor)
const createListing = asyncHandler(async (req, res) => {
  const { name, type, address, description, facilities, pricing, images } = req.body;
  const vendorId = req.user._id; // Assuming req.user is set by auth middleware

  let uploadedImages = [];
  if (images && images.length > 0) {
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'listings',
      });
      uploadedImages.push(result.secure_url);
    }
  }

  const listing = await Listing.create({
    vendorId,
    name,
    type,
    address,
    description,
    facilities,
    pricing,
    images: uploadedImages,
  });

  if (listing) {
    res.status(201).json(listing);
  } else {
    res.status(400);
    throw new Error('Invalid listing data');
  }
});

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
});

// @desc    Get a listing by ID
// @route   GET /api/listings/:id
// @access  Public
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    res.json(listing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc    Search listings by name
// @route   GET /api/listings/search
// @access  Public
const searchListings = asyncHandler(async (req, res) => {
  console.log("this is the result",req.query);
  
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const listings = await Listing.find({
      name: { $regex: query, $options: 'i' }, // Case-insensitive search
    });
    res.json(listings);
  } catch (error) {
    res.status(500);
    console.error("Error searching listings:", error); 
    throw new Error('Error searching listings');
  }
});
 
//  accecc dat basic of location and price and rating and 
const FilterData = asyncHandler(async (req, res) => {
  const { location, minPrice } = req.query; // Only location and minPrice

 

  let filter = {};

  if (location) {
    filter['address.city'] = { $regex: location, $options: 'i' };
  }

  if (minPrice) {
    if (!isNaN(minPrice)) {
      filter.pricing = { $gte: Number(minPrice) };
    } else {
      return res.status(400).json({ message: "Invalid minPrice value" });
    }
  }


  

  try {
    const listings = await Listing.find(filter);
    res.json(listings);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Database error occurred." });
  }
});


// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private (Vendor)
const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  const { name, type, address, description, facilities, pricing, images } = req.body;

  if (listing && listing.vendorId.toString() === req.user._id.toString()) {
    listing.name = name || listing.name;
    listing.type = type || listing.type;
    listing.address = address || listing.address;
    listing.description = description || listing.description;
    listing.facilities = facilities || listing.facilities;
    listing.pricing = pricing || listing.pricing;

    if (images && images.length > 0) {
      let uploadedImages = [];
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image, {
          folder: 'listings',
        });
        uploadedImages.push(result.secure_url);
      }
      listing.images = uploadedImages;
    }

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } else {
    res.status(404);
    throw new Error('Listing not found or unauthorized');
  }
});

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private (Vendor)
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing && listing.vendorId.toString() === req.user._id.toString()) {
    await listing.remove();
    res.json({ message: 'Listing removed' });
  } else {
    res.status(404);
    throw new Error('Listing not found or unauthorized');
  }
});

module.exports = {
  createListing,
  getListings,
  searchListings,
  updateListing,
  deleteListing,
  FilterData,
  getListingById
};