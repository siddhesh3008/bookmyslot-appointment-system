/**
 * ============================================
 * ADMIN PAGE COMPONENT
 * ============================================
 * 
 * The admin page that handles:
 * - Login/authentication state
 * - Displaying login form or dashboard based on auth state
 * 
 * This component acts as a container that switches between
 * AdminLogin and AdminDashboard components based on whether
 * the admin is authenticated.
 * 
 * Authentication is stored in sessionStorage for simplicity.
 * In production, this would use proper JWT/session auth.
 */

import { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage = () => {
    // Authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check session storage on component mount
    useEffect(() => {
        const loggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    /**
     * Handles successful login
     */
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    /**
     * Handles logout
     */
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {isLoggedIn ? (
                <AdminDashboard onLogout={handleLogout} />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
        </div>
    );
};

export default AdminPage;
