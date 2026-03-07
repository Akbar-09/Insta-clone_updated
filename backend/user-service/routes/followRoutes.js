const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

// All routes are prefixed with /users in the main index.js, but the request says /api/v1/users/:userId/follow
// Wait, in index.js we might mount it differently. 
// Let's assume this router handles the specific actions on users.

// Follow/Unfollow
router.post('/:userId/follow', followController.followUser);
router.delete('/:userId/follow', followController.unfollowUser);
router.get('/:userId/follow/status', followController.checkFollowStatus);
router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/following', followController.getFollowing);

// Backwards-compatible routes for older frontend caches
router.post('/follow/:userId', followController.followUser);
router.delete('/follow/:userId', followController.unfollowUser);
router.delete('/followers/:userId', followController.unfollowUser);

// Follow Requests
router.get('/requests', followController.getFollowRequests);
router.post('/requests/accept', followController.acceptRequest);
router.post('/requests/reject', followController.rejectRequest);

// Remove Follower
router.delete('/followers/:followerId/remove', followController.removeFollower);

// Hashtag Follows
const followHashtagController = require('../controllers/followHashtagController');
router.get('/hashtags', followHashtagController.getFollowedHashtags);
router.post('/hashtags/follow', followHashtagController.followHashtag);
router.delete('/hashtags/:hashtag/unfollow', followHashtagController.unfollowHashtag);

// Mute, Restrict, Block, Favorite
const blockController = require('../controllers/blockController');
const additionalSettingsController = require('../controllers/additionalSettingsController');
const extendedSettingsController = require('../controllers/extendedSettingsController');

router.post('/mute/:userId', additionalSettingsController.muteUser);
router.delete('/mute/:userId', additionalSettingsController.unmuteUser);
router.get('/muted', additionalSettingsController.getMutedAccounts);

router.post('/restrict/:userId', extendedSettingsController.restrictUser);
router.delete('/restrict/:userId', extendedSettingsController.unrestrictUser);
router.get('/restricted', extendedSettingsController.getRestrictedAccounts);

router.post('/block/:userId', blockController.blockUser);
router.delete('/block/:userId', blockController.unblockUser);
router.get('/blocked', blockController.getBlockedUsers);

router.post('/favorites/:userId', additionalSettingsController.addFavoriteAccount);
router.delete('/favorites/:userId', additionalSettingsController.removeFavoriteAccount);
router.get('/favorites', additionalSettingsController.getFavoriteAccounts);

module.exports = router;
