const { r2Client, isConfigured } = require('../config/r2');
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { Op } = require('sequelize');
const Media = require('../models/Media');
const { processImage } = require('../utils/imageProcessor');
const { processVideo } = require('../utils/videoProcessor');
const { connectRabbitMQ, publishEvent } = require('../config/rabbitmq');
const fs = require('fs');
const { pipeline } = require('stream/promises');

connectRabbitMQ();

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';
const PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || 'http://localhost:5013/uploads';
const FOLDER_NAME = 'Jaadoe'; // Root folder in R2 bucket

const getPresignedUrl = async (req, res) => {
    try {
        if (!isConfigured) {
            return res.status(400).json({ status: 'error', message: 'Cloudflare R2 is not configured' });
        }
        const { filename, fileType, context } = req.body;

        if (!filename || !fileType) {
            return res.status(400).json({ status: 'error', message: 'Missing filename or fileType' });
        }

        const ext = path.extname(filename);
        const uuid = uuidv4();
        // Use a temp prefix for raw uploads under folder name
        const key = `${FOLDER_NAME}/temp/${uuid}${ext}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        });

        const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

        res.json({
            status: 'success',
            data: {
                uploadUrl,
                key, // Frontend sends this back after upload
                uuid,
                publicUrl: `${PUBLIC_DOMAIN}/${key}`
            }
        });

    } catch (error) {
        console.error('Presigned URL Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const finalizeUpload = async (req, res) => {
    try {
        const { key, filename, fileType, size, context = 'feed' } = req.body;

        if (!key) return res.status(400).json({ error: 'Key is required' });

        const isVideo = fileType.startsWith('video/');
        const type = isVideo ? 'video' : 'image';

        // Create DB record
        const media = await Media.create({
            filename: key, // Initially the temp key
            originalName: filename,
            r2Key: key,
            tempKey: key, // Store temp key for fallback
            url: `${PUBLIC_DOMAIN}/${key}`,
            cdnUrl: `${PUBLIC_DOMAIN}/${key}`,
            type: type,
            mimeType: fileType,
            size: size,
            uploadStatus: 'processing' // Queued for processing
        });

        res.status(201).json({
            status: 'success',
            message: 'Upload finalized, processing started.',
            data: media
        });

        // Trigger processing
        processR2MediaBackground(media.id, key, type, context);

    } catch (error) {
        console.error('Finalize Upload Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const processR2MediaBackground = async (mediaId, tempKey, type, context) => {
    const tempDownloadPath = path.join(__dirname, '../uploads', `temp_${path.basename(tempKey)}`);

    try {
        console.log(`[R2] Processing ${mediaId}... downloading ${tempKey}`);

        // 1. Download from R2 temp
        const getCommand = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: tempKey
        });
        const data = await r2Client.send(getCommand);
        await pipeline(data.Body, fs.createWriteStream(tempDownloadPath));

        // 2. Process Locally
        let result;
        if (type === 'image') {
            result = await processImage(tempDownloadPath, context);
        } else if (type === 'video') {
            result = await processVideo(tempDownloadPath, context);
        }

        // 3. Upload Optimized to R2 (Final Path)
        // Determine prefix based on context
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

        const finalKey = `${FOLDER_NAME}/${prefix}/${result.filename}`;

        await r2Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: finalKey,
            Body: fs.createReadStream(result.path),
            ContentType: result.mimetype,
            CacheControl: 'public, max-age=31536000' // 1 Year Cache
        }));

        let thumbnailKey = null;
        if (result.thumbnailFilename) {
            thumbnailKey = `${FOLDER_NAME}/thumbnails/${result.thumbnailFilename}`;
            // Assuming thumbnail generated in same dir as result.path
            const thumbPath = path.join(path.dirname(result.path), result.thumbnailFilename);
            if (fs.existsSync(thumbPath)) {
                await r2Client.send(new PutObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: thumbnailKey,
                    Body: fs.createReadStream(thumbPath),
                    ContentType: 'image/jpeg',
                    CacheControl: 'public, max-age=31536000'
                }));
                // Cleanup thumb
                fs.unlinkSync(thumbPath);
            }
        }

        console.log(`[R2] Uploaded optimized: ${finalKey}`);

        // 4. Update DB
        const finalUrl = `${PUBLIC_DOMAIN}/${finalKey}`;
        const finalThumbnailUrl = thumbnailKey ? `${PUBLIC_DOMAIN}/${thumbnailKey}` : null;

        await Media.update({
            r2Key: finalKey,
            url: finalUrl,
            cdnUrl: finalUrl,
            filename: result.filename,
            mimeType: result.mimetype,
            size: result.size,
            width: result.width,
            height: result.height,
            duration: result.duration || null,
            thumbnailUrl: finalThumbnailUrl,
            uploadStatus: 'completed'
        }, { where: { id: mediaId } });

        // 5. Cleanup
        fs.unlinkSync(tempDownloadPath); // Local temp
        fs.unlinkSync(result.path); // Local optimized

        // Delete R2 temp file
        await r2Client.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: tempKey }));

        // 6. Publish Event
        await publishEvent('MEDIA.OPTIMIZED', {
            mediaId,
            originalUrl: `${PUBLIC_DOMAIN}/${tempKey}`, // Old URL the frontend might have
            optimizedUrl: finalUrl,
            thumbnailUrl: finalThumbnailUrl,
            type: type
        });

    } catch (err) {
        console.error(`[R2] Processing failed for ${mediaId}`, err);
        await Media.update({
            uploadStatus: 'failed',
            processingError: err.message
        }, { where: { id: mediaId } });

        if (fs.existsSync(tempDownloadPath)) fs.unlinkSync(tempDownloadPath);
    }
};

const serveFile = async (req, res) => {
    try {
        const key = req.params[0];
        if (!key) return res.status(400).send('File key required');

        // 1. Try serving the requested key directly from R2
        try {
            const command = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key
            });
            const { Body, ContentType } = await r2Client.send(command);
            res.set('Content-Type', ContentType);
            res.set('Cache-Control', 'public, max-age=31536000');
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            return Body.pipe(res);
        } catch (r2Error) {
            // 2. If not found, check if it's a reference to a processed file
            if (r2Error.name === 'NoSuchKey' || r2Error.$metadata?.httpStatusCode === 404) {
                // Try searching the database for this key (it might have been the original temp key)
                const mediaRecord = await Media.findOne({
                    where: {
                        [Op.or]: [
                            { r2Key: key },
                            { tempKey: key }, // Check temp key
                            { url: { [Op.like]: `%${key}%` } }
                        ]
                    }
                });

                if (mediaRecord && mediaRecord.r2Key !== key) {
                    console.log(`[R2] Found fallback key in DB for ${key} -> ${mediaRecord.r2Key}`);
                    try {
                        const fallbackCommand = new GetObjectCommand({
                            Bucket: BUCKET_NAME,
                            Key: mediaRecord.r2Key
                        });
                        const { Body: fBody, ContentType: fContentType } = await r2Client.send(fallbackCommand);
                        res.set('Content-Type', fContentType);
                        res.set('Cache-Control', 'public, max-age=31536000');
                        res.set('Access-Control-Allow-Origin', '*');
                        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
                        return fBody.pipe(res);
                    } catch (e) {
                        // Fall through to error
                    }
                }

                // 3. Last ditch effort: regex UUID fallback if it was a temp key
                if (key.includes('/temp/')) {
                    const uuidMatch = key.match(/([0-9a-f-]{36})/);
                    if (uuidMatch) {
                        const uuid = uuidMatch[1];
                        console.log(`[R2 Fallback] Searching for UUID: ${uuid}`);

                        const possiblePaths = [
                            // Optimized Video
                            `${FOLDER_NAME}/posts/videos/temp_${uuid}_opt.mp4`,
                            // Optimized Image
                            `${FOLDER_NAME}/posts/images/temp_${uuid}_opt.webp`,
                            // Original Temp (if processing failed but file exists?)
                            `${FOLDER_NAME}/temp/${uuid}.mp4`,
                            `${FOLDER_NAME}/temp/${uuid}.jpg`,
                            `${FOLDER_NAME}/temp/${uuid}.png`
                        ];

                        for (const fKey of possiblePaths) {
                            try {
                                // console.log(`[R2 Fallback] Trying: ${fKey}`);
                                const fCommand = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: fKey });
                                const { Body: fBody, ContentType: fContentType } = await r2Client.send(fCommand);
                                res.set('Content-Type', fContentType);
                                res.set('Cache-Control', 'public, max-age=31536000');
                                console.log(`[R2 Fallback] SUCCESS -> Serving ${fKey}`);
                                return fBody.pipe(res);
                            } catch (e) {
                                // Continue
                            }
                        }
                    }
                }
            }
            throw r2Error;
        }
    } catch (error) {
        console.error('Serve File Error:', error);
        if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
            return res.status(404).send('File not found');
        }
        res.status(500).send('Error serving file');
    }
};

module.exports = { getPresignedUrl, finalizeUpload, serveFile };
