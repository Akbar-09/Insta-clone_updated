const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.use(authorizePermissions(['report_moderation']));

router.get('/', reportController.getReports);
router.get('/stats', reportController.getReportStats);
router.get('/:reportId', reportController.getReportById);
router.patch('/:reportId/ignore', reportController.ignoreReport);
router.patch('/:reportId/ban-user', reportController.banUserFromReport);


module.exports = router;
