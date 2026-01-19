const sequelize = require('./config/database');
const Post = require('./models/Post');
const Like = require('./models/Like');

const resetLikes = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        console.log('Truncating Likes table...');
        await Like.destroy({ where: {}, truncate: true });

        console.log('Resetting likesCount on Posts...');
        await Post.update({ likesCount: 0 }, { where: {} });

        console.log('Likes reset successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error resetting likes:', error);
        process.exit(1);
    }
};

resetLikes();
