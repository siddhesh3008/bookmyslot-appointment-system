import axios from 'axios';

/**
 * API Configuration
 * 
 * In development: Uses Vite proxy (relative URLs like /api/...)
 * In production: Uses VITE_API_URL environment variable
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
