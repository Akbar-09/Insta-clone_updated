const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/me', authenticateAdmin, authController.getMe);

// Admin Management
router.get('/admins', authenticateAdmin, authorizePermissions(['admins:read']), roleController.getAdmins);
router.patch('/admins/:id/role', authenticateAdmin, authorizePermissions(['admins:write']), roleController.updateAdminRole);
router.delete('/admins/:id', authenticateAdmin, authorizePermissions(['admins:write']), roleController.deleteAdmin);

// Roles
router.get('/roles', authenticateAdmin, authorizePermissions(['roles:read']), roleController.getRoles);
router.post('/roles', authenticateAdmin, authorizePermissions(['roles:write']), roleController.createRole);
router.put('/roles/:id', authenticateAdmin, authorizePermissions(['roles:write']), roleController.updateRole);
router.delete('/roles/:id', authenticateAdmin, authorizePermissions(['roles:write']), roleController.deleteRole);

module.exports = router;
