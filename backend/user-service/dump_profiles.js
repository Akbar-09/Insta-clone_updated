const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const UserProfile = sequelize.define('UserProfile', {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    username: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
}, { tableName: 'UserProfiles', timestamps: true });

async function dump() {
    try {
        await sequelize.authenticate();
        const users = await UserProfile.findAll();
        const lines = users.map(u => `User: ${u.username} | Pic: ${u.profilePicture}`);
        fs.writeFileSync('profiles_dump.txt', lines.join('\n'));
        console.log(`Dumped ${lines.length} profiles.`);

        const broken = users.find(u => u.profilePicture && u.profilePicture.includes('8863bbab'));
        if (broken) {
            console.log('!!! FOUND BROKEN PROFILE !!!');
            console.log(JSON.stringify(broken.toJSON()));

            // Fix it
            await broken.update({ profilePicture: null });
            console.log('Fixed broken profile picture.');
        } else {
            console.log('No broken profile picture found in dump.');
        }

    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
    }
}

dump();
