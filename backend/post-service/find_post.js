const Post = require('./models/Post');
const sequelize = require('./config/database');

async function test() {
    try {
        const post = await Post.findOne();
        if (post) {
            console.log('Valid Post ID:', post.id);
            console.log('Post User ID:', post.userId);
        } else {
            console.log('No posts found');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}
test();
