const Post = require('./models/Post');
const sequelize = require('./config/database');

const checkPost = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');
        const post = await Post.findByPk(13);
        if (post) {
            console.log('Post 13 FOUND:', post.toJSON());
        } else {
            console.log('Post 13 NOT FOUND.');
        }

        // List all posts to be sure
        const all = await Post.findAll({ attributes: ['id', 'caption'] });
        console.log('All Posts:', all.map(p => p.toJSON()));

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkPost();
