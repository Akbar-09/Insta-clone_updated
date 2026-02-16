const axios = require('axios');

async function testBookmarkReel() {
    try {
        const response = await axios.post('http://localhost:5005/57/bookmark', {
            userId: 1
        });
        console.log('Response:', response.status, response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.status : error.message);
        if (error.response) console.error('Data:', error.response.data);
    }
}

testBookmarkReel();
