const express = require('express');
const router = express.Router();

const {
  getMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} = require('../controllers/materialsController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// GET all materials, POST a new material
router.route('/')
  .get(protect, getMaterials)
  .post(protect, createMaterial);

// GET by ID, PUT to update, DELETE with admin only
router.route('/:id')
  .get(protect, getMaterialById)
  .put(protect, updateMaterial)
  .delete(protect, adminOnly, deleteMaterial);

module.exports = router;
