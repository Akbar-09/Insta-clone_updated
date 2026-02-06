const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');
const { processImage } = require('../utils/imageProcessor');
const { processVideo } = require('../utils/videoProcessor');

const { connectRabbitMQ, publishEvent } = require('../config/rabbitmq');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Connect to RabbitMQ
connectRabbitMQ();

// Storage Strategy
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit for videos
}).single('file');

// Async Processor Function
const processMediaBackground = async (mediaId, filePath, type, context) => {
    try {
        console.log(`Starting processing for ${mediaId} (${type})...`);
        let result;
        if (type === 'image') {
            result = await processImage(filePath, context);
        } else if (type === 'video') {
            result = await processVideo(filePath, context);
        }

        const optimizedUrl = `/uploads/${result.filename}`;

        // Update DB with optimized details
        await Media.update({
            url: optimizedUrl,
            filename: result.filename,
            mimeType: result.mimetype,
            size: result.size,
            width: result.width,
            height: result.height,
            duration: result.duration || null,
            thumbnailUrl: result.thumbnailFilename ? `/uploads/${result.thumbnailFilename}` : null,
            uploadStatus: 'completed'
        }, { where: { id: mediaId } });

        console.log(`Processing complete for ${mediaId}. Optimized: ${result.filename}`);

        // Publish Event for other services (Post Service) to update their records
        await publishEvent('MEDIA.OPTIMIZED', {
            mediaId,
            originalUrl: `/uploads/${path.basename(filePath)}`,
            optimizedUrl: optimizedUrl,
            thumbnailUrl: result.thumbnailFilename ? `/uploads/${result.thumbnailFilename}` : null,
            type: type
        });


        // Delete Original File - DISABLED to prevent 404s until frontend uses optimized URL
        // fs.unlink(filePath, (err) => {
        //     if (err) console.error('Failed to delete original file:', filePath, err);
        //     else console.log('Original file deleted:', filePath);
        // });

    } catch (err) {
        console.error(`Processing failed for media ${mediaId}:`, err);
        await Media.update({
            uploadStatus: 'failed',
            processingError: err.message
        }, { where: { id: mediaId } });
    }
};

const uploadMedia = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
            const isVideo = req.file.mimetype.startsWith('video/');
            const type = isVideo ? 'video' : 'image';
            // Default context to 'feed' if not provided
            const context = req.body.context || 'feed';

            // Create initial DB record
            const media = await Media.create({
                filename: req.file.filename,
                originalName: req.file.originalname,
                url: `/uploads/${req.file.filename}`, // Initial temp URL
                type: type,
                mimeType: req.file.mimetype,
                size: req.file.size,
                uploadStatus: 'processing'
            });

            // Return immediate response
            res.status(201).json({
                status: 'success',
                message: 'Upload received, processing in background.',
                data: media
            });

            // Trigger background processing
            processMediaBackground(media.id, req.file.path, type, context);

        } catch (dbError) {
            console.error('Database error during upload:', dbError);
            res.status(500).json({ error: 'Database error', details: dbError.message });
        }
    });
};

const getMediaStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findByPk(id);
        if (!media) return res.status(404).json({ error: 'Media not found' });

        res.json({
            status: 'success',
            data: media
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { uploadMedia, getMediaStatus };
