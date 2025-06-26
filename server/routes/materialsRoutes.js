// server/routes/materialsRoutes.js
const express = require('express');
const router = express.Router();
const {
  getMaterials,
  addMaterial,
  deleteMaterial,
} = require('../controllers/materialController');
const protect = require('../middleware/authMiddleware');

// Route definitions
router.get('/', protect, getMaterials);
router.post('/', protect, addMaterial);
router.delete('/:id', protect, deleteMaterial);

module.exports = router;
