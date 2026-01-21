/**
 * ============================================
 * ADMIN LOGIN COMPONENT
 * ============================================
 * 
 * A simple username/password login form for admin access.
 * 
 * Features:
 * - Username and password fields
 * - Password visibility toggle
 * - Error handling with user feedback
 * - Session storage for login persistence
 * - Clean, professional design
 * 
 * Credentials: admin / admin123
 */

import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
    // Form state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Error message state
    const [error, setError] = useState('');

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Admin credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    /**
     * Handles form submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API delay
        setTimeout(() => {
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                sessionStorage.setItem('isAdminLoggedIn', 'true');
                onLogin();
            } else {
                setError('Invalid username or password');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="glass-card rounded-2xl p-8 md:p-10 max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    {/* Lock Icon */}
                    <div
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}
                    >
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Admin Login
                    </h2>
                    <p className="text-gray-500">
                        Sign in to access the dashboard
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username Field */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter username"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 bg-white transition-all duration-200 outline-none"
                            autoComplete="username"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter password"
                                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-cyan-500 bg-white transition-all duration-200 outline-none"
                                autoComplete="current-password"
                            />
                            {/* Toggle Password Visibility */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-xl">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-red-600">{error}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading || !username || !password}
                        className="w-full py-3 px-6 rounded-xl text-white font-semibold btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-6"
                    >
                        {isLoading ? (
                            <>
                                <svg className="w-5 h-5 mr-2 spinner" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-400 text-xs mt-6">
                    Secure admin access for authorized personnel only.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
