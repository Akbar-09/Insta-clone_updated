const express = require('express');
const {
    getNotifications,
    markRead,
    markAllRead,
    getUnreadCount,
    getSettings,
    updateSettings
} = require('../controllers/notificationController');

const router = express.Router();

// Notification preferences
router.get('/settings', getSettings);
router.patch('/settings', updateSettings);

// Notifications interact
router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/:id/read', markRead);
router.patch('/read-all', markAllRead);

// Admin Routes
const { createBroadcast, getHistory, getStats } = require('../controllers/adminNotificationController');
router.post('/admin/broadcast', createBroadcast);
router.get('/admin/history', getHistory);
router.get('/admin/stats', getStats);

module.exports = router;
