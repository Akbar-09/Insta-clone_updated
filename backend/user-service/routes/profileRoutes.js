const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const closeFriendController = require('../controllers/closeFriendController');
const blockController = require('../controllers/blockController');
const reportController = require('../controllers/reportController');

// Static Routes FIRST (to avoid matching dynamic :username)
router.post('/report-problem', reportController.submitReport);
router.get('/reports/me', reportController.getMyReports);

// Close Friends
router.get('/close-friends', closeFriendController.getCloseFriends);
router.post('/close-friends/:friendId', closeFriendController.addCloseFriend);
router.delete('/close-friends/:friendId', closeFriendController.removeCloseFriend);

// Blocked Users
router.get('/blocked-users', blockController.getBlockedUsers);
router.post('/block/:userId', blockController.blockUser);
router.delete('/unblock/:userId', blockController.unblockUser);

const storyPrivacyController = require('../controllers/storyPrivacyController');
// Story Privacy
router.get('/story-privacy/hidden-users', storyPrivacyController.getHiddenUsers);
router.post('/story-privacy/hide', storyPrivacyController.hideStoryFrom);
router.delete('/story-privacy/unhide/:hiddenUserId', storyPrivacyController.unhideStoryFrom);

const settingsController = require('../controllers/settingsController');
// Messages & Story Replies Settings
router.get('/settings/messages', settingsController.getMessageSettings);
router.patch('/settings/messages', settingsController.updateMessageSettings);

router.get('/settings/story-replies', settingsController.getStorySettings);
router.patch('/settings/story-replies', settingsController.updateStorySettings);

router.get('/settings/activity-status', settingsController.getActivitySettings);
router.patch('/settings/activity-status', settingsController.updateActivitySettings);

const tagsController = require('../controllers/tagsController');
// Tags & Mentions Settings
router.get('/settings/tags-mentions', tagsController.getTagsMentionsSettings);
router.patch('/settings/tags-mentions', tagsController.updateTagsMentionsSettings);

// Pending Tags
router.get('/tags/pending', tagsController.getPendingTags);
router.patch('/tags/:id/approve', tagsController.approveTag);
router.patch('/tags/:id/remove', tagsController.removeTag);

const extendedSettingsController = require('../controllers/extendedSettingsController');
// Comments
router.get('/settings/comments', extendedSettingsController.getCommentSettings);
router.put('/settings/comments', extendedSettingsController.updateCommentSettings);

// Sharing
router.get('/settings/sharing', extendedSettingsController.getSharingSettings);
router.put('/settings/sharing', extendedSettingsController.updateSharingSettings);

// Restricted Accounts
router.get('/settings/restricted', extendedSettingsController.getRestrictedAccounts);
router.post('/settings/restricted/:userId', extendedSettingsController.restrictUser);
router.delete('/settings/restricted/:userId', extendedSettingsController.unrestrictUser);

// Hidden Words
router.get('/settings/hidden-words', extendedSettingsController.getHiddenWordsSettings);
router.put('/settings/hidden-words', extendedSettingsController.updateHiddenWordsSettings);
router.post('/settings/hidden-words/words', extendedSettingsController.addHiddenWord);
router.delete('/settings/hidden-words/words/:id', extendedSettingsController.deleteHiddenWord);

const additionalSettingsController = require('../controllers/additionalSettingsController');
// Muted Accounts
router.get('/settings/muted', additionalSettingsController.getMutedAccounts);
router.post('/settings/muted/:userId', additionalSettingsController.muteUser);
router.delete('/settings/muted/:userId', additionalSettingsController.unmuteUser);

// Content Preferences
router.get('/settings/content-preferences', additionalSettingsController.getContentPreferences);
router.patch('/settings/content-preferences', additionalSettingsController.updateContentPreferences);

// Like & Share Counts
router.get('/settings/like-share', additionalSettingsController.getLikeShareSettings);
router.patch('/settings/like-share', additionalSettingsController.updateLikeShareSettings);

// Subscriptions
router.get('/settings/subscriptions', additionalSettingsController.getSubscriptions);

const generalSettingsController = require('../controllers/generalSettingsController');
// General Settings (Archive, Accessibility, Language)
router.get('/settings/general', generalSettingsController.getGeneralSettings);
router.patch('/settings/general', generalSettingsController.updateGeneralSettings);

// Connected Apps
router.get('/settings/apps', generalSettingsController.getConnectedApps);
router.patch('/settings/apps/:id/revoke', generalSettingsController.revokeAppAccess);

const helpController = require('../controllers/helpController');
// Help & Support
router.get('/help/account-status', helpController.getAccountStatus);
router.get('/help/violations', helpController.getViolations);
router.get('/help/feature-limits', helpController.getFeatureLimits);
router.get('/help/support-requests', helpController.getSupportRequests);
router.post('/help/feedback', helpController.submitFeedback);

// Profile specific static routes
router.get('/me', profileController.getMyProfile);
router.put('/me', profileController.updateMyProfile);
router.post('/profile-photo', profileController.updateProfilePhoto);
router.delete('/profile-photo', profileController.removeProfilePhoto);
router.get('/me/saved', profileController.getMySavedPosts);
router.get('/suggestions', profileController.getSuggestions);
router.post('/batch', profileController.getBatchProfiles);
router.get('/activity/account-history', profileController.getAccountHistory);

// Dynamic Routes LAST
router.get('/:username', profileController.getUserProfile);
router.get('/:userId/posts', profileController.getUserPosts);
router.get('/:userId/followers', profileController.getFollowersList);
router.get('/:userId/following', profileController.getFollowingList);
router.delete('/followers/:followerId', profileController.removeFollower);

module.exports = router;
