const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// All routes require admin authentication
router.use(authenticateAdmin);

// Report statistics
router.get('/stats', reportController.getReportStats);

// List reports with filtering
router.get('/', reportController.listReports);

// Get specific report details
router.get('/:id', reportController.getReportById);

// Report actions
router.post('/:id/ignore', reportController.ignoreReport);
router.post('/:id/ban-user', reportController.banUserFromReport);

module.exports = router;
