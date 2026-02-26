const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

app.use(cors());
// Completely disable helmet for local IP access to avoid browser forcing HTTPS and COOP/COEP issues
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=0'); // Clear HSTS if previously set
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
});
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log(`[Gateway] Request: ${req.method} ${req.url}`);
    next();
});

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger/swaggerConfig');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic health check and welcome
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Instagram Clone API Gateway is running',
        docs: '/api-docs',
        health: '/health'
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'API Gateway', timestamp: new Date() });
});

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100000, // Increased for dev, assets and sockets easily consume 1000 requests
    message: { status: 'error', message: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const openPaths = [
        '/api/v1/auth/login',
        '/api/v1/auth/signup',
        '/api/v1/auth/register',
        '/api/v1/auth/reset-password',
        '/api/v1/auth/check-username',
        '/api/v1/auth/check-email',
        '/api/v1/admin/auth/login',
        '/api/v1/admin/',
        '/health',
        '/api-docs',
        '/uploads',
        '/socket.io',
        '/api/v1/socket.io',
        '/api/v1/ads/active',
        '/api/v1/media/files',
        '/api/v1/ads/media',
        // Help Centre Public Routes
        '/api/v1/help/categories',
        '/api/v1/help/category',
        '/api/v1/help/articles',
        '/api/v1/help/article',
        '/api/v1/help/search',
        '/api/v1/help/feedback',
        // Add specific admin debug route just in case
        '/api/v1/admin/health-check'
    ];

    // Root paths that should be open
    const exactOpenPaths = ['/', '/health'];

    const isOpenPath = openPaths.some(path => req.path.startsWith(path)) || exactOpenPaths.includes(req.path);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        if (isOpenPath) return next();
        return res.status(401).json({ status: 'error', message: 'Access Denied: No Token Provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log(`[Gateway] JWT Verify Failed: ${err.message}`);
            if (isOpenPath) return next();
            return res.status(403).json({ status: 'error', message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

app.use(authenticateToken);

// Service Routes Mapping
const services = [
    { route: '/auth', target: process.env.AUTH_SERVICE_URL || 'http://localhost:5001' },
    { route: '/users', target: process.env.USER_SERVICE_URL || 'http://localhost:5002' },
    { route: '/posts', target: process.env.POST_SERVICE_URL || 'http://localhost:5003' },
    { route: '/stories', target: process.env.STORY_SERVICE_URL || 'http://localhost:5004' },
    { route: '/comments', target: process.env.COMMENT_SERVICE_URL || 'http://localhost:5006' },
    { route: '/feed', target: process.env.FEED_SERVICE_URL || 'http://localhost:5007' },
    { route: '/notifications', target: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:5008' },
    { route: '/search', target: process.env.SEARCH_SERVICE_URL || 'http://localhost:5009' },
    { route: '/messages', target: process.env.MESSAGE_SERVICE_URL || 'http://localhost:5010' },
    { route: '/reels', target: process.env.REEL_SERVICE_URL || 'http://localhost:5005' },
    { route: '/media', target: process.env.MEDIA_SERVICE_URL || 'http://localhost:5013' },
    { route: '/ads', target: process.env.AD_SERVICE_URL || 'http://localhost:5014' },
    { route: '/insights', target: process.env.INSIGHT_SERVICE_URL || 'http://127.0.0.1:5017' },
    { route: '/live', target: process.env.LIVE_SERVICE_URL || 'http://localhost:5015' },
    // Ensure 5016 is correct for admin
    { route: '/admin', target: process.env.ADMIN_SERVICE_URL || 'http://localhost:5016' },
    { route: '/help', target: process.env.HELP_SERVICE_URL || 'http://localhost:5060' },
    { route: '/calls', target: process.env.CALL_SERVICE_URL || 'http://localhost:5018' },
    { route: '/socket.io', target: process.env.SOCKET_SERVICE_URL || 'http://localhost:5011', ws: true },
];

console.log('Gateway Services Config Loaded:', services.map(s => s.route).join(', '));

// Proxy Setup
services.forEach(({ route, target, ws }) => {
    // Explicitly mount at /api/v1/ROUTE
    // We rely on app.use stripping the path, so /api/v1/media/foo -> /foo at target.
    // This allows target to mount routes at /foo or / directly.

    app.use(
        `/api/v1${route}`,
        createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: ws || false,
            pathRewrite: { [`^/api/v1${route}`]: '' },
            onProxyReq: (proxyReq, req, res) => {
                if (req.user) {
                    proxyReq.setHeader('x-user-id', String(req.user.id || req.user.userId || ''));
                    if (req.user.username) {
                        proxyReq.setHeader('x-user-username', String(req.user.username || ''));
                    }
                    if (req.user.avatar) {
                        proxyReq.setHeader('x-user-avatar', String(req.user.avatar || ''));
                    }
                }
            },
            onError: (err, req, res) => {
                console.error(`Error proxying to ${target}:`, err.message);
                if (!res.headersSent) {
                    res.status(503).json({ status: 'error', message: 'Service Unavailable' });
                }
            }
        })
    );
});

// Global Error Handler for Gateway
app.use((err, req, res, next) => {
    console.error('[Gateway Global Error]', err);
    if (!res.headersSent) {
        res.status(500).json({ status: 'error', message: 'Internal Gateway Error' });
    }
});

// Proxy for Socket.io (Root Level)
app.use(
    '/socket.io',
    createProxyMiddleware({
        target: process.env.SOCKET_SERVICE_URL || 'http://localhost:5011',
        changeOrigin: true,
        ws: true,
        onError: (err, req, res) => {
            console.error(`Error proxying socket.io:`, err.message);
        }
    })
);

// Proxy for Static Uploads (Media Service)
// Proxy for Static Uploads (Media Service)
app.use(
    createProxyMiddleware('/uploads', {
        target: process.env.MEDIA_SERVICE_URL || 'http://localhost:5013',
        changeOrigin: true,
        onProxyRes: (proxyRes, req, res) => {
            // Add CORS headers to allow cross-origin image loading
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Cross-Origin-Resource-Policy'] = 'cross-origin';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type';
        },
        onError: (err, req, res) => {
            console.error(`Error proxying uploads:`, err.message);
            if (!res.headersSent) {
                res.status(404).send('Not Found');
            }
        }
    })
);

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
