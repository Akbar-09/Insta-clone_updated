const axios = require('axios');

async function testInternal() {
    try {
        console.log('Post Service Internal Reports:');
        const res1 = await axios.get('http://localhost:5003/internal/reports');
        console.log(JSON.stringify(res1.data, null, 2));

        console.log('\nUser Service Internal Reports:');
        const res2 = await axios.get('http://localhost:5002/internal/reports');
        console.log(JSON.stringify(res2.data, null, 2));
    } catch (err) {
        console.error(err.message, err.response?.data);
    }
}
testInternal();
