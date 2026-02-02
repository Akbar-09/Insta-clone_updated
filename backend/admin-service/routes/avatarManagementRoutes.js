const express = require('express');
const router = express.Router();
const controller = require('../controllers/avatarManagementController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');


router.use(authenticateAdmin);
router.use(authorizePermissions(['avatar_moderation']));


router.get('/', controller.listAvatars);
router.get('/stats', controller.getAvatarStats);
router.patch('/:avatarId/approve', controller.approveAvatar);
router.patch('/:avatarId/reject', controller.rejectAvatar);
router.delete('/:avatarId', controller.removeAvatar);

module.exports = router;
