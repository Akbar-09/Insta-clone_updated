const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

async function testAPIs() {
    console.log('--- Testing Microservices APIs ---');

    try {
        console.log('1. Testing Gateway Health...');
        const health = await axios.get('http://localhost:5000/health');
        console.log('   Response:', health.data);

        console.log('\n2. Testing Admin Login...');
        const adminLogin = await axios.post(`${BASE_URL}/admin/auth/login`, {
            email: 'admin@jaadoe.com',
            password: 'adminpassword123'
        });
        console.log('   Admin Token Received:', adminLogin.data.data.token.substring(0, 20) + '...');
        const adminToken = adminLogin.data.data.token;

        console.log('\n3. Testing Admin Dashboard KPIs (Protected)...');
        const kpis = await axios.get(`${BASE_URL}/admin/dashboard/kpis`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('   KPIs:', kpis.data.data);

        console.log('\n4. Testing Auth Service (Public Check)...');
        // Note: check-username is not in openPaths currently, let's test a real public path if any
        // signup might be public
        console.log('   (Skipping username check due to gateway restrictions)');

        console.log('\n--- API DOCUMENTATION ---\n');
        console.log('Swagger UI: http://localhost:5000/api-docs');
        console.log('Gateway Base: http://localhost:5000/api/v1');

    } catch (error) {
        console.error('API Test Failed:', error.response?.data || error.message);
    }
}

testAPIs();
