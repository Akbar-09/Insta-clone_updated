require('dotenv').config();
const { client } = require('./config/redis');

(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis\n');

        // Check global_feed
        const feedRaw = await client.lRange('global_feed', 0, -1);
        console.log(`Found ${feedRaw.length} items in global_feed:\n`);

        if (feedRaw.length > 0) {
            const feed = feedRaw.map(item => JSON.parse(item));

            // Show first 10 items
            feed.slice(0, 10).forEach((post, i) => {
                console.log(`${i + 1}. Post ID ${post.id} by ${post.username}`);
                console.log(`   Type: ${post.mediaType || 'N/A'}`);
                console.log(`   Media: ${post.mediaUrl ? post.mediaUrl.substring(0, 60) + '...' : 'N/A'}`);
                console.log('');
            });

            // Count by type
            const typeCount = {};
            feed.forEach(post => {
                const type = post.mediaType || 'UNKNOWN';
                typeCount[type] = (typeCount[type] || 0) + 1;
            });

            console.log('\nBreakdown by media type:');
            Object.entries(typeCount).forEach(([type, count]) => {
                console.log(`  ${type}: ${count}`);
            });

            // Clear the feed
            console.log('\n🗑️  Clearing global_feed cache...\n');
            await client.del('global_feed');
            console.log('✅ Cache cleared! The feed will be rebuilt on next request.');
        } else {
            console.log('Feed is already empty.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.quit();
    }
})();
