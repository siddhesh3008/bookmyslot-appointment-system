/**
 * ============================================
 * BOOKINGS TABLE COMPONENT
 * ============================================
 * 
 * A data table component that displays all bookings.
 * 
 * Features:
 * - Displays all booking records in a clean table
 * - Search/filter functionality (searches across all fields)
 * - Sort dropdown for easy sorting
 * - Responsive design (horizontal scroll on mobile)
 * - Empty state when no bookings found
 * 
 * Props:
 * - bookings: Array of booking objects to display
 * - searchTerm: Current search filter value
 */

import { useState, useMemo } from 'react';

const BookingsTable = ({ bookings, searchTerm }) => {
    // Sorting state: { field: 'name', direction: 'asc' | 'desc' }
    const [sortConfig, setSortConfig] = useState({
        field: 'createdAt',
        direction: 'desc'
    });

    // Sort options for dropdown
    const sortOptions = [
        { value: 'createdAt-desc', label: 'Newest First' },
        { value: 'createdAt-asc', label: 'Oldest First' },
        { value: 'name-asc', label: 'Name (A-Z)' },
        { value: 'name-desc', label: 'Name (Z-A)' },
        { value: 'date-asc', label: 'Date (Earliest)' },
        { value: 'date-desc', label: 'Date (Latest)' },
    ];

    /**
     * Filter bookings based on search term
     * Searches across name, email, phone, date, and timeSlot
     */
    const filteredBookings = useMemo(() => {
        if (!searchTerm) return bookings;

        const lowerSearch = searchTerm.toLowerCase();
        return bookings.filter(booking =>
            booking.name.toLowerCase().includes(lowerSearch) ||
            booking.email.toLowerCase().includes(lowerSearch) ||
            booking.phone.includes(searchTerm) ||
            booking.date.toLowerCase().includes(lowerSearch) ||
            booking.timeSlot.toLowerCase().includes(lowerSearch)
        );
    }, [bookings, searchTerm]);

    /**
     * Sort filtered bookings based on sort configuration
     */
    const sortedBookings = useMemo(() => {
        const sorted = [...filteredBookings];

        sorted.sort((a, b) => {
            let aValue = a[sortConfig.field];
            let bValue = b[sortConfig.field];

            // Handle date sorting
            if (sortConfig.field === 'createdAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else {
                // String comparison (case-insensitive)
                aValue = aValue?.toLowerCase() || '';
                bValue = bValue?.toLowerCase() || '';
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredBookings, sortConfig]);

    /**
     * Handles sort dropdown change
     */
    const handleSortChange = (e) => {
        const [field, direction] = e.target.value.split('-');
        setSortConfig({ field, direction });
    };

    // Empty state
    if (sortedBookings.length === 0) {
        return (
            <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-500 mb-1">
                    {searchTerm ? 'No bookings found' : 'No bookings yet'}
                </h3>
                <p className="text-gray-400">
                    {searchTerm
                        ? 'Try adjusting your search terms'
                        : 'Bookings will appear here when customers make appointments'}
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Sort Dropdown */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <span className="text-sm text-gray-600">
                    {sortedBookings.length} record{sortedBookings.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
                    <select
                        id="sort"
                        value={`${sortConfig.field}-${sortConfig.direction}`}
                        onChange={handleSortChange}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 cursor-pointer"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Table Header */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                S.No
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Time Slot
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Booked On
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedBookings.map((booking, index) => (
                            <tr
                                key={booking._id}
                                className="table-row-hover transition-colors"
                            >
                                {/* S.No */}
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {index + 1}
                                </td>

                                {/* Name */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
                                            {booking.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {booking.name}
                                        </span>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {booking.email}
                                </td>

                                {/* Phone */}
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {booking.phone}
                                </td>

                                {/* Date */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lime-100 text-lime-800">
                                        {booking.date}
                                    </span>
                                </td>

                                {/* Time Slot */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        {booking.timeSlot}
                                    </span>
                                </td>

                                {/* Booked On */}
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(booking.createdAt).toLocaleString('en-IN', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short'
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingsTable;
