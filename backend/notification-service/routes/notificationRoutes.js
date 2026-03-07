const express = require('express');
const authenticateUser = require('../middleware/auth');
const pushController = require('../push/push.controller');
const {
    getNotifications,
    markRead,
    markAllRead,
    getUnreadCount,
    getSettings,
    updateSettings
} = require('../controllers/notificationController');

const router = express.Router();

// Push Routes
router.get('/push/key', pushController.getPublicKey);
router.post('/push/subscribe', authenticateUser, pushController.subscribe);

// Notification preferences
router.get('/settings', authenticateUser, getSettings);
router.patch('/settings', authenticateUser, updateSettings);

// Notifications interact
router.get('/', authenticateUser, getNotifications);
router.get('/unread-count', authenticateUser, getUnreadCount);
router.patch('/:id/read', authenticateUser, markRead);
router.patch('/read-all', authenticateUser, markAllRead);

// Admin Routes
const { createBroadcast, getHistory, getStats } = require('../controllers/adminNotificationController');
router.post('/admin/broadcast', createBroadcast);
router.get('/admin/history', getHistory);
router.get('/admin/stats', getStats);

module.exports = router;
