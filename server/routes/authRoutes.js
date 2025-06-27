const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { requireAuth } = require('../middleware/authMiddleware');

// Register route
router.post('/register', async (req, res) => {
  try {
    console.log('📥 Received registration:', req.body);
    const { name, username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Login route (optional - if you have one)
// router.post('/login', ...)

module.exports = router;
