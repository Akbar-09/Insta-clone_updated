const { Sequelize } = require('sequelize');
const userConfig = require('./config/database');
const UserProfile = require('./models/UserProfile');

// We need to connect to other DBs to find the username source
const postSequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

async function fixUser(username) {
    try {
        console.log(`Checking for user: ${username}`);

        // 1. Check if profile already exists
        const existing = await UserProfile.findOne({ where: { username } });
        if (existing) {
            console.log(`Profile for ${username} already exists with userId: ${existing.userId}`);
            return;
        }

        // 2. Look in Posts or Reels for the userId
        let userId = null;

        const [posts] = await postSequelize.query(`SELECT "userId" FROM "Posts" WHERE username = :username LIMIT 1`, {
            replacements: { username }
        });

        if (posts.length > 0) {
            userId = posts[0].userId;
            console.log(`Found in Posts table. userId: ${userId}`);
        } else {
            const [reels] = await postSequelize.query(`SELECT "userId" FROM "Reels" WHERE username = :username LIMIT 1`, {
                replacements: { username }
            });
            if (reels.length > 0) {
                userId = reels[0].userId;
                console.log(`Found in Reels table. userId: ${userId}`);
            }
        }

        if (!userId) {
            console.log(`Could not find username ${username} in Posts or Reels tables.`);
            return;
        }

        // 3. Check for userId collision
        const collision = await UserProfile.findOne({ where: { userId } });
        if (collision && collision.username !== username) {
            console.log(`userId collision: ${userId} is already used by ${collision.username}. Generating dummy ID.`);
            userId = 999000 + Math.floor(Math.random() * 1000000);

            // Ensure dummy ID is also unique
            let exists = true;
            while (exists) {
                const check = await UserProfile.findOne({ where: { userId } });
                if (!check) exists = false;
                else userId++;
            }
        }

        // 4. Create the profile
        await UserProfile.create({
            userId,
            username,
            fullName: username.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            bio: `Official account of ${username}`,
            profilePicture: `https://ui-avatars.com/api/?name=${username}&background=random`
        });

        console.log(`Successfully created profile for ${username} with userId: ${userId}`);

    } catch (error) {
        console.error('Error fixing user:', error);
    } finally {
        await postSequelize.close();
        await userConfig.close();
    }
}

const targetUser = process.argv[2] || 'user_demo_58_289';
fixUser(targetUser);
