/**
 * ============================================
 * BOOKINGS ROUTES - API Endpoints
 * ============================================
 * 
 * This file defines all API endpoints for managing appointments.
 * It handles CRUD operations and Excel export functionality.
 * 
 * Endpoints:
 * - POST /api/bookings     - Create a new booking
 * - GET /api/bookings      - Fetch all bookings (admin)
 * - GET /api/bookings/export - Export bookings to Excel
 * 
 * @see https://expressjs.com/en/guide/routing.html
 */

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const ExcelJS = require('exceljs');

/**
 * POST /api/bookings
 * Creates a new appointment booking
 * 
 * Request Body:
 * {
 *   name: string,
 *   email: string,
 *   phone: string,
 *   date: string,
 *   timeSlot: string
 * }
 * 
 * Response: Created booking object with _id
 */
router.post('/', async (req, res) => {
    try {
        // Extract booking data from request body
        const { name, email, phone, date, timeSlot } = req.body;

        // Validate required fields (additional server-side validation)
        if (!name || !email || !phone || !date || !timeSlot) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Create new booking document
        const newBooking = new Booking({
            name,
            email,
            phone,
            date,
            timeSlot
        });

        // Save to MongoDB
        const savedBooking = await newBooking.save();

        // Return success response with created booking
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: savedBooking
        });

    } catch (error) {
        // Handle validation errors from Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        // Handle other server errors
        console.error('Error creating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * GET /api/bookings
 * Fetches all bookings for admin dashboard
 * 
 * Response: Array of all booking objects, sorted by creation date (newest first)
 */
router.get('/', async (req, res) => {
    try {
        // Fetch all bookings, sorted by newest first
        const bookings = await Booking.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * GET /api/bookings/export
 * Exports all bookings to an Excel (.xlsx) file
 * 
 * Uses ExcelJS library to create a professionally formatted spreadsheet
 * with all booking data for download.
 */
router.get('/export', async (req, res) => {
    try {
        // Fetch all bookings
        const bookings = await Booking.find().sort({ createdAt: -1 });

        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Appointment Booking System';
        workbook.created = new Date();

        // Add a worksheet
        const worksheet = workbook.addWorksheet('Bookings', {
            headerFooter: {
                firstHeader: 'Appointment Bookings Report'
            }
        });

        // Define columns with headers and widths
        worksheet.columns = [
            { header: 'S.No', key: 'sno', width: 8 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Date', key: 'date', width: 20 },
            { header: 'Time Slot', key: 'timeSlot', width: 20 },
            { header: 'Booked On', key: 'createdAt', width: 22 }
        ];

        // Style the header row
        worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '667EEA' }
        };
        worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getRow(1).height = 25;

        // Add booking data to worksheet
        bookings.forEach((booking, index) => {
            worksheet.addRow({
                sno: index + 1,
                name: booking.name,
                email: booking.email,
                phone: booking.phone,
                date: booking.date,
                timeSlot: booking.timeSlot,
                createdAt: new Date(booking.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                })
            });
        });

        // Style data rows with alternating colors
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                row.alignment = { horizontal: 'left', vertical: 'middle' };
                if (rowNumber % 2 === 0) {
                    row.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'F3F4F6' }
                    };
                }
            }
            // Add borders to all cells
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin', color: { argb: 'E5E7EB' } },
                    left: { style: 'thin', color: { argb: 'E5E7EB' } },
                    bottom: { style: 'thin', color: { argb: 'E5E7EB' } },
                    right: { style: 'thin', color: { argb: 'E5E7EB' } }
                };
            });
        });

        // Set response headers for file download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=bookings_${Date.now()}.xlsx`
        );

        // Write workbook to response
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Error exporting bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Error exporting data. Please try again.'
        });
    }
});

/**
 * DELETE /api/bookings/:id
 * Deletes a single booking by ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * DELETE /api/bookings
 * Deletes all bookings (Clear All functionality)
 */
router.delete('/', async (req, res) => {
    try {
        const result = await Booking.deleteMany({});

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} bookings deleted successfully`
        });

    } catch (error) {
        console.error('Error clearing bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

module.exports = router;
