// Load env vars first (MONGODB_URI + PORT come from your manual .env file)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cafeRoutes = require('./routes/cafeRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
let dbPromise = null;
function ensureDB() {
  if (!dbPromise) dbPromise = connectDB();
  return dbPromise;
}
app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Cafe Experience Tracker API is running' });
});
app.use('/api/cafes', cafeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

module.exports = app;

if (require.main === module && !process.env.VERCEL) {
  // Connect to MongoDB (Atlas URI from process.env.MONGODB_URI), then start server
  ensureDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err.message);
      process.exit(1);
    });
}
