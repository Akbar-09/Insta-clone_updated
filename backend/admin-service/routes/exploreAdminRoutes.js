const express = require('express');
const router = express.Router();
const controller = require('../controllers/exploreController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);
router.use(authorizePermissions(['explore_control'])); // Assuming 'explore_control' permission exists or is mapped to 'all' for superadmin

// Algorithm Config
router.get('/algorithm', controller.getAlgorithmConfig);
router.patch('/algorithm', controller.updateAlgorithmConfig);

// Trending Topics
router.get('/trending-topics', controller.listTrendingTopics);
router.post('/trending-topics', controller.addTrendingTopic);
router.delete('/trending-topics/:topicId', controller.removeTrendingTopic);

// Analytics
router.get('/category-distribution', controller.getCategoryDistribution);
router.get('/performance-metrics', controller.getPerformanceMetrics);

module.exports = router;
