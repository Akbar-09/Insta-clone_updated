const express = require('express');
const router = express.Router();
const controller = require('../controllers/languageController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);
router.use(authorizePermissions(['manage_settings'])); // Assuming manage_settings covers this

router.get('/', controller.getLanguages);
router.patch('/:id/enable', controller.enableLanguage);
router.patch('/:id/disable', controller.disableLanguage);
router.patch('/:id/set-default', controller.setDefaultLanguage);

module.exports = router;
