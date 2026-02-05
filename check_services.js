const axios = require('axios');

const services = [
    { name: 'Gateway', url: 'http://localhost:5000/health' },
    { name: 'Auth', url: 'http://localhost:5001/health' },
    { name: 'Users', url: 'http://localhost:5002/health' },
    { name: 'Posts', url: 'http://localhost:5003/health' },
    { name: 'Stories', url: 'http://localhost:5004/health' },
    { name: 'Reels', url: 'http://localhost:5005/health' },
    { name: 'Comments', url: 'http://localhost:5006/health' },
    { name: 'Feed', url: 'http://localhost:5007/health' },
    { name: 'Notification', url: 'http://localhost:5008/health' },
    { name: 'Search', url: 'http://localhost:5009/health' },
    { name: 'Message', url: 'http://localhost:5010/health' },
    { name: 'Socket', url: 'http://localhost:5011/health' },
    { name: 'Media', url: 'http://localhost:5013/health' },
    { name: 'Ad', url: 'http://localhost:5014/active' }, // Some might not have /health
    { name: 'Live', url: 'http://localhost:5015/health' },
    { name: 'Admin', url: 'http://localhost:5016/health' }
];

async function checkHealth() {
    console.log('--- Service Health Check ---\n');
    for (const s of services) {
        try {
            const res = await axios.get(s.url, { timeout: 1000 });
            console.log(`[UP]   ${s.name.padEnd(12)} - ${res.status}`);
        } catch (e) {
            console.log(`[DOWN] ${s.name.padEnd(12)} - ${e.message}`);
        }
    }
}

checkHealth();
