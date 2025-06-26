const Material = require('../models/Material');

// GET /api/materials
const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/materials
const addMaterial = async (req, res) => {
  const { name } = req.body;
  try {
    const newMaterial = new Material({ name });
    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/materials/:id
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    await material.deleteOne();
    res.status(200).json({ message: 'Material deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMaterials,
  addMaterial,
  deleteMaterial,
};
