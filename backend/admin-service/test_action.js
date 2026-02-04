const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'adminsecret123';
const token = jwt.sign({ id: 1 }, SECRET);

async function testAction() {
    try {
        // Get reports first to find an app_feedback ID
        const res = await axios.get('http://localhost:5016/reports', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const appFeedback = res.data.data.find(r => r.content_type === 'app_feedback');

        if (appFeedback) {
            console.log('Testing IGNORE on app_feedback ID:', appFeedback.id);
            const resAction = await axios.post(`http://localhost:5016/reports/${appFeedback.id}/ignore`, {
                type: 'app_feedback'
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Action Response:', resAction.data);

            // Verify status in user service
            const resVerify = await axios.get(`http://localhost:5016/reports/${appFeedback.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('New Status:', resVerify.data.data.status);
        } else {
            console.log('No app_feedback report found to test.');
        }
    } catch (err) {
        console.error('Error:', err.message, err.response?.data);
    }
}

testAction();
