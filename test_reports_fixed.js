const axios = require('axios');

async function testPostReport() {
    try {
        console.log('Testing Post Report (Post Service directly)...');
        // Post service is on 5003. Route is /:id/report
        const res = await axios.post('http://localhost:5003/1/report', {
            reason: 'spam',
            details: 'This is a test report'
        }, {
            headers: {
                'x-user-id': '2'
            }
        });
        console.log('Post Service Response:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('Post Service Error:', err.response?.data || err.message);
        if (typeof err.response?.data === 'string' && err.response.data.startsWith('<!DOCTYPE')) {
            console.log('Received HTML instead of JSON. First 100 chars:', err.response.data.substring(0, 100));
        }
    }
}

async function testProblemReport() {
    try {
        console.log('\nTesting Problem Report (User Service directly)...');
        // User service is on 5002. Route is /profile/report-problem
        const res = await axios.post('http://localhost:5002/profile/report-problem', {
            text: 'I found a bug in the stories',
            browserInfo: { agent: 'TestBot' }
        }, {
            headers: {
                'x-user-id': '1'
            }
        });
        console.log('User Service Response:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('User Service Error:', err.response?.data || err.message);
    }
}

async function run() {
    await testPostReport();
    await testProblemReport();
}

run();
