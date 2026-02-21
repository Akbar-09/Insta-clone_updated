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
    { name: 'admin-service', dir: 'admin-service' },
    { name: 'help-service', dir: 'help-service' },
    { name: 'call-service', dir: 'call-service' }
];


const fs = require('fs');
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

services.forEach(service => {
    const servicePath = path.join(__dirname, service.dir);
    console.log(`Launching ${service.name} in ${servicePath}...`);

    const port = getPort(service.name);

    // Write to log files
    const stdoutLog = fs.createWriteStream(path.join(logDir, `${service.name}.log`), { flags: 'a' });
    const stderrLog = fs.createWriteStream(path.join(logDir, `${service.name}-error.log`), { flags: 'a' });

    const child = spawn('npm', ['run', 'dev'], {
        cwd: servicePath,
        shell: true,
        env: { ...process.env, PORT: port }
    });

    child.stdout.on('data', (data) => {
        stdoutLog.write(data);
        // Prefix log with service name for console visibility
        const lines = data.toString().split('\n');
        lines.forEach(line => {
            if (line.trim()) console.log(`[${service.name}] ${line.trim()}`);
        });
    });

    child.stderr.on('data', (data) => {
        stderrLog.write(data);
        console.error(`[${service.name} ERROR] ${data}`);
    });

    child.on('error', (err) => {
        const errMsg = `[${service.name} FAILED] ${err.message}\n`;
        stderrLog.write(errMsg);
        console.error(errMsg);
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
        'admin-service': 5016,
        'help-service': 5060,
        'call-service': 5018
    };
    return ports[name] || 0; // 0 will let OS assign random port if not found, but we want our ports
}

// Keep process alive
setInterval(() => { }, 10000);
