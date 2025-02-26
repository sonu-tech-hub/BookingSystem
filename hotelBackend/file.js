const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// MongoDB connection (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/hotelListings', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for listing
const listingSchema = new mongoose.Schema({
  propertyName: String,
  address: String,
  contact: String,
  description: String,
  pricing: String,
  roomTypes: String,
  availability: String,
  images: [String],
});

const Listing = mongoose.model('Listing', listingSchema);

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { files: 10 } });

// API route to handle listing submissions
app.post('/api/listings', upload.array('images', 10), async (req, res) => {
  try {
    const { propertyName, address, contact, description, pricing, roomTypes, availability } = req.body;
    const images = req.files.map((file) => file.path);

    const newListing = new Listing({
      propertyName,
      address,
      contact,
      description,
      pricing,
      roomTypes,
      availability,
      images,
    });

    await newListing.save();
    res.status(200).json({ message: 'Listing added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add listing' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
