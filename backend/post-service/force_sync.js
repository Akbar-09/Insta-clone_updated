const Post = require('./models/Post');
const Like = require('./models/Like');
const Report = require('./models/Report');
const SavedPost = require('./models/SavedPost');
const sequelize = require('./config/database');

async function sync() {
    try {
        await sequelize.authenticate();
        console.log('Post Service: DB Connected');

        // Define all associations here too
        Report.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
        Post.hasMany(Report, { foreignKey: 'postId', as: 'reports' });
        Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });
        Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

        await sequelize.sync({ alter: true });
        console.log('Post Service: Database Sync Success');
    } catch (err) {
        console.error('Post Service Sync Error:', err);
    } finally {
        await sequelize.close();
    }
}

sync();
