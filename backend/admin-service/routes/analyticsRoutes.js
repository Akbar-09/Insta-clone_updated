const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.get('/countries', authorizePermissions(['analytics:read']), analyticsController.getRegionalStats);
router.get('/active-hours', authorizePermissions(['analytics:read']), analyticsController.getActiveHours);

module.exports = router;
