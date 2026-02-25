const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

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
    createdAt: { type: DataTypes.DATE },
    id: { type: DataTypes.INTEGER, primaryKey: true }
}, { tableName: 'UserProfiles' });

async function check() {
    try {
        await sequelize.authenticate();
        const user = await UserProfile.findOne({ where: { username: 'sarfaraz' } });
        if (user) {
            console.log(`ID: ${user.id}, UserID: ${user.userId}, Username: ${user.username}, CreatedAt: ${user.createdAt}`);
        }
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}

check();
