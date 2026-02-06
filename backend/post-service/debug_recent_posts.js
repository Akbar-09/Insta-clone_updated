const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function listRecentPosts() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5
        });

        posts.forEach(p => {
            console.log(`ID: ${p.id} | Media: ${p.mediaUrl} | Created: ${p.createdAt}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

listRecentPosts();
