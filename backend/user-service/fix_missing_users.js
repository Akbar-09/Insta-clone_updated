const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const UserProfile = require('./models/UserProfile');

async function fixMissingUsers() {
    try {
        await sequelize.authenticate();
        console.log('Database Connected');

        // 1. Get unique usernames from Posts
        const [postsUsers] = await sequelize.query('SELECT DISTINCT username FROM "Posts"');
        const usernames = postsUsers.map(u => u.username).filter(u => u);

        // 2. Get unique usernames from Reels
        const [reelsUsers] = await sequelize.query('SELECT DISTINCT username FROM "Reels"');
        const reelUsernames = reelsUsers.map(u => u.username).filter(u => u);

        const allUsernames = [...new Set([...usernames, ...reelUsernames])];
        console.log(`Checking ${allUsernames.length} unique usernames...`);

        let createdCount = 0;
        for (const username of allUsernames) {
            const existing = await UserProfile.findOne({ where: { username } });
            if (!existing) {
                // Find a relevant userId from the source table if possible, or generate a high one
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
                        followingCount: Math.floor(Math.random() * 500),
                        postCount: 0 // Will be updated by controller later
                    });
                    createdCount++;
                }
            }
        }

        console.log(`Done! Created ${createdCount} missing profiles.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

fixMissingUsers();
