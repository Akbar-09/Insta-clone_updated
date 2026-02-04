const axios = require('axios');
const jwt = require('jsonwebtoken');

const SECRET = 'adminsecret123';
const token = jwt.sign({ id: 1 }, SECRET);

async function testAggregation() {
    try {
        console.log('Testing Admin Report Aggregation...');
        const res = await axios.get('http://localhost:5016/reports', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Status:', res.status);
        console.log('Success:', res.data.success);
        console.log('Total Reports:', res.data.data.length);

        // Show types
        const types = res.data.data.map(r => r.content_type);
        console.log('Report Types found:', [...new Set(types)]);

        if (res.data.data.length > 0) {
            console.log('First report sample:', JSON.stringify({
                id: res.data.data[0].id,
                type: res.data.data[0].content_type,
                reason: res.data.data[0].reason
            }, null, 2));
        }
    } catch (err) {
        console.error('Error:', err.response?.status, err.response?.data || err.message);
    }
}

testAggregation();
