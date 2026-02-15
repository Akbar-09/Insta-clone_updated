const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const UserSession = require('../models/UserSession'); // Added Import
const { publishEvent } = require('../config/rabbitmq');
const { Op } = require('sequelize');
const AccountHistory = require('../models/AccountHistory'); // Assuming this exists based on read file

const register = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        // Check existing
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ status: 'fail', message: 'Email already exists' });
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
        const user = await User.findOne({ where: { username } });
        res.json({ status: 'success', available: !user });
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
    // Mock implementation for MVP
    const { email } = req.body;
    // In real app: generate token, save to DB, send email
    console.log(`Password reset requested for: ${email}`);
    res.json({ status: 'success', message: 'Reset link sent (mock)' });
};

const verifyPasswordReset = async (req, res) => {
    // Mock implementation for MVP
    const { token, newPassword } = req.body;
    // In real app: verify token, update password hash
    console.log(`Password reset with token: ${token}`);
    res.json({ status: 'success', message: 'Password updated (mock)' });
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
