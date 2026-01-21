const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Profile routes
router.get('/me', profileController.getMyProfile);
router.put('/me', profileController.updateMyProfile);
router.post('/profile-photo', profileController.updateProfilePhoto);
router.delete('/profile-photo', profileController.removeProfilePhoto);
router.get('/me/saved', profileController.getMySavedPosts);
router.get('/:username', profileController.getUserProfile);
router.get('/:userId/posts', profileController.getUserPosts);
router.get('/:userId/followers', profileController.getFollowersList);
router.get('/:userId/following', profileController.getFollowingList);
router.delete('/followers/:followerId', profileController.removeFollower);

module.exports = router;
