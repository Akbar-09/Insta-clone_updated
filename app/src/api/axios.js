import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1/',
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

// Track in-progress requests that should NOT trigger global logout on 401
// e.g. delete, put, patch — failing these doesn't mean the user is logged out
const SAFE_LOGOUT_METHODS = ['get'];
// Core auth routes — if these 401, the session is definitely invalid
const CORE_AUTH_ROUTES = ['/auth/me', 'auth/me', '/auth/refresh', 'auth/refresh'];

// Response Interceptor: Smart 401 Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const method = error.config?.method?.toLowerCase();
            const url = error.config?.url || '';
            const token = localStorage.getItem('token');

            // Only force logout if:
            // 1. Token is actually missing (genuinely unauthenticated)
            // 2. OR it's a core auth GET endpoint failing (auth/me) - session expired
            const isCorAuthRouteFailure = CORE_AUTH_ROUTES.some(r => url.includes(r));
            const isMissingToken = !token;

            if (isMissingToken || isCorAuthRouteFailure) {
                console.warn('[Axios] Session expired or invalid — redirecting to login');
                localStorage.removeItem('token');
                // Use a small delay so any pending state updates can settle
                setTimeout(() => {
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                }, 100);
            } else {
                // For DELETE, PUT, PATCH — 401 might mean the backend JWT check
                // on the specific service is stricter than gateway. Log and let the
                // caller handle the error gracefully without redirecting to login.
                console.warn(`[Axios] 401 on ${method?.toUpperCase()} ${url} — not logging out (token still valid in localStorage)`);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
