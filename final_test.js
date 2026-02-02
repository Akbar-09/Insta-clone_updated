const axios = require('axios');

const GATEWAY = 'http://localhost:5000/api/v1';

async function testAll() {
    console.log('--- JAADOE API TEST SUITE ---');
    let userToken = '';
    let adminToken = '';

    try {
        // 1. FRONTEND: Signup
        const testEmail = 'test' + Date.now() + '@example.com';
        const testPassword = 'password123';
        console.log('\n[FRONTEND] 1. Signup...');
        const signup = await axios.post(`${GATEWAY}/auth/signup`, {
            username: 'tester_' + Date.now(),
            email: testEmail,
            password: testPassword,
            fullName: 'API Tester'
        });
        console.log('✅ Signup Successful');

        // 2. FRONTEND: Login
        console.log('\n[FRONTEND] 2. Login...');
        const login = await axios.post(`${GATEWAY}/auth/login`, {
            email: testEmail,
            password: testPassword
        });
        userToken = login.data.token;
        console.log('✅ User Login Successful. Token obtained.');

        // 3. ADMIN: Login
        console.log('\n[ADMIN] 3. Admin Login...');
        const adminLogin = await axios.post(`${GATEWAY}/admin/auth/login`, {
            email: 'admin@jaadoe.com',
            password: 'adminpassword123'
        });
        adminToken = adminLogin.data.data.token;
        console.log('✅ Admin Login Successful');

        // 4. ADMIN: KPIs
        console.log('\n[ADMIN] 4. Get Dashboard KPIs...');
        const kpis = await axios.get(`${GATEWAY}/admin/dashboard/kpis`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ KPIs:', kpis.data.data);

        // 5. ADMIN: Audit Logs
        console.log('\n[ADMIN] 5. Get Audit Logs...');
        const logs = await axios.get(`${GATEWAY}/admin/audit`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ Audit Logs Found:', logs.data.data?.length || 0);

        console.log('\n🎉 ALL SYSTEMS GO - FRONTEND & ADMIN APIs VERIFIED 🎉');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ TEST SUITE FAILED!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

testAll();
