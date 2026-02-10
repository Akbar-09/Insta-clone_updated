const NodeMediaServer = require('node-media-server');
const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

const nmsConfig = {
    rtmp: {
        port: 1936, // Different port for testing
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8001, // Different port for testing
        allow_origin: '*',
        mediaroot: path.join(__dirname, 'test_media'),
    },
    trans: {
        ffmpeg: ffmpegPath,
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            }
        ]
    },
    logType: 3
};

const nms = new NodeMediaServer(nmsConfig);
nms.run();

setTimeout(() => {
    console.log('Test session finished');
    process.exit(0);
}, 60000);
