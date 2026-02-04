const Report = require('./models/Report');
const Post = require('./models/Post');
const sequelize = require('./config/database');

async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Ensure associations are set
        Report.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
        Post.hasMany(Report, { foreignKey: 'postId', as: 'reports' });

        await sequelize.sync({ alter: true });
        console.log('Database synced.');

        // Create a dummy post first
        const post = await Post.create({
            userId: 1,
            username: 'testuser',
            caption: 'test post',
            mediaUrl: 'test.jpg',
            mediaType: 'image'
        });
        console.log('Post created:', post.id);

        const report = await Report.create({
            postId: post.id,
            reportedBy: 2,
            reason: 'spam',
            details: 'test report'
        });
        console.log('Report created successfully:', report.toJSON());
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

test();
