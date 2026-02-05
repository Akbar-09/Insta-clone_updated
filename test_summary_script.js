const axios = require('axios');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const JWT_SECRET = 'supersecretkey';
const BASE_URL = 'http://localhost:5000/api/v1';

const token = jwt.sign({ id: 1, username: 'user_test_1' }, JWT_SECRET, { expiresIn: '1h' });
const authHeader = { Authorization: `Bearer ${token}` };

const tests = [
    { method: 'POST', url: '/ads/impression', data: { adId: 1 } },
    { method: 'POST', url: '/ads/click', data: { adId: 1 } },
    { method: 'POST', url: '/auth/register', data: { username: `u${Date.now()}`, email: `e${Date.now()}@t.com`, password: 'pw' } },
    { method: 'POST', url: '/auth/signup', data: { username: `s${Date.now()}`, email: `es${Date.now()}@t.com`, password: 'pw' } },
    { method: 'POST', url: '/auth/login', data: { email: 'admin@example.com', password: 'password123' } },
    { method: 'GET', url: '/auth/check-username?username=admin' },
    { method: 'GET', url: '/auth/check-email?email=admin@example.com' },
    { method: 'GET', url: '/live/1' },
    { method: 'POST', url: '/live/1/comment', data: { content: 'test' } },
    { method: 'POST', url: '/live/webhook/publish', data: { stream_key: 'test' } },
    { method: 'POST', url: '/live/webhook/done', data: { stream_key: 'test' } },
    { method: 'POST', url: '/messages/seen', data: { conversationId: 1 } },
    { method: 'POST', url: '/notifications/admin/broadcast', data: { title: 'T', content: 'C' } },
    { method: 'GET', url: '/posts/stats' },
    { method: 'GET', url: '/posts/top' },
    { method: 'GET', url: '/posts/recent' },
    { method: 'GET', url: '/posts/list' },
    { method: 'GET', url: '/posts/reports' },
    { method: 'POST', url: '/posts', data: { caption: 'T', mediaUrl: 'http://e.com/i.jpg', mediaType: 'IMAGE' } },
    { method: 'POST', url: '/reels', data: { caption: 'T', mediaUrl: 'http://e.com/v.mp4' } },
    { method: 'POST', url: '/stories', data: { mediaUrl: 'http://e.com/s.jpg', mediaType: 'IMAGE' } },
    { method: 'POST', url: '/stories/1/report', data: { reason: 'spam' } },
    { method: 'GET', url: '/stories/highlights/1/stories' },
    { method: 'DELETE', url: '/stories/highlights/1' },
    { method: 'POST', url: '/users/requests/accept', data: { followerId: 1 } },
    { method: 'POST', url: '/users/requests/reject', data: { followerId: 1 } },
    { method: 'PUT', url: '/users/me', data: { fullName: 'Updated' } }
];

async function runTests() {
    let finalResults = [];
    for (const test of tests) {
        try {
            const res = await axios({
                method: test.method,
                url: BASE_URL + test.url,
                data: test.data,
                headers: authHeader,
                timeout: 3000
            });
            finalResults.push({ method: test.method, url: test.url, code: res.status, status: 'PASS' });
        } catch (e) {
            const code = e.response ? e.response.status : 'ERR';
            finalResults.push({ method: test.method, url: test.url, code: code, status: 'FAIL' });
        }
    }
    fs.writeFileSync('test_summary.json', JSON.stringify(finalResults, null, 2));

    const working = finalResults.filter(r => r.status === 'PASS').length;
    console.log(`TOTAL_WORKING=${working}`);
}

runTests();
