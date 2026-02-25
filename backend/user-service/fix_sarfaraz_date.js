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
    username: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE }
}, { tableName: 'UserProfiles', timestamps: true });

async function fix() {
    try {
        await sequelize.authenticate();
        const [updatedCount] = await UserProfile.update(
            { createdAt: new Date() },
            { where: { username: 'sarfaraz' } }
        );
        if (updatedCount > 0) {
            console.log('Successfully updated sarfaraz timestamp to today.');
        } else {
            console.log('User sarfaraz not found.');
        }
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

fix();
