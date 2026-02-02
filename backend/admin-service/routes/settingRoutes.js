const express = require('express');
const router = express.Router();
const controller = require('../controllers/settingsController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

// Profile routes (Any admin)
router.get('/profile', controller.getProfile);
router.put('/profile', controller.updateProfile);

// Platform settings (Restricted)
router.get('/', authorizePermissions(['manage_settings']), controller.getSettings); // Or manage_platform_settings
router.put('/', authorizePermissions(['manage_settings']), controller.updateSettings);

module.exports = router;
