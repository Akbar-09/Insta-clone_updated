const Post = require('./models/Post');
const sequelize = require('./config/database');

async function fixPostData() {
    try {
        await sequelize.authenticate();
        console.log('Post Service Database connected.');

        // Fix sample paths and set correct mediaType
        const posts = await Post.findAll();
        let fixedCount = 0;

        for (const post of posts) {
            let updated = false;

            // Fix broken sample paths
            if (post.mediaUrl && post.mediaUrl.startsWith('/sample/')) {
                // Map local samples to public ones
                if (post.mediaUrl.includes('ElephantsDream')) {
                    post.mediaUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
                } else {
                    post.mediaUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                }
                updated = true;
            }

            // Ensure mediaType is VIDEO for mp4
            if (post.mediaUrl && post.mediaUrl.endsWith('.mp4') && post.mediaType !== 'VIDEO') {
                post.mediaType = 'VIDEO';
                updated = true;
            } else if (post.mediaUrl && (post.mediaUrl.includes('picsum') || post.mediaUrl.endsWith('.jpg') || post.mediaUrl.endsWith('.png')) && post.mediaType !== 'IMAGE') {
                post.mediaType = 'IMAGE';
                updated = true;
            }

            if (updated) {
                await post.save();
                fixedCount++;
            }
        }

        console.log(`Successfully fixed ${fixedCount} posts.`);
        process.exit(0);
    } catch (error) {
        console.error('Error fixing post data:', error);
        process.exit(1);
    }
}

fixPostData();
