const { sequelize, Admin, Role } = require('./models');

const run = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const admins = await Admin.findAll({
            include: [{ model: Role, as: 'role' }]
        });

        console.log('Admins:');
        admins.forEach(admin => {
            console.log(`- Username: ${admin.username}, Role: ${admin.role ? admin.role.name : 'Unknown'}, ID: ${admin.id}, RoleID: ${admin.roleId}`);
            if (admin.role) {
                console.log(`  Permissions: ${JSON.stringify(admin.role.permissions)}`);
            }
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
};

run();
