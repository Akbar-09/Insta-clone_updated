const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:aspire123@localhost:5432/instagram', {
    logging: false
});

const UserProfile = sequelize.define('UserProfile', {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    profilePicture: { type: DataTypes.STRING }
}, { tableName: 'UserProfiles', timestamps: false });

async function check() {
    try {
        const users = await UserProfile.findAll({ limit: 5 });
        console.log(JSON.stringify(users, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
    }
}

check();
