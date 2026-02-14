const { Sequelize } = require('sequelize');

async function debugUser() {
    const s = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
    });

    const username = 'user_demo_39_938';

    try {
        console.log(`--- Debugging User: ${username} ---`);

        const [profile] = await s.query(`SELECT * FROM "UserProfiles" WHERE username = :username`, {
            replacements: { username }
        });
        console.log('Profile in UserProfiles:', profile[0] || 'NOT FOUND');

        const [posts] = await s.query(`SELECT id, "userId", username, "mediaType" FROM "Posts" WHERE username = :username`, {
            replacements: { username }
        });
        console.log(`Total posts found for ${username} by username:`, posts.length);
        if (posts.length > 0) {
            console.log('Post details:', posts[0]);
            const postUserId = posts[0].userId;

            if (profile[0]) {
                console.log(`Comparison: Profile userId (${profile[0].userId}) vs Post userId (${postUserId})`);
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await s.close();
    }
}

debugUser();
