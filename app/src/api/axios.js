import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5175/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token & Normalize URL
api.interceptors.request.use(
    (config) => {
        // Automatically remove leading slash from URL to ensure it appends to baseURL
        if (config.url && config.url.startsWith('/')) {
            config.url = config.url.substring(1);
        }

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors (e.g., 401 Logout)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Optional: Redirect to login or dispatch a global event
            window.location.href = '/login'; // Force redirect to login
        }
        return Promise.reject(error);
    }
);

export default api;
