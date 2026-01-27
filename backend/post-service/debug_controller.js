require('dotenv').config();
const { getExplorePosts } = require('./controllers/postController');

const req = {
    query: { limit: 18, offset: 0 },
    headers: {}
};

const res = {
    json: (data) => console.log('Response JSON:', JSON.stringify(data, null, 2)),
    status: (code) => {
        console.log('Response Status:', code);
        return { json: (data) => console.log('Error JSON:', data) };
    }
};

async function testController() {
    try {
        console.log('Testing getExplorePosts...');
        await getExplorePosts(req, res);
    } catch (err) {
        console.error('Unhandled Controller Error:', err);
    }
}

testController();
