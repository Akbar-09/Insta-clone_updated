const { Hashtag } = require('./models');
const PostModel = require('../post-service/models/Post'); // Need to access other service model if possible, or use API
const sequelize = require('./config/database');
const postSequelize = require('../post-service/config/database');

async function syncWithPosts() {
    try {
        console.log('Started syncing hashtags from posts...');

        // 1. Fetch all unique hashtags from posts
        const posts = await PostModel.findAll({ attributes: ['caption'] });
        const hashtagMap = new Map();

        posts.forEach(post => {
            if (!post.caption) return;
            const tags = post.caption.match(/#[a-z0-9_]+/gi);
            if (tags) {
                tags.forEach(tag => {
                    const normalized = tag.toLowerCase();
                    hashtagMap.set(normalized, (hashtagMap.get(normalized) || 0) + 1);
                });
            }
        });

        console.log(`Found ${hashtagMap.size} unique hashtags in posts.`);

        // 2. Update Admin database
        for (const [name, count] of hashtagMap.entries()) {
            const [hashtag, created] = await Hashtag.findOrCreate({
                where: { name },
                defaults: {
                    postsCount: count,
                    status: 'active',
                    isTrending: count > 10 // Arbitrary threshold
                }
            });

            if (!created) {
                hashtag.postsCount = count;
                await hashtag.save();
            }
            console.log(`Synced ${name}: ${count} posts`);
        }

        console.log('Sync completed.');
        process.exit(0);
    } catch (error) {
        console.error('Sync failed:', error);
        process.exit(1);
    }
}

syncWithPosts();
