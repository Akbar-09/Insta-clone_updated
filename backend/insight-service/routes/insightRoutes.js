const express = require('express');
const insightController = require('../controllers/insightController');
const router = express.Router();

router.get('/account', insightController.getAccountInsights);
router.get('/content', insightController.getContentInsights);
router.get('/heatmap', insightController.getFollowerHeatmap);

module.exports = router;
