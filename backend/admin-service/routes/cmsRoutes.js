const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cmsController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.get('/pages', authorizePermissions(['cms:read']), cmsController.getPages);
router.patch('/pages/:id', authorizePermissions(['cms:write']), cmsController.updatePage);

module.exports = router;
