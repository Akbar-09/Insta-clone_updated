const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: './user-service/.env' });

const sequelize = new Sequelize(
    process.env.DB_NAME || 'instagram',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'aspire123',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false
    }
);

const UserProfile = sequelize.define('UserProfile', {
    userId: { type: DataTypes.INTEGER, unique: true },
    username: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE }
}, { tableName: 'UserProfiles' });

async function check() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
        const users = await UserProfile.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5
        });
        console.log('Recent Users:');
        users.forEach(u => {
            console.log(`${u.username}: ${u.createdAt} (${new Date(u.createdAt).toLocaleString()})`);
        });
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

check();
