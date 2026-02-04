const axios = require('axios');
const jwt = require('jsonwebtoken');
const util = require('util');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'adminsecret123';
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

        res.data.data.forEach((r, i) => {
            console.log(`${i + 1}. ID: ${r.id}, Type: ${r.content_type}, Status: ${r.status}`);
        });
    } catch (err) {
        console.error('Error:', util.inspect(err, { depth: null }));
    }
}

testAggregation();
