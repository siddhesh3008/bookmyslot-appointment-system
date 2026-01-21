/**
 * ============================================
 * BOOKING MODEL - MongoDB Schema Definition
 * ============================================
 * 
 * This file defines the database schema for appointment bookings.
 * It uses Mongoose ODM to interact with MongoDB Atlas.
 * 
 * Schema Fields:
 * - name: Customer's full name
 * - email: Customer's email address (for confirmation)
 * - phone: Contact phone number
 * - date: Selected appointment date (February 2026)
 * - timeSlot: Selected 1-hour time slot
 * - createdAt: Timestamp when booking was created
 * 
 * @see https://mongoosejs.com/docs/guide.html
 */

const mongoose = require('mongoose');

// Define the booking schema with validation rules
const bookingSchema = new mongoose.Schema({
    // Customer's full name - required field
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },

    // Customer's email - required with format validation
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },

    // Phone number - required with basic validation
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        minlength: [10, 'Phone number must be at least 10 digits']
    },

    // Appointment date - formatted as "February X, 2026"
    date: {
        type: String,
        required: [true, 'Appointment date is required']
    },

    // Time slot - formatted as "10:00 AM - 11:00 AM"
    timeSlot: {
        type: String,
        required: [true, 'Time slot is required']
    },

    // Auto-generated timestamp for when booking was created
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Booking model
// MongoDB will create a 'bookings' collection automatically
module.exports = mongoose.model('Booking', bookingSchema);
