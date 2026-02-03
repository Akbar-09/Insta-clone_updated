const express = require('express');
const router = express.Router();
const userManagementController = require('../controllers/userManagementController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.get('/', userManagementController.listUsers);
router.patch('/:userId/ban', userManagementController.banUser);
router.patch('/:userId/unban', userManagementController.unbanUser);
router.delete('/:userId', userManagementController.deleteUser);

router.get('/:userId/details', userManagementController.getUserDetails);
router.get('/:userId/followers', userManagementController.getUserFollowers);
router.get('/:userId/following', userManagementController.getUserFollowing);
router.get('/:userId/posts', userManagementController.getUserPosts);
router.get('/:userId/reels', userManagementController.getUserReels);

module.exports = router;
