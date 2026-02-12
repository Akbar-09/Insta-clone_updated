const axios = require('axios');

const API_URLs = [
    'http://localhost:5060'
];

const run = async () => {
    const url = 'http://localhost:5060';
    console.log(`Testing against ${url}...`);

    const randomSlug = `test-cat-${Date.now()}`;
    const payload = {
        name: 'Test Category',
        slug: randomSlug,
        parentId: "None (Top Level)", // Simulate frontend bad input if it sends string
        // Actually frontend sends ID or "None (Top Level)"? 
        // Based on screenshot, "None (Top Level)" is the label. The value is likely "" or "null".
        // Let's try sending "" which is common.
        parentId: "",
        order: 0
    };

    console.log('Sending payload:', payload);

    try {
        const res = await axios.post(`${url}/admin/category`, payload);
        console.log('Creation Success:', res.status, res.data);
    } catch (err) {
        console.error('Creation Failed:', err.response ? err.response.status : err.message);
        if (err.response) console.error(err.response.data);
    }

    // Try Duplicate
    console.log('Trying duplicate...');
    try {
        const res = await axios.post(`${url}/admin/category`, payload);
        console.log('Duplicate Creation Success (Unexpected):', res.status);
    } catch (err) {
        console.log('Duplicate Creation Expected Failure:', err.response ? err.response.status : err.message);
        if (err.response) console.log(err.response.data);
    }
};

run();
