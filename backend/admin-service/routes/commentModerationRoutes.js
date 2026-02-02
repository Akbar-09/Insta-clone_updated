const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentModerationController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);
router.use(authorizePermissions(['comment_moderation']));

router.get('/', controller.listComments);
router.get('/stats', controller.getCommentStats);
router.patch('/:commentId/approve', controller.approveComment);
router.patch('/:commentId/remove', controller.removeComment);
router.delete('/:commentId', controller.deleteComment);

module.exports = router;
