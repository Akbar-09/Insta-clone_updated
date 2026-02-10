const axios = require('axios');

async function test() {
    const key = 'Jaadoe/temp/e2f16ab4-9b67-4431-8dff-f95cae302d9e.jpg';
    const url = `http://localhost:5013/files/${key}`;
    console.log(`Testing direct proxy request to media-service: ${url}`);

    try {
        const response = await axios.get(url, { responseType: 'stream' });
        console.log(`Success! Status: ${response.status}`);
        console.log(`Content-Type: ${response.headers['content-type']}`);
    } catch (error) {
        console.error(`Failed! Status: ${error.response ? error.response.status : 'No Response'}`);
        if (error.response) {
            // Read small part of error body
            console.error('Error Body snippet:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

test();
