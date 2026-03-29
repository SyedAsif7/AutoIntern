import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import rateLimit from 'express-rate-limit';

// Routes
import aiRoutes from './routes/aiRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

// Utils
import { startDailyReminders } from './utils/cronJobs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// AI Rate Limiter (10 calls/hour)
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many AI requests. Please try again in an hour.' },
});

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/autointern')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start cron jobs
    startDailyReminders();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), version: '1.0.0' });
});

// Routes
app.use('/api/ai', aiLimiter, aiRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/enrollments', reportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/courses', courseRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('AutoIntern API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
