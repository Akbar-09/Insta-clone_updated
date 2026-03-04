const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/UserModel');
const UserSession = require('../models/UserSession'); // Added Import
const { publishEvent } = require('../config/rabbitmq');
const { Op } = require('sequelize');
const AccountHistory = require('../models/AccountHistory'); // Assuming this exists based on read file

const register = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        // Check existing email
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ status: 'fail', message: 'Email already exists' });
        }

        // Check existing username (Auth DB Constraint)
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ status: 'fail', message: 'Username already taken' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Add Account History Entry
        await AccountHistory.create({
            userId: user.id,
            action: 'account_created',
            title: 'Account Created',
            description: 'You created your account.',
            icon: 'UserPlus'
        });

        // Generate Token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d',
        });

        // Publish Event
        await publishEvent('USER_CREATED', {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: fullName || username, // Pass full name if available
        });

        res.status(201).json({
            status: 'success',
            data: { token, user: { id: user.id, username: user.username, email: user.email } },
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    console.log('[AuthSvc] Login request started');
    try {
        const { email, password, deviceId } = req.body; // Expect deviceId
        console.log(`[AuthSvc] Login attempt for: ${email}, deviceId: ${deviceId}`);

        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d', // Long-lived for session
        });

        // Create or Update Session
        if (deviceId) {
            console.log(`[AuthSvc] Creating session for user ${user.id} on device ${deviceId}`);
            await UserSession.create({
                userId: user.id,
                deviceId: deviceId,
                token: token,
                isActive: true
            }).catch(err => console.error("Session creation failed", err)); // Non-blocking
        }

        res.json({
            status: 'success',
            data: { token, user: { id: user.id, username: user.username, email: user.email } },
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const checkUsername = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) return res.status(400).json({ status: 'error', message: 'Username is required' });

        // Basic Constraints
        if (username.length < 3 || username.length > 30) {
            return res.json({ status: 'success', available: false, reason: 'Length must be 3-30 characters' });
        }
        if (username.startsWith('.')) {
            return res.json({ status: 'success', available: false, reason: 'Cannot start with period' });
        }
        if (username.includes('..')) {
            return res.json({ status: 'success', available: false, reason: 'Cannot contain consecutive periods' });
        }
        const regex = /^[a-zA-Z0-9._]+$/;
        if (!regex.test(username)) {
            return res.json({ status: 'success', available: false, reason: 'Only letters, numbers, periods, and underscores allowed' });
        }

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.json({ status: 'success', available: true });
        }

        // Suggestions logic
        const suggestions = [];
        const base = username.replace(/[^a-zA-Z0-9._]/g, '');

        let attempts = 0;
        while (suggestions.length < 5 && attempts < 20) {
            attempts++;
            let sug = '';
            if (attempts === 1) sug = `${base}_${Math.floor(Math.random() * 999)}`;
            else if (attempts === 2) sug = `${base}.dev`;
            else if (attempts === 3) sug = `${base}_official`;
            else if (attempts === 4) sug = `${base}_live`;
            else sug = `${base}${Math.floor(Math.random() * 9999)}`;

            // Just simple random generation avoiding duplicates
            if (!suggestions.includes(sug)) {
                const sUser = await User.findOne({ where: { username: sug } });
                if (!sUser) suggestions.push(sug);
            }
        }

        res.json({ status: 'success', available: false, suggestions });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

const checkEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ where: { email } });
        res.json({ status: 'success', available: !user });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ status: 'fail', message: 'Email is required' });
        }
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        // Generate a simple 6-digit token for demo purposes
        const token = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 3600000); // 1 hour

        await user.update({
            resetToken: token,
            resetTokenExpiry: expiry
        });

        console.log(`Password reset token for ${email}: ${token}`);

        res.json({
            status: 'success',
            message: 'Reset token generated (check logs)',
            token: token // Sending it back for easy demo access
        });
    } catch (error) {
        console.error('Reset Request Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const verifyPasswordReset = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ status: 'fail', message: 'Token and newPassword are required' });
        }

        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiry: { [Op.gt]: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({ status: 'fail', message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
        });

        res.json({ status: 'success', message: 'Password updated successfully' });
    } catch (error) {
        console.error('Reset Verify Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const logout = async (req, res) => {
    try {
        const userId = req.userId; // Middleware should populate this if authenticated
        const deviceId = req.body.deviceId;

        if (userId && deviceId) {
            await UserSession.update({ isActive: false }, {
                where: { userId, deviceId }
            }).catch(err => console.error("Session update failed", err));
        }

        // Clear any auth cookies (if used in future)
        res.clearCookie('token');
        res.clearCookie('refreshToken');

        // Return success even if no token found (idempotent)
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ status: 'error', message: 'Logout failed' });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, { attributes: ['id', 'username', 'email', 'createdAt'] });
        if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });
        res.json({ status: 'success', data: user });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

const getAccountHistory = async (req, res) => {
    try {
        const userId = req.userId || req.query.userId || req.headers['x-user-id'];
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const history = await AccountHistory.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });
        res.json({ status: 'success', data: history });
    } catch (error) {
        console.error('Get History Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login,
    checkUsername,
    checkEmail,
    requestPasswordReset,
    verifyPasswordReset,
    logout,
    getMe,
    getAccountHistory
};
