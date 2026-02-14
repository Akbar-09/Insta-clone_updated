require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Find the 5 sample video posts we just created
        const videoPosts = await Post.findAll({
            where: { mediaType: 'VIDEO' },
            order: [['id', 'DESC']],
            limit: 5
        });

        console.log(`Found ${videoPosts.length} video posts to delete:\n`);

        videoPosts.forEach((post, i) => {
            console.log(`${i + 1}. ID ${post.id} by ${post.username}: ${post.caption.substring(0, 50)}...`);
        });

        if (videoPosts.length > 0) {
            console.log('\nDeleting video posts...\n');

            const postIds = videoPosts.map(p => p.id);
            const deleted = await Post.destroy({
                where: { id: postIds }
            });

            console.log(`✅ Deleted ${deleted} video posts.`);
        }

        // Show updated stats
        const [stats] = await sequelize.query(`
            SELECT "mediaType", COUNT(*) as count
            FROM "Posts"
            GROUP BY "mediaType"
        `);

        console.log('\nUpdated post statistics:');
        stats.forEach(s => {
            console.log(`  ${s.mediaType}: ${s.count} posts`);
        });

        const [total] = await sequelize.query(`SELECT COUNT(*) as count FROM "Posts"`);
        console.log(`\nTotal posts: ${total[0].count}`);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
