const Comment = require('./models/Comment');
const sequelize = require('./config/database');

async function addFlaggedComments() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const flaggedComments = [
            {
                postId: 1,
                userId: 7,
                username: 'user_test_7',
                text: 'This is a scam! Click this link to get free coins: bit.ly/fake-link',
                status: 'flagged',
                reportedCount: 5
            },
            {
                postId: 5,
                userId: 20,
                username: 'user_test_20',
                text: 'You are so stupid, nobody likes your posts.',
                status: 'flagged',
                reportedCount: 3
            },
            {
                postId: 1,
                userId: 7,
                username: 'user_test_7',
                text: 'BUY REPLICA BAGS CHEAP! DM ME NOW!!! 👜👜👜',
                status: 'flagged',
                reportedCount: 12
            }
        ];

        for (const commentData of flaggedComments) {
            const comment = await Comment.create(commentData);
            console.log(`Created flagged comment ID: ${comment.id}`);
        }

        console.log('Done adding flagged comments.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

addFlaggedComments();
