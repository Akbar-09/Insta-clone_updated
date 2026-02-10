const axios = require('axios');
async function test() {
    const url = 'http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_9fd53978-ff27-48c0-955c-292a21a7ed51_opt.webp';
    try {
        const res = await axios.get(url);
        console.log('Status:', res.status);
        console.log('Headers:', res.headers);
    } catch (err) {
        console.log('Error Status:', err.response?.status);
        console.log('Error Data:', err.response?.data);
    }
}
test();
