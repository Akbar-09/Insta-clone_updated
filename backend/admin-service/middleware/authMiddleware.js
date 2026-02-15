const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Role = require('../models/Role');

const authenticateAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'No admin token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'adminsecret123');
        const admin = await Admin.findByPk(decoded.id, {
            include: [{ model: Role, as: 'role' }]
        });

        if (!admin || !admin.isActive) {
            return res.status(401).json({ success: false, message: 'Invalid or inactive admin account' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid admin token' });
    }
};

const authorizePermissions = (requiredPermissions = []) => {
    return (req, res, next) => {
        if (!req.admin || !req.admin.role) {
            return res.status(403).json({ success: false, message: 'Forbidden: No role assigned' });
        }

        const { permissions } = req.admin.role;

        // SuperAdmin bypass or check specific permissions
        if (req.admin.role.name === 'SuperAdmin' || req.admin.role.name === 'Super Admin') return next();

        // Check for wildcard permission
        if (permissions.includes('*')) return next();

        const hasPermission = requiredPermissions.every(p => permissions.includes(p));
        if (!hasPermission) {
            return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
};

module.exports = { authenticateAdmin, authorizePermissions };
