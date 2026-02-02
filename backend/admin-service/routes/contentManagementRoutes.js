const express = require('express');
const router = express.Router();
const contentManagementController = require('../controllers/contentManagementController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

// Posts
router.get('/posts', contentManagementController.listPosts);
router.get('/posts/:postId/interactions', contentManagementController.getPostInteractions);
router.patch('/posts/:postId/hide', contentManagementController.hidePost);
router.patch('/posts/:postId/unhide', contentManagementController.unhidePost);
router.delete('/posts/:postId', contentManagementController.deletePost);

// Reels
router.get('/reels', contentManagementController.listReels);
router.get('/reels/:reelId/interactions', contentManagementController.getReelInteractions);
router.patch('/reels/:reelId/hide', contentManagementController.hideReel);
router.patch('/reels/:reelId/unhide', contentManagementController.unhideReel);
router.delete('/reels/:reelId', contentManagementController.deleteReel);

// Stories
router.get('/stories', contentManagementController.listStories);
router.get('/stories/:storyId/interactions', contentManagementController.getStoryInteractions);
router.delete('/stories/:storyId', contentManagementController.deleteStory);

module.exports = router;
