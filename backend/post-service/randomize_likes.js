const { Sequelize, Op } = require('sequelize');
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function randomizeLikes() {
    try {
        await sequelize.authenticate();
        console.log('Database connection accepted.');

        const posts = await Post.findAll({
            where: { mediaType: 'IMAGE' },
            limit: 50 // Get first 50 images
        });

        console.log(`Found ${posts.length} images to update.`);

        for (const post of posts) {
            // Random likes between 1000 and 10000
            post.likesCount = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
            // Ensure mediaUrl is definitely valid
            // post.mediaUrl = `https://picsum.photos/seed/${post.id}/600/600`;
            await post.save();
        }

        console.log('Likes updated.');

        // Verify top posts
        const topPosts = await Post.findAll({
            order: [['likesCount', 'DESC']],
            limit: 10,
            attributes: ['id', 'mediaType', 'likesCount']
        });
        console.log('Top 10 posts:', JSON.stringify(topPosts, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

randomizeLikes();
