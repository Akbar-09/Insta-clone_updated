const express = require('express');
const router = express.Router();
const monitoringController = require('../controllers/monitoringController');
// const { protect, adminOnly } = require('../middleware/authMiddleware'); // Optional: Add protection if needed

router.get('/statuses', monitoringController.getServiceStatuses);
router.get('/logs/:serviceName/:type', monitoringController.getServiceLogs);

module.exports = router;
