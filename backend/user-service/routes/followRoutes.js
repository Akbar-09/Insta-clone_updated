const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

// All routes are prefixed with /users in the main index.js, but the request says /api/v1/users/:userId/follow
// Wait, in index.js we might mount it differently. 
// Let's assume this router handles the specific actions on users.

router.post('/:userId/follow', followController.followUser);
router.delete('/:userId/follow', followController.unfollowUser);
router.get('/:userId/follow-status', followController.checkFollowStatus);
router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/following', followController.getFollowing);

module.exports = router;
