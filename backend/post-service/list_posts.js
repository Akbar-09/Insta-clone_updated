require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function testQuery() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const posts = await Post.findAll({ limit: 5, raw: true });
        console.log('Available posts:', posts.map(p => ({ id: p.id, title: p.caption })));

    } catch (error) {
        console.error('Query failed:', error);
    } finally {
        await sequelize.close();
    }
}

testQuery();
