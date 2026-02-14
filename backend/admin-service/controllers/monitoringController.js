const fs = require('fs');
const path = require('path');
const net = require('net');

const services = [
    { name: 'gateway', port: 5000 },
    { name: 'auth-service', port: 5001 },
    { name: 'user-service', port: 5002 },
    { name: 'post-service', port: 5003 },
    { name: 'story-service', port: 5004 },
    { name: 'reel-service', port: 5005 },
    { name: 'comment-service', port: 5006 },
    { name: 'feed-service', port: 5007 },
    { name: 'notification-service', port: 5008 },
    { name: 'search-service', port: 5009 },
    { name: 'message-service', port: 5010 },
    { name: 'socket-service', port: 5011 },
    { name: 'media-service', port: 5013 },
    { name: 'ad-service', port: 5014 },
    { name: 'insight-service', port: 5017 },
    { name: 'live-service', port: 5015 },
    { name: 'admin-service', port: 5016 },
    { name: 'help-service', port: 5060 }
];

const checkPort = (port) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(1000);
        socket.on('connect', () => {
            socket.destroy();
            resolve('online');
        });
        socket.on('timeout', () => {
            socket.destroy();
            resolve('offline');
        });
        socket.on('error', () => {
            socket.destroy();
            resolve('offline');
        });
        socket.connect(port, '127.0.0.1');
    });
};

exports.getServiceStatuses = async (req, res) => {
    try {
        const statusPromises = services.map(async (service) => {
            const status = await checkPort(service.port);
            return {
                ...service,
                status
            };
        });

        const statuses = await Promise.all(statusPromises);
        res.json({ success: true, data: statuses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getServiceLogs = (req, res) => {
    try {
        const { serviceName, type } = req.params; // type = 'logs' or 'errors'
        const logFileName = type === 'errors' ? `${serviceName}-error.log` : `${serviceName}.log`;
        const logPath = path.join(__dirname, '..', '..', 'logs', logFileName);

        if (!fs.existsSync(logPath)) {
            return res.json({ success: true, data: 'No logs found for this service.' });
        }

        // Read last 200 lines or 10KB
        const stats = fs.statSync(logPath);
        const size = stats.size;
        const bufferSize = Math.min(size, 10240); // 10KB
        const buffer = Buffer.alloc(bufferSize);
        const fd = fs.openSync(logPath, 'r');
        fs.readSync(fd, buffer, 0, bufferSize, size - bufferSize);
        fs.closeSync(fd);

        res.json({ success: true, data: buffer.toString('utf8') });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
