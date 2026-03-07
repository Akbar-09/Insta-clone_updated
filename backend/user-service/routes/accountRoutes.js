const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// All these routes will be mounted on /account in index.js
// which means via Gateway they are /api/v1/users/account/...

router.get('/type', accountController.getAccountType);
router.post('/switch', accountController.switchAccountType);
router.get('/profile', accountController.getAccountProfile);
router.post('/profile', accountController.updateAccountProfile);
router.get('/categories', accountController.getCategories);
router.post('/category', accountController.saveCategory);

module.exports = router;
