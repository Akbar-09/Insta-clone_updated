require('dotenv').config();

// Feed service Redis client
const feedRedis = require('../feed-service/config/redis');

// Post service database
const postSequelize = require('../post-service/config/database');
const Post = require('../post-service/models/Post');

(async () => {
    try {
        // Connect to both
        await feedRedis.client.connect();
        await postSequelize.authenticate();

        console.log('Connected to Redis and Post DB\n');

        // Fetch all posts from database
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: 100,
            raw: true
        });

        console.log(`Found ${posts.length} posts in database\n`);

        if (posts.length === 0) {
            console.log('⚠️  No posts found. Feed will be empty.');
            await feedRedis.client.quit();
            await postSequelize.close();
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
        await feedRedis.client.del('global_feed');

        // Add posts to feed
        console.log('📝 Rebuilding feed cache...\n');

        // Add to Redis (in reverse order so newest is first when we lPush)
        for (let i = posts.length - 1; i >= 0; i--) {
            await feedRedis.client.lPush('global_feed', JSON.stringify(posts[i]));
        }

        // Trim to 100 items
        await feedRedis.client.lTrim('global_feed', 0, 99);

        console.log(`✅ Feed rebuilt with ${posts.length} posts!`);
        console.log('\n📌 Refresh the feed page to see updated content.');

    } catch (error) {
        console.error('Error:', error.message);
        console.error(error);
    } finally {
        try {
            await feedRedis.client.quit();
        } catch (e) { }
        try {
            await postSequelize.close();
        } catch (e) { }
    }
})();
