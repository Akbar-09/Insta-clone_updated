const axios = require('axios');

async function testPostReport() {
    try {
        console.log('--- Post Service ---');
        const res = await axios.post('http://localhost:5003/1/report', {
            reason: 'spam',
            details: 'This is a test report'
        }, {
            headers: { 'x-user-id': '2' }
        });
        console.log('Status:', res.status);
        console.log('Body:', res.data);
    } catch (err) {
        console.error('Error:', err.response?.status, err.response?.data || err.message);
    }
}

async function testProblemReport() {
    try {
        console.log('\n--- User Service ---');
        const res = await axios.post('http://localhost:5002/profile/report-problem', {
            text: 'I found a bug in the stories',
            browserInfo: { agent: 'TestBot' }
        }, {
            headers: { 'x-user-id': '2' }
        });
        console.log('Status:', res.status);
        console.log('Body:', res.data);
    } catch (err) {
        console.error('Error:', err.response?.status, err.response?.data || err.message);
    }
}

async function run() {
    await testPostReport();
    await testProblemReport();
}
run();
