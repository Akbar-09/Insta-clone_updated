const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const UserProfile = require('./models/UserProfile');

async function fixMissingUsers() {
    try {
        await sequelize.authenticate();
        console.log('Database Connected');

        // 1. Get unique usernames from Posts and Reels
        const [postsUsers] = await sequelize.query('SELECT DISTINCT username FROM "Posts"');
        const [reelsUsers] = await sequelize.query('SELECT DISTINCT username FROM "Reels"');

        const allUsernames = [...new Set([
            ...postsUsers.map(u => u.username),
            ...reelsUsers.map(u => u.username)
        ])].filter(u => u && u.trim());

        console.log(`Checking ${allUsernames.length} unique usernames...`);

        let createdCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        for (const username of allUsernames) {
            try {
                const existing = await UserProfile.findOne({ where: { username } });
                if (existing) {
                    skippedCount++;
                    continue;
                }

                const [source] = await sequelize.query(`SELECT "userId" FROM "Posts" WHERE username = ? LIMIT 1`, {
                    replacements: [username]
                });
                let userId = source[0]?.userId;

                if (!userId) {
                    const [reelSource] = await sequelize.query(`SELECT "userId" FROM "Reels" WHERE username = ? LIMIT 1`, {
                        replacements: [username]
                    });
                    userId = reelSource[0]?.userId;
                }

                if (!userId) {
                    userId = 888000 + Math.floor(Math.random() * 100000);
                } else {
                    // Check for collision
                    const collision = await UserProfile.findOne({ where: { userId } });
                    if (collision && collision.username !== username) {
                        userId = 777000 + Math.floor(Math.random() * 100000);
                    }
                }

                // Final check to ensure unique userId (prevent double collision)
                let exists = true;
                let finalUserId = userId;
                while (exists) {
                    const check = await UserProfile.findOne({ where: { userId: finalUserId } });
                    if (!check) exists = false;
                    else finalUserId = 1000000 + Math.floor(Math.random() * 9000000);
                }

                await UserProfile.create({
                    userId: finalUserId,
                    username: username,
                    fullName: username.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    bio: `Official account of ${username}`,
                    profilePicture: `https://ui-avatars.com/api/?name=${username}&background=random`,
                    followersCount: Math.floor(Math.random() * 1000),
                    followingCount: Math.floor(Math.random() * 500)
                });
                createdCount++;
                if (createdCount % 50 === 0) console.log(`Created ${createdCount} profiles...`);
            } catch (err) {
                console.error(`Error for ${username}:`, err.message);
                errorCount++;
            }
        }

        console.log(`Done! Created: ${createdCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`);
    } catch (error) {
        console.error('Fatal Error:', error);
    } finally {
        await sequelize.close();
    }
}

fixMissingUsers();
