const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.delete('/posts/:postId', authorizePermissions(['content:delete']), moderationController.deletePost);
router.patch('/posts/:postId/hide', authorizePermissions(['content:write']), moderationController.hidePost);
router.delete('/reels/:reelId', authorizePermissions(['content:delete']), moderationController.deleteReel);
router.delete('/stories/:storyId', authorizePermissions(['content:delete']), moderationController.deleteStory);
router.delete('/comments/:commentId', authorizePermissions(['content:delete']), moderationController.deleteComment);

// List Views
router.get('/posts', authorizePermissions(['content:read']), moderationController.getPosts);
router.get('/reels', authorizePermissions(['content:read']), moderationController.getReels);

module.exports = router;
