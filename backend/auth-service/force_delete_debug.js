const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});
async function forceDelete() {
    const usernames = ['must0', 'akshaykummar', 'tanmay'];
    const [users] = await sequelize.query(`SELECT id FROM "Users" WHERE username IN (:usernames)`, { replacements: { usernames } });
    const userIds = users.map(u => u.id);

    if (userIds.length === 0) {
        console.log('No users to delete');
        return;
    }

    console.log('Attempting to delete IDs:', userIds);

    for (const uid of userIds) {
        try {
            await sequelize.query(`DELETE FROM "Users" WHERE id = :uid`, { replacements: { uid } });
            console.log(`Deleted user ID ${uid} successfully.`);
        } catch (err) {
            console.error(`FAILED to delete user ID ${uid}: ${err.message}`);
            // Check what's blocking it
            try {
                const [details] = await sequelize.query(`SELECT table_name, column_name FROM information_schema.key_column_usage WHERE referenced_table_name = 'Users'`);
                console.log('Possible blocking columns:', details);
            } catch (ignore) { }
        }
    }
    await sequelize.close();
}
forceDelete();
