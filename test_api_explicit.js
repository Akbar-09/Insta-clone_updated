const axios = require('axios');

async function test() {
    try {
        const res = await axios.get('http://localhost:5003/posts?authorId=2');
        console.log('Success:', res.data);
    } catch (err) {
        console.log('Error:', err.response ? err.response.data : err.message);
    }
}

test();
