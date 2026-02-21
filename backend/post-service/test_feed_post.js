const fetch = require('node-fetch');

async function test() {
    try {
        const res = await fetch('http://127.0.0.1:5003/feed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userIds: [51, 104, 55],
                limit: 20,
                offset: 0
            })
        });
        const data = await res.json();
        console.log('Post Service Response:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

test();
