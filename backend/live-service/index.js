require('dotenv').config();
const express = require('express');
const cors = require('cors');
const NodeMediaServer = require('node-media-server');
const path = require('path');
const fs = require('fs');
const sequelize = require('./src/config/db');
const models = require('./src/models');
const liveRoutes = require('./src/routes/liveRoutes');
const { connectRabbitMQ } = require('./src/config/rabbitmq');

const app = express();
const PORT = process.env.PORT || 5015;

// Custom log file for debugging
const logFile = path.join(__dirname, 'live_service_debug.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

const originalStdoutWrite = process.stdout.write;
process.stdout.write = function (chunk, encoding, callback) {
    if (chunk) logStream.write(chunk);
    return originalStdoutWrite.apply(process.stdout, arguments);
};

const originalStderrWrite = process.stderr.write;
process.stderr.write = function (chunk, encoding, callback) {
    if (chunk) logStream.write(`ERROR: ${chunk}`);
    return originalStderrWrite.apply(process.stderr, arguments);
};

console.log('--- LIVE SERVICE STARTING V16 (Internal HLS) ---');

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.send({ status: 'OK', service: 'Live Service', v: 16 }));

const mediaPath = 'C:\\live_media';
const livePath = path.join(mediaPath, 'live');

if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath, { recursive: true });
if (!fs.existsSync(livePath)) fs.mkdirSync(livePath, { recursive: true });

// Static serving for HLS on port 5015
app.use('/live', (req, res, next) => {
    console.log(`[HLS REQUEST] ${req.method} ${req.url}`);
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
}, express.static(livePath));

app.get('/debug/files', (req, res) => {
    try {
        const getAllFiles = (dirPath, arrayOfFiles = []) => {
            if (!fs.existsSync(dirPath)) return [];
            const files = fs.readdirSync(dirPath);
            files.forEach(file => {
                const fullPath = path.join(dirPath, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
                } else {
                    arrayOfFiles.push(fullPath);
                }
            });
            return arrayOfFiles;
        };
        const files = getAllFiles(mediaPath);
        res.json({ status: 'OK', mediaPath, files });
    } catch (e) {
        res.status(500).json({ status: 'ERROR', message: e.message });
    }
});

app.use('/', liveRoutes);

app.use((req, res) => {
    console.log(`[API 404] ${req.method} ${req.url}`);
    res.status(404).json({ status: 'error', message: 'Route not found' });
});

const ffmpegPath = 'C:\\live_media\\ffmpeg.exe';

const nmsConfig = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*',
        mediaroot: mediaPath,
        // ENABLE INTERNAL HLS (Transmuxing without re-encoding)
        hls: true
    },
    // DISABLED EXPLICIT TRANS TASKS TO TEST INTERNAL TRANSMUXING
    /*
    trans: {
        ffmpeg: ffmpegPath,
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: 'hls_time=4:hls_list_size=5:hls_flags=delete_segments',
                dash: false
            }
        ]
    },
    */
    logType: 3
};

const nms = new NodeMediaServer(nmsConfig);
const liveController = require('./src/controllers/liveController');

nms.on('preConnect', (id, args) => { console.log('[NMS] preConnect:', id, JSON.stringify(args)); });
nms.on('postConnect', (id, args) => { console.log('[NMS] postConnect:', id, JSON.stringify(args)); });
nms.on('prePublish', (id, StreamPath, args) => {
    console.log('[NMS] prePublish:', id, StreamPath);
    const streamKey = StreamPath.split('/').pop();
    const streamDir = path.join(livePath, streamKey);
    if (!fs.existsSync(streamDir)) {
        fs.mkdirSync(streamDir, { recursive: true });
        console.log('[NMS] Created directory in prePublish:', streamDir);
    }
});
nms.on('postPublish', (id, StreamPath, args) => {
    const streamKey = StreamPath.split('/').pop();
    console.log('[NMS] postPublish:', id, StreamPath, 'key:', streamKey);
    liveController.onPublish({ body: { name: streamKey } }, {
        status: () => ({ send: () => { } }),
        send: () => { }
    });
});
nms.on('donePublish', (id, StreamPath, args) => {
    const streamKey = StreamPath.split('/').pop();
    console.log('[NMS] donePublish:', id, StreamPath);
    liveController.onDone({ body: { name: streamKey } }, {
        status: () => ({ send: () => { } }),
        send: () => { }
    });
});

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced');
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Live Service API running on port ${PORT}`);
        });
        nms.run();
        console.log('Node Media Server started');
    } catch (error) {
        console.error('Failed to start Live Service:', error);
    }
};

startServer();
