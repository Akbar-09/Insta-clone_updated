const express = require('express');
const router = express.Router();
const controller = require('../controllers/geoAnalyticsController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);
router.use(authorizePermissions(['view_analytics']));

router.get('/geo-users', controller.getGeoUserDistribution);

module.exports = router;
