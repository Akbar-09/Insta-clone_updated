const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.get('/', authorizePermissions(['audit:read']), auditController.getLogs);

module.exports = router;
