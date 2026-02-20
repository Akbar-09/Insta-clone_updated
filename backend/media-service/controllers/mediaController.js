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

const { r2Client, isConfigured } = require('../config/r2');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';
const PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || 'http://localhost:5013/uploads';
const FOLDER_NAME = 'Jaadoe';

// Async Processor Function
const processMediaBackground = async (mediaId, filePath, type, context) => {
    try {
        const media = await Media.findByPk(mediaId);
        if (!media) {
            console.error(`Media record ${mediaId} not found in background processor`);
            return;
        }

        console.log(`Starting processing for ${mediaId} (${type})...`);
        let result;
        if (type === 'image') {
            result = await processImage(filePath, context);
        } else if (type === 'video') {
            result = await processVideo(filePath, context);
        }

        let finalUrl = `/uploads/${result.filename}`;
        let finalThumbnailUrl = result.thumbnailFilename ? `/uploads/${result.thumbnailFilename}` : null;
        let r2Key = null;

        console.log(`[R2 Debug] isConfigured: ${isConfigured}`);
        console.log(`[R2 Debug] PUBLIC_DOMAIN: ${PUBLIC_DOMAIN}`);

        // If R2 is configured, upload to Cloudflare R2
        if (isConfigured) {
            try {
                let prefix = 'posts/images';
                if (type === 'video') prefix = 'posts/videos';

                switch (context) {
                    case 'story': prefix = 'stories'; break;
                    case 'profile': prefix = 'profiles'; break;
                    case 'messages': prefix = 'messages/attachments'; break;
                    case 'ads': prefix = 'ads/media'; break;
                    case 'posts':
                    default:
                        if (type === 'video') prefix = 'posts/videos';
                        else prefix = 'posts/images';
                }

                r2Key = `${FOLDER_NAME}/${prefix}/${result.filename}`;
                console.log(`[R2 Debug] Target Key: ${r2Key}`);

                // Upload Optimized to R2
                await r2Client.send(new PutObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: r2Key,
                    Body: fs.createReadStream(result.path),
                    ContentType: result.mimetype,
                    CacheControl: 'public, max-age=31536000'
                }));
                console.log(`[R2 Debug] Main file uploaded successfully`);

                // Upload Thumbnail to R2 if exists
                let thumbnailKey = null;
                if (result.thumbnailFilename) {
                    thumbnailKey = `${FOLDER_NAME}/thumbnails/${result.thumbnailFilename}`;
                    const thumbPath = path.join(path.dirname(result.path), result.thumbnailFilename);
                    if (fs.existsSync(thumbPath)) {
                        await r2Client.send(new PutObjectCommand({
                            Bucket: BUCKET_NAME,
                            Key: thumbnailKey,
                            Body: fs.createReadStream(thumbPath),
                            ContentType: 'image/jpeg',
                            CacheControl: 'public, max-age=31536000'
                        }));
                        console.log(`[R2 Debug] Thumbnail uploaded successfully`);
                    }
                }

                // Update URLs to R2 (via our public endpoint or direct R2 domain)
                finalUrl = `${PUBLIC_DOMAIN}/${r2Key}`;
                finalThumbnailUrl = thumbnailKey ? `${PUBLIC_DOMAIN}/${thumbnailKey}` : null;

                console.log(`[R2 Debug] Final URL set to: ${finalUrl}`);
            } catch (r2Error) {
                console.error('[R2 Debug] Error during R2 upload:', r2Error);
                // Fallback to local URLs (already set above)
            }
        } else {
            console.log('[R2 Debug] Skipping R2 upload because isConfigured is false');
        }

        // Update DB with optimized details
        console.log(`[R2 Debug] Updating DB record ${mediaId} with URL ${finalUrl}`);
        await Media.update({
            url: finalUrl,
            cdnUrl: finalUrl,
            r2Key: r2Key,
            filename: result.filename,
            mimeType: result.mimetype,
            size: result.size,
            width: result.width,
            height: result.height,
            duration: result.duration || null,
            thumbnailUrl: finalThumbnailUrl,
            uploadStatus: 'completed'
        }, { where: { id: mediaId } });

        console.log(`Processing complete for ${mediaId}. URL: ${finalUrl}`);

        // Publish Event for other services (Post Service) to update their records
        await publishEvent('MEDIA.OPTIMIZED', {
            mediaId,
            originalUrl: media.url,
            optimizedUrl: finalUrl,
            thumbnailUrl: finalThumbnailUrl,
            type: type
        });

        // Cleanup local optimized files if uploaded to R2 (optional)
        // if (isConfigured && r2Key) {
        //     fs.unlinkSync(result.path);
        // }

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

            // Calculate initial URL using the R2-proxy format
            // This ensures consistent URLs even during the "local" phase
            const initialKey = `Jaadoe/temp/${req.file.filename}`;
            const initialUrl = `${PUBLIC_DOMAIN}/${initialKey}`;

            // Create initial DB record
            const media = await Media.create({
                filename: req.file.filename,
                originalName: req.file.originalname,
                url: initialUrl,
                tempKey: initialKey,
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
