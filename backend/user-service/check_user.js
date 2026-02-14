const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const UserProfile = require('./models/UserProfile');

async function checkUser() {
    try {
        await sequelize.authenticate();
        console.log('User DB Connected');

        const username = process.argv[2] || 'creator_118';
        const user = await UserProfile.findOne({ where: { username } });

        if (user) {
            console.log(`User ${username} found:`, JSON.stringify(user, null, 2));
        } else {
            console.log(`User ${username} NOT found.`);
            // List some users to see what's there
            const someUsers = await UserProfile.findAll({ limit: 5, attributes: ['username'] });
            console.log('Some available usernames:', someUsers.map(u => u.username));
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkUser();
