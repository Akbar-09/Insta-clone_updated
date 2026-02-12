const axios = require('axios');

const API_URLs = [
    'http://127.0.0.1:5016',
    'http://[::1]:5016',
    'http://localhost:5016'
];

const run = async () => {
    for (const url of API_URLs) {
        try {
            console.log(`Trying ${url}...`);
            // 1. Login
            const loginRes = await axios.post(`${url}/auth/login`, {
                email: 'admin@jaadoe.com',
                password: 'adminpassword123'
            });

            if (!loginRes.data.success) {
                console.error(`Login failed on ${url}:`, loginRes.data);
                continue;
            }

            const token = loginRes.data.data.token;
            console.log(`Login successful on ${url}. Token obtained.`);

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            // 2. Test Trending Hashtags
            try {
                const hashtagRes = await axios.get(`${url}/hashtags/trending`, { headers });
                console.log(`/hashtags/trending success on ${url}:`, hashtagRes.status);
            } catch (error) {
                console.log(`/hashtags/trending passed/failed on ${url}: Result: ${error.response ? error.response.status : error.message}`);
                if (error.response) console.log(error.response.data);
            }

            // 3. Test Analytics Countries
            try {
                const analyticsRes = await axios.get(`${url}/analytics/countries`, { headers });
                console.log(`/analytics/countries success on ${url}:`, analyticsRes.status);
            } catch (error) {
                console.log(`/analytics/countries passed/failed on ${url}: Result: ${error.response ? error.response.status : error.message}`);
                if (error.response) console.log(error.response.data);
            }

            // if we succeeded in connecting, break loop or continue testing?
            console.log('--- Connected and tested ---');
            return;

        } catch (error) {
            console.log(`Failed to connect to ${url}: ${error.code || error.message}`);
        }
    }
    console.log('All connection attempts failed.');
};

run();
