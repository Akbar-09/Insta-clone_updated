const { Role, Admin, AuditLog } = require('../models');

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json({ success: true, data: roles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const role = await Role.create({ name, permissions });
        res.json({ success: true, data: role });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            include: [{ model: Role, as: 'role' }],
            attributes: { exclude: ['password'] }
        });
        res.json({ success: true, data: admins });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAdminRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { roleId } = req.body;
        const admin = await Admin.findByPk(id);
        if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });

        admin.roleId = roleId;
        await admin.save();

        res.json({ success: true, message: 'Admin role updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
