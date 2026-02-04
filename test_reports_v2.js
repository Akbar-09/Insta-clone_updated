const axios = require('axios');

async function testPostReport() {
    try {
        console.log('--- Post Service ---');
        // Use a high numeric ID for user to avoid collision
        const randUserId = Math.floor(Math.random() * 900000) + 100000;
        const res = await axios.post('http://localhost:5003/1/report', {
            reason: 'spam',
            details: 'This is a test report ' + Date.now()
        }, {
            headers: { 'x-user-id': String(randUserId) }
        });
        console.log('Status:', res.status);
        console.log('Body:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('Error Status:', err.response?.status);
        console.error('Error Body:', JSON.stringify(err.response?.data, null, 2));
    }
}

async function testProblemReport() {
    try {
        console.log('\n--- User Service ---');
        // User service uses UUID or logic that handles strings, but numeric is safer if consistency is aimed
        const res = await axios.post('http://localhost:5002/profile/report-problem', {
            text: 'I found a bug in the stories ' + Date.now(),
            browserInfo: { agent: 'TestBot' }
        }, {
            headers: { 'x-user-id': '2' }
        });
        console.log('Status:', res.status);
        console.log('Body:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('Error Status:', err.response?.status);
        console.error('Error Body:', JSON.stringify(err.response?.data, null, 2));
    }
}

async function run() {
    await testPostReport();
    await testProblemReport();
}
run();
