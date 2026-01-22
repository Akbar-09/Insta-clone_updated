require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function testQuery() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const post = await Post.findByPk(191);
        if (post) {
            console.log('Post 191 found:', post.toJSON());
        } else {
            console.log('Post 191 NOT found');
        }

    } catch (error) {
        console.error('Query failed:', error);
    } finally {
        await sequelize.close();
    }
}

testQuery();
