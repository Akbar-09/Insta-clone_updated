const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const UserProfile = sequelize.define('UserProfile', {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    username: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
}, {
    tableName: 'UserProfiles', // Standard Sequelize pluralization
    timestamps: true
});

const brokenUuid = '8863bbab-d6a2-4d56-8efe-0c17859da87d';

async function check() {
    try {
        await sequelize.authenticate();
        console.log('Connected to User DB');

        console.log(`Searching for users with profilePicture matching "${brokenUuid}"...`);

        const users = await UserProfile.findAll({
            where: {
                profilePicture: { [Op.like]: `%${brokenUuid}%` }
            }
        });

        if (users.length === 0) {
            console.log('No users found with this profile picture.');
        } else {
            console.log(`Found ${users.length} users with broken profile picture.`);

            for (const u of users) {
                console.log(`User ID: ${u.userId}, Username: ${u.username}, Pic: ${u.profilePicture}`);
                // Fix it
                await u.update({ profilePicture: null });
                console.log(`Cleared profile picture for user ${u.username}`);
            }
        }

    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await sequelize.close();
    }
}

check();
