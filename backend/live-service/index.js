const express = require('express');
const cors = require('cors');
const NodeMediaServer = require('node-media-server');
const sequelize = require('./src/config/db');
const liveRoutes = require('./src/routes/liveRoutes');
const { connectRabbitMQ } = require('./src/config/rabbitmq');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5015;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', liveRoutes); // Gateway routes /api/v1/live to here

// Check Health
app.get('/health', (req, res) => res.send({ status: 'OK', service: 'Live Service' }));

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// Node Media Server Config
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
        mediaroot: './media', // Where to store HLS fragments
    },
    trans: {
        ffmpeg: ffmpegPath,
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
            }
        ]
    }
};

const nms = new NodeMediaServer(nmsConfig);

// Connect NMS events to our callbacks manually if needed, or rely on HTTP callbacks
// We configured routes for webhooks, so let's tell NMS to use them
// Actually NMS has built-in event listeners. We can use those directly instead of HTTP webhooks if we share the process.
// But using HTTP webhooks is more decoupled.
// Let's use internal listeners since we are in the same process, it's easier.
// Wait, Controller logic is nice to keep reused.
// I'll call controller methods directly or sending request to myself? 
// Direct call is better.

const liveController = require('./src/controllers/liveController');

nms.on('prePublish', (id, StreamPath, args) => {
    // StreamPath is like /live/streamKey
    // args are query params
    const streamKey = StreamPath.split('/').pop();
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    // Here we could validate the key against DB before allowing stream
    // For now we just log
});

nms.on('postPublish', (id, StreamPath, args) => {
    const streamKey = StreamPath.split('/').pop();
    // Simulate webhook call
    liveController.onPublish({ body: { name: streamKey } }, { status: () => ({ send: () => { } }), send: () => { } });
});

nms.on('donePublish', (id, StreamPath, args) => {
    const streamKey = StreamPath.split('/').pop();
    liveController.onDone({ body: { name: streamKey } }, { status: () => ({ send: () => { } }), send: () => { } });
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
// Trigger restart after DB creation
