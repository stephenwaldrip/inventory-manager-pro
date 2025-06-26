// server.js

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// ✅ Routes
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locationsRoutes');
const materialsRoutes = require('./routes/materialsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/materials', materialsRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
