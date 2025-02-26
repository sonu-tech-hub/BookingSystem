// server/routes/unitRoutes.js
const express = require('express');
const router = express.Router();
const {
  createUnit,
  getUnitsByListing,
  getUnitById,
  updateUnit,
  deleteUnit,
} = require('../controllers/unitController');
const { protect, vendor } = require('../middleware/authMiddleware');

router.route('/').post(protect, vendor, createUnit);
router.route('/:listingId').get(getUnitsByListing);
router
  .route('/unit/:id')
  .get(getUnitById)
  .put(protect, vendor, updateUnit)
  .delete(protect, vendor, deleteUnit);

module.exports = router;