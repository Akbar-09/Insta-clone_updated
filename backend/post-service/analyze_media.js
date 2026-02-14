const { Sequelize, Op } = require('sequelize');
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function analyzeMedia() {
    try {
        await sequelize.authenticate();
        console.log('Database connection accepted.');

        const totalPosts = await Post.count();
        const videoPosts = await Post.count({ where: { mediaType: 'VIDEO' } });
        const imagePosts = await Post.count({ where: { mediaType: 'IMAGE' } });

        console.log(`Total: ${totalPosts}`);
        console.log(`Videos: ${videoPosts}`);
        console.log(`Images: ${imagePosts}`);

        // Sample some videos
        const sampleVideos = await Post.findAll({
            where: { mediaType: 'VIDEO' },
            limit: 5,
            attributes: ['id', 'mediaUrl']
        });
        console.log('Sample Videos:', JSON.stringify(sampleVideos, null, 2));

        // Sample some images
        const sampleImages = await Post.findAll({
            where: { mediaType: 'IMAGE' },
            limit: 5,
            attributes: ['id', 'mediaUrl']
        });
        console.log('Sample Images:', JSON.stringify(sampleImages, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

analyzeMedia();
