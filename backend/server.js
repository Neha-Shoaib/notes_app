import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'https://memos-notes-app.netlify.app', 
    'http://localhost:5173',              
    'http://localhost:5000'                
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend server is running successfully!'
  });
});

app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to Atlas DB first
    await connectDB();
    
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server executing seamlessly on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Server bootup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();