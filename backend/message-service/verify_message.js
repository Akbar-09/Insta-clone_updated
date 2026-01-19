const http = require('http');

const messageData = {
    senderId: 1,
    recipientId: 2,
    text: 'Hello from verification script!'
};

function postMessage() {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(messageData);

        const options = {
            hostname: 'localhost',
            port: 5010,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 201) {
                    console.log('POST Success:', data);
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`POST Failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

function getMessages() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5010,
            path: `/?userId1=${messageData.senderId}&userId2=${messageData.recipientId}`,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('GET Success:', data);
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`GET Failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function verify() {
    console.log('Starting verification...');
    try {
        // 1. Send Message
        console.log('Sending message...');
        await postMessage();

        // 2. Get Messages
        console.log('Retrieving messages...');
        const response = await getMessages();

        // 3. Verify
        if (response.status === 'success' && Array.isArray(response.data)) {
            const found = response.data.find(m => m.text === messageData.text);
            if (found) {
                console.log('SUCCESS: Sent message found in retrieval.');
                process.exit(0);
            } else {
                console.log('FAILURE: Sent message NOT found.');
                process.exit(1);
            }
        } else {
            console.log('FAILURE: Invalid response format.');
            process.exit(1);
        }

    } catch (error) {
        console.error('Verification failed:', error.message);
        process.exit(1);
    }
}

verify();
