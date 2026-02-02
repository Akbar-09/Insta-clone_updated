const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaDefaultController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.get('/', authorizePermissions(['media:read']), mediaController.getAvatars);
router.post('/', authorizePermissions(['media:write']), mediaController.addAvatar);

module.exports = router;
