const express = require('express');
const router = express.Router();
const controller = require('../controllers/dmOversightController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);
router.use(authorizePermissions(['dm_moderation']));

router.get('/conversations', controller.listFlaggedConversations);
router.get('/stats', controller.getOversightStats);
router.get('/conversations/:conversationId/transcript', controller.getTranscript);
router.patch('/conversations/:conversationId/mark-safe', controller.markConversationSafe);
router.post('/conversations/:conversationId/ban-users', controller.banConversationUsers);

module.exports = router;
