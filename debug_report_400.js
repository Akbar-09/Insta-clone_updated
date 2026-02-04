const axios = require('axios');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'testsecret';
// Generate a token for user 55
const token = jwt.sign({ id: 55, username: 'testuser' }, JWT_SECRET);

async function testReport() {
    try {
        console.log('Testing report on post 139 with user 55...');
        const res = await axios.post('http://localhost:5000/api/v1/posts/139/report', {
            reason: 'spam',
            details: 'Testing through script'
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Success:', res.data);
    } catch (err) {
        console.log('FAILED with status:', err.response?.status);
        console.log('Response body:', JSON.stringify(err.response?.data, null, 2));
    }
}

testReport();
