const Comment = require('./models/Comment');

async function fixComments() {
    try {
        const [count] = await Comment.update(
            { username: 'ashish' },
            { where: { userId: 104 } }
        );
        console.log(`Updated ${count} comments for userId 104 to username 'ashish'`);
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

fixComments();
