const http = require('http');
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 51, username: 'akbar' }, 'supersecretkey');

const data = JSON.stringify({ callerId: 104, receiverId: 51, callType: 'video' });

const req = http.request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/v1/calls/start',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': data.length
    }
}, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
