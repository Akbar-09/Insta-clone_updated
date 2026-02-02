const jwt = require('jsonwebtoken');
const { Admin, Role, AuditLog } = require('../models');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({
            where: { email },
            include: [{ model: Role, as: 'role' }]
        });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (!admin.isActive) {
            return res.status(403).json({ success: false, message: 'Account is suspended' });
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username, role: admin.role?.name },
            process.env.JWT_SECRET || 'adminsecret123',
            { expiresIn: '24h' }
        );

        admin.lastLogin = new Date();
        await admin.save();

        // Log login
        await AuditLog.create({
            adminId: admin.id,
            actionType: 'LOGIN',
            targetType: 'auth',
            targetId: admin.id.toString(),
            metadata: { ip: req.ip }
        });

        res.json({
            success: true,
            data: { token, admin: { id: admin.id, username: admin.username, email: admin.email, role: admin.role?.name } }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMe = async (req, res) => {
    res.json({ success: true, data: req.admin });
};
