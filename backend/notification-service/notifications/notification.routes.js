const express = require('express');
const notificationController = require('../notifications/notification.controller');
const pushController = require('../push/push.controller');
const authenticateUser = require('../middleware/auth');

const router = express.Router();

// Push Routes
router.get('/push/key', pushController.getPublicKey);
router.post('/push/subscribe', authenticateUser, pushController.subscribe);

// Notification Routes
router.get('/', authenticateUser, notificationController.getNotifications);
router.get('/unread-count', authenticateUser, notificationController.getUnreadCount);
router.patch('/:id/read', authenticateUser, notificationController.markAsRead);
router.patch('/read-all', authenticateUser, notificationController.markAllAsRead);
router.delete('/clear-all', authenticateUser, notificationController.clearAllNotifications);
router.delete('/:id', authenticateUser, notificationController.deleteNotification);

module.exports = router;

