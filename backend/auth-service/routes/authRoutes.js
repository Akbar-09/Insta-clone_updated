const express = require('express');
const { register, login, checkUsername, checkEmail, requestPasswordReset, verifyPasswordReset, logout, getMe } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/signup', register); // Alias
router.post('/login', login);
router.get('/check-username', checkUsername);
router.get('/check-email', checkEmail);
router.post('/reset-password/request', requestPasswordReset);
router.post('/reset-password/verify', verifyPasswordReset);
router.post('/logout', logout);
router.get('/me', verifyToken, getMe);

module.exports = router;
