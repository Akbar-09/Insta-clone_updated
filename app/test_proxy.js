const https = require('https');
const axios = require('axios');

const agent = new https.Agent({
    rejectUnauthorized: false
});

axios.get('https://192.168.1.100:5175/api/v1/auth/me', { httpsAgent: agent })
    .then(response => {
        console.log("SUCCESS:", response.status, response.data);
    })
    .catch(error => {
        console.log("ERROR STATUS:", error.response ? error.response.status : error.message);
        if (error.response) console.log("DATA:", JSON.stringify(error.response.data).substring(0, 500));
    });
