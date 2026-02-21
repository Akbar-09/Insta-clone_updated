const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: '.env' });

const sequelize = new Sequelize(
    process.env.DB_NAME || 'user_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'aspire123',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    }
);

async function checkData() {
    try {
        await sequelize.authenticate();
        console.log('Connected to user_db');

        const [users] = await sequelize.query("SELECT id, username FROM \"UserProfiles\" WHERE username = 'akbar' LIMIT 1");
        if (users.length === 0) {
            console.log('User akbar not found in UserProfiles');
            return;
        }

        const akbar = users[0];
        console.log(`Akbar ID: ${akbar.id}`);

        const [following] = await sequelize.query(`SELECT "following_id" FROM "follows" WHERE "follower_id" = ${akbar.id}`);
        console.log(`Following IDs: ${following.map(f => f.following_id).join(', ') || 'None'}`);

        // Check posts for these users
        const postSequelize = new Sequelize(
            'instagram',
            'postgres',
            'aspire123',
            {
                host: 'localhost',
                dialect: 'postgres',
                logging: false
            }
        );

        const allUserIds = [akbar.id, ...following.map(f => f.following_id)].filter(id => id);
        console.log('All User IDs to fetch posts for:', allUserIds);
        const [posts] = await postSequelize.query(`SELECT id, "userId", username, caption FROM "Posts" WHERE "userId" IN (${allUserIds.join(',')})`);
        console.log(`Found ${posts.length} posts for these users`);
        posts.forEach(p => console.log(`Post ID: ${p.id}, User ID: ${p.userId}, Caption: ${p.caption}`));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkData();
