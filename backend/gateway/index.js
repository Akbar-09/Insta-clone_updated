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
const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger/swaggerConfig');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'API Gateway' });
});

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Increase limit for development/testing
    message: { status: 'error', message: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Auth Middleware
const authenticateToken = (req, res, next) => {
    // Skip auth for login/signup
    const openPaths = [
        '/api/v1/auth/login',
        '/api/v1/auth/signup',
        '/api/v1/auth/register',
        '/api/v1/admin/auth/login',
        '/api/v1/admin/',
        '/health',
        '/api-docs',
        '/uploads',
        '/socket.io',
        '/api/v1/socket.io',
        '/api/v1/ads/active' // Ads are public
    ];

    // Check if path starts with any open path
    if (openPaths.some(path => req.path.startsWith(path))) {
        return next();
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Access Denied: No Token Provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ status: 'error', message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Apply Auth Middleware globally
app.use(authenticateToken);

// Unified Response Wrapper (Simplified Interceptor)
// Note: Proxying streams makes full response interception complex. 
// For now, we assume services return JSON. If we really need unification, 
// we rely on services or use a transformation handler.
// Here we verify forwarding and Auth primarily.

// Service Routes Mapping
const services = [
    { route: '/auth', target: process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:5001' },
    { route: '/users', target: process.env.USER_SERVICE_URL || 'http://127.0.0.1:5002' },
    { route: '/posts', target: process.env.POST_SERVICE_URL || 'http://127.0.0.1:5003' },
    { route: '/stories', target: process.env.STORY_SERVICE_URL || 'http://127.0.0.1:5004' },
    { route: '/comments', target: process.env.COMMENT_SERVICE_URL || 'http://127.0.0.1:5006' },
    { route: '/feed', target: process.env.FEED_SERVICE_URL || 'http://127.0.0.1:5007' },
    { route: '/notifications', target: process.env.NOTIFICATION_SERVICE_URL || 'http://127.0.0.1:5008' },
    { route: '/search', target: process.env.SEARCH_SERVICE_URL || 'http://127.0.0.1:5009' },
    { route: '/messages', target: process.env.MESSAGE_SERVICE_URL || 'http://127.0.0.1:5010' },
    { route: '/reels', target: process.env.REEL_SERVICE_URL || 'http://127.0.0.1:5005' },
    { route: '/media', target: process.env.MEDIA_SERVICE_URL || 'http://127.0.0.1:5013' },
    { route: '/ads', target: process.env.AD_SERVICE_URL || 'http://127.0.0.1:5014' },
    { route: '/live', target: process.env.LIVE_SERVICE_URL || 'http://127.0.0.1:5015' },
    { route: '/admin', target: process.env.ADMIN_SERVICE_URL || 'http://127.0.0.1:5016' },
    { route: '/socket.io', target: process.env.SOCKET_SERVICE_URL || 'http://127.0.0.1:5011', ws: true },
];

console.log('Gateway Services Config:', services);

// Proxy Setup
// Proxy Setup
services.forEach(({ route, target, ws }) => {
    app.use(
        `/api/v1${route}`,
        createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: ws || false, // Enable Websockets if specified
            pathRewrite: {
                [`^/api/v1${route}`]: '', // Remove /api/v1/servicePrefix
            },
            onProxyReq: (proxyReq, req, res) => {
                if (req.user) {
                    proxyReq.setHeader('x-user-id', req.user.id || req.user.userId);
                    // Also pass username if needed
                    if (req.user.username) {
                        proxyReq.setHeader('x-user-username', req.user.username);
                    }
                }
            },
            onError: (err, req, res) => {
                console.error(`Error proxying to ${target}:`, err);
                if (!res.headersSent) {
                    res.status(503).json({ status: 'error', message: 'Service Unavailable' });
                }
            }
        })
    );
});

// Proxy for Socket.io (Root Level)
app.use(
    '/socket.io',
    createProxyMiddleware({
        target: process.env.SOCKET_SERVICE_URL || 'http://127.0.0.1:5011',
        changeOrigin: true,
        ws: true,
        onError: (err, req, res) => {
            console.error(`Error proxying socket.io:`, err);
        }
    })
);

// Proxy for Static Uploads (Media Service)
app.use(
    '/uploads',
    createProxyMiddleware({
        target: process.env.MEDIA_SERVICE_URL || 'http://127.0.0.1:5013',
        changeOrigin: true,
        onError: (err, req, res) => {
            console.error(`Error proxying uploads:`, err);
            res.status(404).send('Not Found');
        }
    })
);

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
