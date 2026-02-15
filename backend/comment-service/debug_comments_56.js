const Comment = require('./models/Comment');
async function debug() {
    try {
        const comments = await Comment.findAll({ where: { postId: 56 } });
        for (const c of comments) {
            console.log(`COMMENT_ID:${c.id}|TEXT:${c.text}|PARENT:${c.parentId}`);
        }
    } catch (e) { console.error(e); }
    finally { process.exit(); }
}
debug();
