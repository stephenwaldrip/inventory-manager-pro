const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load .env
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Create and save a test user
async function createTestUser() {
  try {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    await user.save();
    console.log('User saved:', user);
    mongoose.disconnect();
  } catch (err) {
    console.error('Error saving user:', err.message);
    mongoose.disconnect();
  }
}

createTestUser();
