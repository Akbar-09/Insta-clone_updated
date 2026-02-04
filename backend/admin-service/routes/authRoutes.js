const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/me', authenticateAdmin, authController.getMe);

// Roles
router.get('/roles', authenticateAdmin, authorizePermissions(['roles:read']), roleController.getRoles);
router.post('/roles', authenticateAdmin, authorizePermissions(['roles:write']), roleController.createRole);

// Admin Management
router.get('/admins', authenticateAdmin, authorizePermissions(['admins:read']), roleController.getAdmins);
router.patch('/admins/:id/role', authenticateAdmin, authorizePermissions(['admins:write']), roleController.updateAdminRole);

module.exports = router;
