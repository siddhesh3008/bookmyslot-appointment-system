/**
 * ============================================
 * BOOKING FORM COMPONENT
 * ============================================
 * 
 * The main user-facing form for creating appointments.
 * 
 * Features:
 * - All required fields (Name, Email, Phone, Date, Time Slot)
 * - Real-time validation with error messages
 * - Loading state during form submission
 * - Success modal on successful booking
 * - Responsive design for mobile and desktop
 * 
 * How it works:
 * 1. User fills out the form fields
 * 2. Validation runs on blur and on submit
 * 3. Form submits to POST /api/bookings
 * 4. Success modal shows with booking details
 */

import { useState } from 'react';
import api from '../api/config';
import {
    validateBookingForm,
    getTimeSlots
} from '../utils/validation';
import SuccessModal from './SuccessModal';

const BookingForm = () => {
    // Form data state - stores all input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        timeSlot: ''
    });

    // Validation errors state - stores error messages for each field
    const [errors, setErrors] = useState({});

    // Loading state - true during API call
    const [isLoading, setIsLoading] = useState(false);

    // Success modal state
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState(null);

    // Get time slot options
    const timeSlots = getTimeSlots();

    /**
     * Handles input field changes
     * Updates form data and clears any existing error for that field
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    /**
     * Validates a single field when user leaves it (on blur)
     * Provides immediate feedback to the user
     */
    const handleBlur = (e) => {
        const { name } = e.target;
        const fieldErrors = validateBookingForm(formData);

        if (fieldErrors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: fieldErrors[name]
            }));
        }
    };

    /**
     * Handles form submission
     * Validates all fields, calls API, and shows success modal
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate entire form
        const formErrors = validateBookingForm(formData);

        // If there are errors, show them and stop submission
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Start loading
        setIsLoading(true);

        try {
            // Make API call to create booking
            const response = await api.post('/api/bookings', formData);

            if (response.data.success) {
                // Store booking data for modal
                setBookingData(formData);

                // Show success modal
                setShowModal(true);

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    timeSlot: ''
                });
                setErrors({});
            }
        } catch (error) {
            // Handle API errors
            const message = error.response?.data?.message || 'Something went wrong. Please try again.';
            setErrors({ submit: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Form Container */}
            <div className="glass-card rounded-2xl p-8 md:p-10 max-w-xl mx-auto">
                {/* Form Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Book Your Appointment
                    </h2>
                    <p className="text-gray-500">
                        Fill in the details below to schedule your slot
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none form-input ${errors.name
                                ? 'border-red-300 focus:border-red-500 bg-red-50'
                                : 'border-gray-200 focus:border-lime-600 bg-white'
                                }`}
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="you@example.com"
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none form-input ${errors.email
                                ? 'border-red-300 focus:border-red-500 bg-red-50'
                                : 'border-gray-200 focus:border-lime-600 bg-white'
                                }`}
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="9876543210"
                            maxLength={10}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none form-input ${errors.phone
                                ? 'border-red-300 focus:border-red-500 bg-red-50'
                                : 'border-gray-200 focus:border-lime-600 bg-white'
                                }`}
                        />
                        {errors.phone && (
                            <p className="mt-2 text-sm text-red-500 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Date and Time Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Date Dropdown */}
                        <div>
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Appointment Date *
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                min="2026-02-01"
                                max="2026-02-28"
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none cursor-pointer ${errors.date
                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                    : 'border-gray-200 focus:border-lime-600 bg-white'
                                    }`}
                            />
                            {errors.date && (
                                <p className="mt-2 text-sm text-red-500 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        {/* Time Slot Dropdown */}
                        <div>
                            <label
                                htmlFor="timeSlot"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Time Slot *
                            </label>
                            <select
                                id="timeSlot"
                                name="timeSlot"
                                value={formData.timeSlot}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none appearance-none cursor-pointer ${errors.timeSlot
                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                    : 'border-gray-200 focus:border-lime-600 bg-white'
                                    }`}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1rem center',
                                    backgroundSize: '1.5rem'
                                }}
                            >
                                <option value="">Select a time</option>
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                            {errors.timeSlot && (
                                <p className="mt-2 text-sm text-red-500 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.timeSlot}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Error Message */}
                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-red-600">{errors.submit}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-6 rounded-xl text-white font-semibold text-lg btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="w-5 h-5 mr-2 spinner" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Booking...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book Appointment
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                bookingData={bookingData}
            />
        </>
    );
};

export default BookingForm;
