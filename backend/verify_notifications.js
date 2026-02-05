const axios = require('axios');

async function test() {
    try {
        console.log('Testing Notification Service Direct...');
        try {
            const stats = await axios.get('http://localhost:5008/admin/stats');
            console.log('Direct Stats:', stats.data);
        } catch (e) {
            console.log('Direct Stats Failed:', e.message);
        }

        console.log('\nTesting Admin Service Facade...');
        try {
            const statsAdmin = await axios.get('http://localhost:5016/notifications/stats');
            console.log('Admin Stats:', statsAdmin.data);
        } catch (e) {
            console.log('Admin Stats Failed:', e.response?.data || e.message);
        }

        console.log('\nSending Test Notification via Admin Service...');
        try {
            const res = await axios.post('http://localhost:5016/notifications/global', {
                title: 'Test Notification',
                message: 'This is a test from script',
                target: 'all'
            });
            console.log('Send Result:', res.data);
        } catch (e) {
            console.log('Send Failed:', e.response?.data || e.message);
        }

        console.log('\nVerifying History via Admin Service...');
        try {
            const history = await axios.get('http://localhost:5016/notifications/history');
            console.log('History Count:', history.data.data.length);
            console.log('Last Notification:', history.data.data[0]);
        } catch (e) {
            console.log('History Verification Failed:', e.response?.data || e.message);
        }

    } catch (error) {
        console.error('Test Script Error:', error);
    }
}

test();
