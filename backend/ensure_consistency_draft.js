const axios = require('axios');

async function ensureConsistency() {
    const userId = 47;
    const username = 'user_test_47';

    console.log(`Ensuring consistency for ${username} (ID: ${userId})...`);

    // We can't easily reach all microservices from here without knowing their internal ports
    // But we know them from the gateway or env files

    const POST_SVC = 'http://localhost:5011';
    const REEL_SVC = 'http://localhost:5012';
    const USER_SVC = 'http://localhost:5010';

    try {
        // 1. Add some posts if none exist
        const postsRes = await axios.get(`${POST_SVC}/internal/user/${userId}`);
        if (postsRes.data.success && postsRes.data.data.length === 0) {
            console.log('Adding sample posts...');
            await axios.post(`${POST_SVC}/internal/posts`, {
                userId,
                username,
                caption: 'Sample post for consistency',
                mediaUrl: 'https://picsum.photos/seed/post1/800/800',
                mediaType: 'IMAGE'
            });
        }

        // 2. Add some reels if none exist
        const reelsRes = await axios.get(`${REEL_SVC}/internal/user/${userId}`);
        if (reelsRes.data.success && reelsRes.data.data.length === 0) {
            console.log('Adding sample reels...');
            await axios.post(`${REEL_SVC}/internal/reels`, {
                userId,
                username,
                caption: 'Sample reel for consistency',
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            });
        }

        console.log('Consistency check completed.');
    } catch (error) {
        console.error('Error during consistency check:', error.message);
    }
}

// Note: This script assumes internal routes exist for POSTing.
// If not, we'd need to use models directly.
// Since I have access to models, I'll use them.
