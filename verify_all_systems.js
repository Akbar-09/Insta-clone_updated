const axios = require('axios');

const GATEWAY = 'http://localhost:5000/api/v1';

async function verify() {
    console.log('🚀 Starting System-Wide API Verification...');
    let adminToken = '';

    try {
        // 1. Gateway
        console.log('\n[1/5] Checking Gateway...');
        const gw = await axios.get('http://localhost:5000/health');
        console.log('✅ Gateway Healthy:', gw.data.service);

        // 2. Admin Login
        console.log('\n[2/5] Checking Admin Auth...');
        const adminAuth = await axios.post(`${GATEWAY}/admin/auth/login`, {
            email: 'admin@jaadoe.com',
            password: 'adminpassword123'
        });
        adminToken = adminAuth.data.data.token;
        console.log('✅ Admin Login Successful. Token obtained.');

        // 3. Admin Governance (Reports)
        console.log('\n[3/5] Checking Admin Governance (Reports List)...');
        const reports = await axios.get(`${GATEWAY}/admin/reports`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ Admin Reports API Accessible. Found:', reports.data.data?.length || 0, 'reports.');

        // 4. Admin Analytics (KPIs)
        console.log('\n[4/4] Checking Admin Analytics (KPIs)...');
        const kpis = await axios.get(`${GATEWAY}/admin/dashboard/kpis`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ Admin KPIs:', kpis.data.data);

        console.log('\n✨ ALL CORE ADMIN & GATEWAY SYSTEMS VERIFIED SUCCESSFULY ✨');
    } catch (error) {
        console.error('\n❌ Verification Failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

verify();
