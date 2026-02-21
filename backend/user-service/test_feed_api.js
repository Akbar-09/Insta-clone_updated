const axios = require('axios');

async function testFeedLogic() {
    const userId = '51'; // akbar
    const userServiceUrl = 'http://localhost:5002';
    const postServiceUrl = 'http://localhost:5003';

    try {
        console.log(`1. Fetching following for user ${userId} from ${userServiceUrl}`);
        const followingRes = await axios.get(`${userServiceUrl}/${userId}/following`);

        console.log('Following Data Status:', followingRes.status);
        const followingData = followingRes.data;

        let followingIds = [];
        if (followingData.status === 'success' || followingData.success === true) {
            if (Array.isArray(followingData.data)) {
                followingIds = followingData.data.map(u => u.userId || u.id).filter(id => id);
            }
        }

        const userIds = [parseInt(userId), ...followingIds.map(id => parseInt(id))];
        console.log(`Total userIds to fetch: ${userIds.join(',')}`);

        console.log(`2. Fetching posts from Post Service: ${postServiceUrl}/feed`);
        const postsRes = await axios.post(`${postServiceUrl}/feed`, {
            userIds, limit: 20, offset: 0
        }, {
            headers: { 'x-user-id': userId }
        });

        console.log('Posts Data Status:', postsRes.data.status);
        console.log('Posts Count:', postsRes.data.data?.length);
        if (postsRes.data.data?.length > 0) {
            console.log('First Post:', JSON.stringify(postsRes.data.data[0]));
        }

    } catch (e) {
        console.error('Error:', e.response?.data || e.message);
    }
}

testFeedLogic();
