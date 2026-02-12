const axios = require('axios');

const testApi = async () => {
    try {
        console.log('Testing Help Service API...');

        // Test Gateway access (port 5000)
        try {
            const resGateway = await axios.get('http://localhost:5000/api/v1/help/categories');
            console.log('Gateway Access (5000): Success');
            console.log('Categories Count:', resGateway.data.data.length);
            console.log('Sample Category:', JSON.stringify(resGateway.data.data[0], null, 2));
        } catch (e) {
            console.error('Gateway Access Failed (5000):', e.message);
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

testApi();
