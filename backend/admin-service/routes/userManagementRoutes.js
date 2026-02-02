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
module.exports = router;
