const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a material name'],
    },
    type: {
      type: String,
      required: [true, 'Please specify a type'],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    location: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Material', materialSchema);
