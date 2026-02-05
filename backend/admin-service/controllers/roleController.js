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

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'create_role',
            targetType: 'admin',
            targetId: role.id.toString(),
            metadata: { name, permissions }
        });

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

        const oldRoleId = admin.roleId;
        admin.roleId = roleId;
        await admin.save();

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'update_admin_role',
            targetType: 'admin',
            targetId: admin.id.toString(),
            metadata: { oldRoleId, newRoleId: roleId }
        });

        res.json({ success: true, message: 'Admin role updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, permissions, description } = req.body;
        const role = await Role.findByPk(id);
        if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

        const oldData = { name: role.name, permissions: role.permissions, description: role.description };
        if (name) role.name = name;
        if (permissions) role.permissions = permissions;
        if (description !== undefined) role.description = description;

        await role.save();

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'update_role',
            targetType: 'admin',
            targetId: role.id.toString(),
            metadata: {
                before: oldData,
                after: { name: role.name, permissions: role.permissions, description: role.description }
            }
        });

        res.json({ success: true, data: role });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

        await Role.destroy({ where: { id } });

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'delete_role',
            targetType: 'admin',
            targetId: id,
            metadata: { name: role.name }
        });

        res.json({ success: true, message: 'Role deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByPk(id);
        if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });

        await Admin.destroy({ where: { id } });

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'delete_admin',
            targetType: 'admin',
            targetId: id,
            metadata: { username: admin.username, email: admin.email }
        });

        res.json({ success: true, message: 'Admin access removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
