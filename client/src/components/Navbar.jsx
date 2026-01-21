/**
 * ============================================
 * NAVBAR COMPONENT
 * ============================================
 * 
 * A responsive navigation bar that:
 * - Shows the app logo/title
 * - Provides navigation links (Home, Admin)
 * - Has a mobile-friendly hamburger menu
 * 
 * Used on all pages for consistent navigation.
 * 
 * Theme Colors: Earthy Green (#30cfd0, #330867)
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    // Track mobile menu state
    const [isOpen, setIsOpen] = useState(false);

    // Get current route to highlight active link
    const location = useLocation();

    // Check if a link is currently active
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            {/* Calendar Icon */}
                            <svg
                                className="w-8 h-8"
                                style={{ color: '#330867' }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span
                                className="text-xl font-bold"
                                style={{
                                    background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                BookMySlot
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive('/')
                                ? 'bg-green-50'
                                : 'text-gray-600 hover:bg-green-50'
                                }`}
                            style={isActive('/') ? { color: '#330867' } : {}}
                        >
                            Book Appointment
                        </Link>
                        <Link
                            to="/admin"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive('/admin')
                                ? 'bg-green-50'
                                : 'text-gray-600 hover:bg-green-50'
                                }`}
                            style={isActive('/admin') ? { color: '#330867' } : {}}
                        >
                            Admin Panel
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-inset"
                            style={{ '--tw-ring-color': '#30cfd0' }}
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            {!isOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')
                                ? 'bg-green-50'
                                : 'text-gray-600 hover:bg-green-50'
                                }`}
                            style={isActive('/') ? { color: '#330867' } : {}}
                        >
                            Book Appointment
                        </Link>
                        <Link
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin')
                                ? 'bg-green-50'
                                : 'text-gray-600 hover:bg-green-50'
                                }`}
                            style={isActive('/admin') ? { color: '#330867' } : {}}
                        >
                            Admin Panel
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
