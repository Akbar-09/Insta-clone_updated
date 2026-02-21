const http = require('http');

const data = JSON.stringify({
    userIds: [51, 104, 55],
    limit: 20,
    offset: 0
});

const options = {
    hostname: '127.0.0.1',
    port: 5003,
    path: '/feed',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => responseBody += chunk);
    res.on('end', () => {
        console.log('STATUS:', res.statusCode);
        console.log('BODY:', responseBody);
    });
});

req.on('error', (err) => console.error('Error:', err));
req.write(data);
req.end();
