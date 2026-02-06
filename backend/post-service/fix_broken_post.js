const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function fixBrokenPost() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        // The broken URL reported by the user
        const brokenUrl = '/uploads/1770293285905-80005929.jpg';
        // The file we found in the directory
        const fixedUrl = '/uploads/1770293285905-80005929_opt.webp';

        const posts = await Post.findAll({
            where: {
                mediaUrl: brokenUrl
            }
        });

        if (posts.length === 0) {
            console.log('No posts found with the broken URL. It might have been deleted or URL format differs.');

            // Try searching with a LIKE query just in case of path differences
            const similarPosts = await Post.findAll({
                where: sequelize.where(sequelize.fn('LOWER', sequelize.col('mediaUrl')), 'LIKE', '%1770293285905-80005929.jpg%')
            });
            console.log(`Found ${similarPosts.length} posts with similar filename pattern.`);

            if (similarPosts.length > 0) {
                for (const post of similarPosts) {
                    console.log(`Fixing post ${post.id} (Current: ${post.mediaUrl})`);
                    post.mediaUrl = fixedUrl;
                    await post.save();
                    console.log(`Fixed post ${post.id} -> ${fixedUrl}`);
                }
            }
        } else {
            console.log(`Found ${posts.length} broken posts.`);
            for (const post of posts) {
                console.log(`Fixing post ${post.id}...`);
                post.mediaUrl = fixedUrl;
                await post.save();
                console.log(`Fixed post ${post.id} -> ${fixedUrl}`);
            }
        }

    } catch (error) {
        console.error('Fix Error:', error);
    } finally {
        await sequelize.close();
    }
}

fixBrokenPost();
