0.const { sequelize, Admin, Role } = require('./models');

const setup = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // 1. Ensure Super Admin Role exists
        const [role, createdRole] = await Role.findOrCreate({
            where: { name: 'Super Admin' },
            defaults: {
                permissions: ['*'], // Full access wildcard or list all permissions
                description: 'Full system access'
            }
        });
        console.log(createdRole ? 'Created Super Admin role.' : 'Found Super Admin role.');

        // 2. Ensure Admin User exists
        const [admin, createdAdmin] = await Admin.findOrCreate({
            where: { username: 'admin' },
            defaults: {
                name: 'System Admin',
                email: 'admin@jaadoe.com',
                password: 'adminpassword123', // Will be hashed by hook
                roleId: role.id,
                isActive: true
            }
        });

        if (createdAdmin) {
            console.log('Created admin user: admin / adminpassword123');
        } else {
            console.log('Found existing admin user. Updating password...');
            admin.password = 'adminpassword123';
            admin.isActive = true; // Ensure active
            if (admin.roleId !== role.id) {
                console.log('Updating role to Super Admin...');
                admin.roleId = role.id;
            }
            await admin.save();
            console.log('Admin updated: admin / adminpassword123');
        }

    } catch (error) {
        console.error('Error setting up admin:', error);
    } finally {
        await sequelize.close();
    }
};

setup();
