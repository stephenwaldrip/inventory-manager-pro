// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: 6,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
