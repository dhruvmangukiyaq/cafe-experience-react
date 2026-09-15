// Load env vars first (MONGODB_URI + PORT come from your manual .env file)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cafeRoutes = require('./routes/cafeRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors()); // allow React dev server to call this API
app.use(express.json()); // parse JSON bodies

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Cafe Experience Tracker API is running' });
});

// All cafe CRUD routes live under /api/cafes
app.use('/api/cafes', cafeRoutes);

// 404 for unknown API routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Central error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB (Atlas URI from process.env.MONGODB_URI), then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
