const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.get('/kpis', dashboardController.getKPIs);
router.get('/activity-feed', dashboardController.getActivityFeed);
router.get('/user-growth', dashboardController.getUserGrowth);
router.get('/media-distribution', dashboardController.getMediaDistribution);
router.get('/login-methods', dashboardController.getLoginMethods);
router.get('/recent-users', dashboardController.getRecentUsers);
router.get('/recent-posts', dashboardController.getRecentPosts);

module.exports = router;
