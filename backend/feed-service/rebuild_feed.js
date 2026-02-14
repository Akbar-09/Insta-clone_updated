require('dotenv').config();
const { client } = require('./config/redis');
const { Sequelize } = require('sequelize');

// Create a connection to the post database
const postDb = new Sequelize(
    'instagram', // DB_NAME from post-service
    'postgres',  // DB_USER
    'aspire123', // DB_PASSWORD
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    }
);

(async () => {
    try {
        await client.connect();
        await postDb.authenticate();

        console.log('Connected to Redis and Post DB\n');

        // Fetch all posts
        const [posts] = await postDb.query(`
            SELECT * FROM "Posts"
            ORDER BY "createdAt" DESC
            LIMIT 100
        `);

        console.log(`Found ${posts.length} posts in database\n`);

        if (posts.length === 0) {
            console.log('⚠️  No posts found. Feed will be empty.');
            await client.quit();
            await postDb.close();
            return;
        }

        // Show breakdown
        const typeCount = {};
        posts.forEach(post => {
            const type = post.mediaType || 'UNKNOWN';
            typeCount[type] = (typeCount[type] || 0) + 1;
        });

        console.log('Post breakdown:');
        Object.entries(typeCount).forEach(([type, count]) => {
            console.log(`  ${type}: ${count}`);
        });

        // Clear existing feed
        console.log('\n🗑️  Clearing old feed cache...');
        await client.del('global_feed');

        // Add posts to feed
        console.log('📝 Rebuilding feed cache...\n');

        // Add to Redis (in reverse order so newest is first)
        for (let i = posts.length - 1; i >= 0; i--) {
            await client.lPush('global_feed', JSON.stringify(posts[i]));
        }

        // Trim to 100 items
        await client.lTrim('global_feed', 0, 99);

        console.log(`✅ Feed rebuilt with ${posts.length} posts!`);
        console.log('\n📌 Refresh the feed page to see updated content.');

    } catch (error) {
        console.error('Error:', error.message);
        console.error(error);
    } finally {
        try {
            await client.quit();
        } catch (e) { }
        try {
            await postDb.close();
        } catch (e) { }
    }
})();
