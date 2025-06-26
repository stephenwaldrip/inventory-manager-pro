const express = require('express');
const router = express.Router();
const {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} = require('../controllers/locationsController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Routes
router.route('/')
  .post(protect, createLocation)
  .get(protect, getLocations);

router.route('/:id')
  .get(protect, getLocationById)
  .put(protect, updateLocation)
  .delete(protect, adminOnly, deleteLocation);

module.exports = router;
