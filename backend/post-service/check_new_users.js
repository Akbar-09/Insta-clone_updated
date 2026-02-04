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
        // Check the newly seeded users (ID >= 2000)
        const users = await UserProfile.findAll({
            where: { userId: { [Sequelize.Op.gte]: 2000 } },
            limit: 3
        });
        console.log(JSON.stringify(users, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
    }
}

check();
