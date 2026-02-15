const axios = require('axios');

const API_URL = 'http://localhost:5016';

const run = async () => {
    try {
        console.log(`Connecting to ${API_URL}...`);

        // 1. Login
        console.log('Logging in with admin@jaadoe.com / adminpassword123 ...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@jaadoe.com',
            password: 'adminpassword123'
        });

        console.log('Login response status:', loginRes.status);
        if (!loginRes.data.success) {
            console.error('Login failed response:', JSON.stringify(loginRes.data));
            return;
        }

        const token = loginRes.data.data.token;
        console.log('Login successful. Token:', token.substring(0, 20) + '...');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // 2. Test Trending Hashtags
        console.log('Testing /hashtags/trending...');
        try {
            const hashtagRes = await axios.get(`${API_URL}/hashtags/trending`, { headers });
            console.log('/hashtags/trending success:', hashtagRes.status);
        } catch (error) {
            console.log('/hashtags/trending error:', error.message);
            if (error.response) {
                console.log('Response status:', error.response.status);
                console.log('Response data:', JSON.stringify(error.response.data));
            }
        }

        // 3. Test Analytics Countries
        console.log('Testing /analytics/countries...');
        try {
            const analyticsRes = await axios.get(`${API_URL}/analytics/countries`, { headers });
            console.log('/analytics/countries success:', analyticsRes.status);
        } catch (error) {
            console.log('/analytics/countries error:', error.message);
            if (error.response) {
                console.log('Response status:', error.response.status);
                console.log('Response data:', JSON.stringify(error.response.data));
            }
        }

    } catch (error) {
        console.log('Top level error:', error.message);
        console.log('Stack:', error.stack);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', JSON.stringify(error.response.data));
        } else if (error.code === 'ECONNREFUSED') {
            console.log('Connection refused! Ensure the server is running on port 5016.');
        }
    }
};

run();
