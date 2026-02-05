const axios = require('axios');

async function testSettings() {
    try {
        console.log('Logging in as Admin...');
        const loginRes = await axios.post('http://localhost:5016/auth/login', {
            email: 'admin@jaadoe.com',
            password: 'adminpassword123'
        });

        if (!loginRes.data.success) {
            console.error('Login failed');
            return;
        }

        const token = loginRes.data.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log('Login successful. Token acquired.');

        console.log('\nFetching Settings...');
        const settingsRes = await axios.get('http://localhost:5016/settings', config);
        console.log('Current Settings:', settingsRes.data.data);

        console.log('\nUpdating Settings...');
        const newMode = !settingsRes.data.data.maintenanceMode;
        const updateRes = await axios.put('http://localhost:5016/settings', {
            maintenanceMode: newMode
        }, config);
        console.log('Updated Settings Result:', updateRes.data);

        console.log('\nFetching Profile...');
        const profileRes = await axios.get('http://localhost:5016/settings/profile', config);
        console.log('Current Profile:', profileRes.data.data);

    } catch (error) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
    }
}

testSettings();
