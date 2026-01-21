/**
 * ============================================
 * VALIDATION UTILITIES
 * ============================================
 * 
 * This file contains helper functions for form validation.
 * These are used by the BookingForm component to validate
 * user input in real-time before submission.
 * 
 * Why separate validation file?
 * - Keeps form components clean and focused
 * - Makes validation logic reusable
 * - Easy to test and modify validation rules
 */

/**
 * Validates email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
    // RFC 5322 compliant email regex (simplified version)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates phone number format
 * Requires exactly 10 digits (Indian mobile format, no country code)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if exactly 10 digits
 */
export const validatePhone = (phone) => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Phone should have exactly 10 digits
    return digitsOnly.length === 10;
};

/**
 * Validates that a field is not empty
 * @param {string} value - Value to check
 * @returns {boolean} - True if value is not empty
 */
export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

/**
 * Validates entire booking form and returns error messages
 * @param {Object} formData - Object containing all form fields
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export const validateBookingForm = (formData) => {
    const errors = {};

    // Validate Name
    if (!validateRequired(formData.name)) {
        errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    // Validate Email
    if (!validateRequired(formData.email)) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Validate Phone
    if (!validateRequired(formData.phone)) {
        errors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
        errors.phone = 'Please enter exactly 10 digits';
    }

    // Validate Date
    if (!validateRequired(formData.date)) {
        errors.date = 'Please select a date';
    }

    // Validate Time Slot
    if (!validateRequired(formData.timeSlot)) {
        errors.timeSlot = 'Please select a time slot';
    }

    return errors;
};

/**
 * Generates available dates for February 2026
 * @returns {Array} - Array of date strings formatted as "February X, 2026"
 */
export const getFebruaryDates = () => {
    const dates = [];
    // February 2026 has 28 days (not a leap year)
    for (let day = 1; day <= 28; day++) {
        dates.push(`February ${day}, 2026`);
    }
    return dates;
};

/**
 * Generates available 1-hour time slots (BookMyShow style)
 * @returns {Array} - Array of time slot strings
 */
export const getTimeSlots = () => {
    return [
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 1:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
        '4:00 PM - 5:00 PM',
        '5:00 PM - 6:00 PM'
    ];
};
