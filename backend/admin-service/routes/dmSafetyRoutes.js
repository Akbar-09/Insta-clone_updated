const express = require('express');
const router = express.Router();
const dmController = require('../controllers/dmSafetyController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.get('/reported', authorizePermissions(['messages:read']), dmController.getReportedMessages);
router.patch('/:conversationId/flag', authorizePermissions(['messages:write']), dmController.flagConversation);

module.exports = router;
