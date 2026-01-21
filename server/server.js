/**
 * ============================================
 * EXPRESS SERVER - Main Entry Point
 * ============================================
 * 
 * This is the main server file that:
 * 1. Connects to MongoDB Atlas database
 * 2. Sets up Express middleware (CORS, JSON parsing)
 * 3. Mounts API routes
 * 4. Starts the HTTP server
 * 
 * Environment Variables Required:
 * - MONGODB_URI: MongoDB Atlas connection string
 * - PORT: Server port (default: 5000)
 * 
 * @see https://expressjs.com/
 * @see https://mongoosejs.com/
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const bookingsRoutes = require('./routes/bookings');

// Initialize Express app
const app = express();

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// Enable CORS for frontend communication
// This allows the React app to make requests to this server
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL // Add your Vercel URL in environment variables
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Parse JSON request bodies
// This allows us to access req.body for POST requests
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// ============================================
// DATABASE CONNECTION
// ============================================

// MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/appointment-booking';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Exit if database connection fails
    });

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err);
});

// ============================================
// API ROUTES
// ============================================

// Mount bookings routes at /api/bookings
app.use('/api/bookings', bookingsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
  ====================================
  🚀 Server running on port ${PORT}
  📍 API Base URL: http://localhost:${PORT}/api
  ====================================
  `);
});
