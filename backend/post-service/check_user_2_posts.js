require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function checkPosts() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const posts = await Post.findAll({ where: { userId: 2 }, raw: true });
        console.log(`Found ${posts.length} posts for userId 2:`, posts.map(p => ({ id: p.id, caption: p.caption })));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkPosts();
