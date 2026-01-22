const express = require('express');
const { getNotifications, markRead, markAllRead, getUnreadCount } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/:id/read', markRead);
router.patch('/read-all', markAllRead);

module.exports = router;
