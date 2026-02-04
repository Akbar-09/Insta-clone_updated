const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'adminsecret123';
const token = jwt.sign({ id: 1 }, SECRET);

async function testBan() {
    try {
        const res = await axios.get('http://localhost:5016/reports', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const postReport = res.data.data.find(r => r.content_type === 'post');

        if (postReport) {
            console.log('Testing BAN on post report ID:', postReport.id);
            const resAction = await axios.post(`http://localhost:5016/reports/${postReport.id}/ban-user`, {
                type: 'post'
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Action Response:', resAction.data);

            // Verify status
            const resVerify = await axios.get(`http://localhost:5016/reports/${postReport.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('New Status:', resVerify.data.data.status);
        } else {
            console.log('No post report found to test.');
        }
    } catch (err) {
        console.error('Error:', err.message, err.response?.data);
    }
}

testBan();
