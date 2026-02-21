const axios = require('axios');

async function testFeedServiceDirect() {
    const userId = '51'; // akbar
    const feedServiceUrl = 'http://localhost:5007';

    try {
        console.log(`Calling Feed Service directly at ${feedServiceUrl}`);
        const res = await axios.get(`${feedServiceUrl}/?userId=${userId}`, {
            headers: { 'x-user-id': userId }
        });

        console.log('Response Status:', res.status);
        console.log('Response Data:', JSON.stringify(res.data, null, 2));

    } catch (e) {
        console.error('Error:', e.response?.data || e.message);
    }
}

testFeedServiceDirect();
