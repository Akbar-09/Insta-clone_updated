const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const UserProfile = require('./models/UserProfile');

async function fixOne(username) {
    try {
        await sequelize.authenticate();
        console.log('Database Connected');

        const existing = await UserProfile.findOne({ where: { username } });
        if (existing) {
            console.log(`User ${username} already exists.`);
            return;
        }

        // Find a relevant userId from the source table if possible
        const [source] = await sequelize.query(`SELECT "userId" FROM "Posts" WHERE username = '${username}' LIMIT 1`);
        let userId = source[0]?.userId;

        if (!userId) {
            const [reelSource] = await sequelize.query(`SELECT "userId" FROM "Reels" WHERE username = '${username}' LIMIT 1`);
            userId = reelSource[0]?.userId;
        }

        if (userId) {
            console.log(`Creating missing profile for ${username} (userId: ${userId})`);
            await UserProfile.create({
                userId: userId,
                username: username,
                fullName: username.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                bio: `Official account of ${username}`,
                profilePicture: `https://ui-avatars.com/api/?name=${username}&background=random`,
                followersCount: Math.floor(Math.random() * 1000),
                followingCount: Math.floor(Math.random() * 500)
            });
            console.log('User created!');
        } else {
            console.log('Source not found, using random userId');
            await UserProfile.create({
                userId: 999999 + Math.floor(Math.random() * 100000),
                username: username,
                fullName: username,
                bio: `Placeholder bio`
            });
            console.log('User created with random ID!');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

fixOne('creator_118');
