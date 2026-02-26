const sequelize = require('./config/database');
const Post = require('./models/Post');

async function test() {
    try {
        await sequelize.authenticate();
        const posts = await Post.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        });
        console.log(JSON.stringify(posts, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}
test();
