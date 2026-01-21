/**
 * ============================================
 * ADMIN DASHBOARD COMPONENT
 * ============================================
 * 
 * The main admin dashboard that displays:
 * - Total bookings count
 * - Search functionality
 * - Export to Excel button
 * - Clear All Records button
 * - Bookings data table with delete functionality
 * - Logout button
 * 
 * This component fetches bookings from the API and
 * manages the admin dashboard state.
 * 
 * Props:
 * - onLogout: Function to call when logging out
 */

import { useState, useEffect } from 'react';
import api from '../api/config';
import BookingsTable from './BookingsTable';

const AdminDashboard = ({ onLogout }) => {
    // Bookings data state
    const [bookings, setBookings] = useState([]);

    // Loading state for initial data fetch
    const [isLoading, setIsLoading] = useState(true);

    // Error state
    const [error, setError] = useState('');

    // Search term state
    const [searchTerm, setSearchTerm] = useState('');

    // Export loading state
    const [isExporting, setIsExporting] = useState(false);

    // Clear all loading state
    const [isClearing, setIsClearing] = useState(false);

    /**
     * Fetches all bookings from the API
     */
    const fetchBookings = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/api/bookings');

            if (response.data.success) {
                setBookings(response.data.data);
            }
        } catch (err) {
            setError('Failed to load bookings. Please try again.');
            console.error('Error fetching bookings:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch bookings on component mount
    useEffect(() => {
        fetchBookings();
    }, []);

    /**
     * Handles Excel export
     * Downloads the file directly from the API
     */
    const handleExport = async () => {
        try {
            setIsExporting(true);

            // Make request with blob response type for file download
            const response = await api.get('/api/bookings/export', {
                responseType: 'blob'
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `bookings_${Date.now()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            alert('Failed to export data. Please try again.');
            console.error('Error exporting:', err);
        } finally {
            setIsExporting(false);
        }
    };

    /**
     * Handles clearing all records
     * NOTE: Functionality disabled but code kept for future use
     */
    // const handleClearAll = async () => {
    //     if (!window.confirm('Are you sure you want to delete ALL bookings? This action cannot be undone!')) {
    //         return;
    //     }

    //     try {
    //         setIsClearing(true);
    //         const response = await axios.delete('/api/bookings');

    //         if (response.data.success) {
    //             setBookings([]);
    //             alert('All bookings have been deleted successfully.');
    //         }
    //     } catch (err) {
    //         alert('Failed to clear records. Please try again.');
    //         console.error('Error clearing:', err);
    //     } finally {
    //         setIsClearing(false);
    //     }
    // };

    /**
     * Handles logout
     */
    const handleLogout = () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        onLogout();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-500">
                                Manage and view all appointment bookings
                            </p>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Bookings */}
                        <div className="flex items-center">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {isLoading ? '...' : bookings.length}
                                </p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by name, email, phone, date..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-lime-600 outline-none transition-colors"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                            {searchTerm ? (
                                <>Showing results for "<span className="font-medium text-gray-700">{searchTerm}</span>"</>
                            ) : (
                                <>Showing all {bookings.length} bookings</>
                            )}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {/* Refresh Button */}
                            <button
                                onClick={fetchBookings}
                                disabled={isLoading}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                <svg className={`w-4 h-4 mr-2 ${isLoading ? 'spinner' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </button>

                            {/* Clear All Button - DISABLED but code kept for future use
                            <button
                                onClick={handleClearAll}
                                disabled={isClearing || bookings.length === 0}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-lg hover:from-red-600 hover:to-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {isClearing ? (
                                    <>
                                        <svg className="w-4 h-4 mr-2 spinner" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Clearing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Clear All
                                    </>
                                )}
                            </button>
                            */}

                            {/* Export Button */}
                            <button
                                onClick={handleExport}
                                disabled={isExporting || bookings.length === 0}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:opacity-90"
                                style={{ background: 'linear-gradient(135deg, #304352 0%, #0f9b0f 100%)' }}
                            >
                                {isExporting ? (
                                    <>
                                        <svg className="w-4 h-4 mr-2 spinner" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Export to Excel
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-red-600">{error}</p>
                        <button
                            onClick={fetchBookings}
                            className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <svg className="w-12 h-12 mx-auto spinner" style={{ color: '#30cfd0' }} fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="mt-4 text-gray-500">Loading bookings...</p>
                    </div>
                ) : (
                    /* Bookings Table */
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <BookingsTable
                            bookings={bookings}
                            searchTerm={searchTerm}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
