const axios = require('axios');

async function testGetUserPosts() {
    const userId = 1797140; // The dummy ID for user_demo_39_938
    try {
        console.log(`Testing getUserPosts for userId: ${userId}`);
        const response = await axios.get(`http://localhost:5000/api/v1/users/profile/${userId}/posts`);
        console.log('Response status:', response.data.status);
        console.log('Total posts returned:', response.data.data.length);
        if (response.data.data.length > 0) {
            console.log('First post:', response.data.data[0]);
        }
    } catch (e) {
        console.error('Error:', e.response ? e.response.data : e.message);
    }
}

testGetUserPosts();
