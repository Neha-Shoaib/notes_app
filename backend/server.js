import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import connectDB from './config/db.js';


// 1. MUST BE INITIALIZED FIRST BEFORE ALL ROUTERS READ ENVIRONMENT POOLS
dotenv.config();

const app = express();

// 2. Clear out CORS blocks for localized cross-port traffic
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes)

// Fix: Add a root route so hitting http://localhost:5000/ doesn't throw a 404
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend server is running successfully!'
  });
});

// Fallback 404 Error handler Route
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// Main Error Boundary Interceptor middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// IMPORTANT: connect DB before starting the server so registration/login can work.
await connectDB();

app.listen(PORT, () => console.log(`🚀 Server executing on port ${PORT}`));