const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/adminNotificationController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.post('/global', authorizePermissions(['notifications:write']), notificationController.sendGlobalNotification);
router.get('/history', authorizePermissions(['notifications:read']), notificationController.getNotificationHistory);

module.exports = router;
