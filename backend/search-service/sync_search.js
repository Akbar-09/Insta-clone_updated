const SearchIndex = require('./models/SearchIndex');
require('dotenv').config();
const sequelize = require('./config/database');
const { Sequelize } = require('sequelize');

// Also connect to user-service DB directly or make an API call
// We can just connect to the user DB since we have credentials
const userDb = new Sequelize(
    process.env.USER_DB_NAME || 'instagram',
    process.env.USER_DB_USER || 'postgres',
    process.env.USER_DB_PASSWORD || 'aspire123',
    {
        host: process.env.USER_DB_HOST || 'localhost',
        port: process.env.USER_DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
    }
);

async function sync() {
    try {
        await sequelize.authenticate();
        await userDb.authenticate();

        console.log('Fetching active users...');
        const [users] = await userDb.query('SELECT "userId", "username", "fullName", "profilePicture" FROM "UserProfiles"');
        console.log(`Found ${users.length} users`);

        console.log('Deleting existing USER index...');
        await SearchIndex.destroy({ where: { type: 'USER' } });

        console.log('Rebuilding USER index...');
        for (const user of users) {
            await SearchIndex.create({
                type: 'USER',
                content: user.username,
                referenceId: user.userId,
                metadata: {
                    fullName: user.fullName || '',
                    profilePicture: user.profilePicture || ''
                }
            });
        }
        console.log('Sync complete!');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}
sync();
