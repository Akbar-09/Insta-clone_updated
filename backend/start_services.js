const { spawn } = require('child_process');
const path = require('path');

const services = [
    { name: 'gateway', dir: 'gateway' },
    { name: 'auth-service', dir: 'auth-service' },
    { name: 'user-service', dir: 'user-service' },
    { name: 'post-service', dir: 'post-service' },
    { name: 'story-service', dir: 'story-service' },
    { name: 'reel-service', dir: 'reel-service' },
    { name: 'comment-service', dir: 'comment-service' },
    { name: 'feed-service', dir: 'feed-service' },
    { name: 'notification-service', dir: 'notification-service' },
    { name: 'search-service', dir: 'search-service' },
    { name: 'message-service', dir: 'message-service' },
    { name: 'socket-service', dir: 'socket-service' },
    { name: 'media-service', dir: 'media-service' },
    { name: 'ad-service', dir: 'ad-service' },
    { name: 'insight-service', dir: 'insight-service' },
    { name: 'live-service', dir: 'live-service' },
    { name: 'admin-service', dir: 'admin-service' }
];


console.log('Starting services...');

services.forEach(service => {
    const servicePath = path.join(__dirname, service.dir);
    console.log(`Launching ${service.name} in ${servicePath}...`);

    const port = getPort(service.name);

    // On Windows, 'npm' is an executable script (npm.cmd), so we need shell: true
    // Using 'npm run dev' to leverage nodemon if available, or just index.js
    const child = spawn('npm', ['run', 'dev'], {
        cwd: servicePath,
        shell: true,
        env: { ...process.env, PORT: port }
    });

    child.stdout.on('data', (data) => {
        // Prefix log with service name
        const lines = data.toString().split('\n');
        lines.forEach(line => {
            if (line.trim()) console.log(`[${service.name}] ${line.trim()}`);
        });
    });

    child.stderr.on('data', (data) => {
        console.error(`[${service.name} ERROR] ${data}`);
    });

    child.on('error', (err) => {
        console.error(`[${service.name} FAILED] ${err.message}`);
    });
});

function getPort(name) {
    const ports = {
        'gateway': 5000,
        'auth-service': 5001,
        'user-service': 5002,
        'post-service': 5003,
        'story-service': 5004,
        'reel-service': 5005,
        'comment-service': 5006,
        'feed-service': 5007,
        'notification-service': 5008,
        'search-service': 5009,
        'message-service': 5010,
        'socket-service': 5011,
        'media-service': 5013,
        'ad-service': 5014,
        'live-service': 5015,
        'insight-service': 5017,
        'admin-service': 5016
    };
    return ports[name] || 0; // 0 will let OS assign random port if not found, but we want our ports
}

// Keep process alive
setInterval(() => { }, 10000);
