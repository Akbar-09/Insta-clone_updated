const express = require('express');
const router = express.Router();
const controller = require('../controllers/analyticsAdminController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);
router.use(authorizePermissions(['view_analytics'])); // Ensure this permission is seeded/handled

const analyticsController = require('../controllers/analyticsController');

router.get('/summary', controller.getAnalyticsSummary);
router.get('/user-acquisition', controller.getUserAcquisition);
router.get('/engagement-trends', controller.getEngagementTrends);
router.get('/top-content', controller.getTopContent);

// Legacy/Other Analytics
router.get('/countries', analyticsController.getRegionalStats);
router.get('/active-hours', analyticsController.getActiveHours);

module.exports = router;

