const { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { NodeHttpHandler } = require("@smithy/node-http-handler");
const Media = require('../models/Media');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const sharp = require('sharp');

require('dotenv').config();

const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    requestHandler: new NodeHttpHandler({
        connectionTimeout: 2000,
        socketTimeout: 30000,
        maxSockets: 500
    }),
    forcePathStyle: true
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'omretesting';
const FOLDER_NAME = 'Jaadoe'; // Root folder for the app in R2

const getPresignedUrl = async (req, res) => {
    try {
        const { filename, fileType, contentType, context } = req.body;
        const userId = req.headers['x-user-id'] || 'anonymous';
        const timestamp = Date.now();
        const uuid = require('crypto').randomUUID();

        // Final Path: Jaadoe/temp/UUID.ext
        const extension = path.extname(filename);
        const key = `${FOLDER_NAME}/temp/${uuid}${extension}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        });

        const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

        // Create initial media record
        const media = await Media.create({
            id: uuid,
            filename: `${uuid}${extension}`,
            originalName: filename,
            url: `${process.env.R2_PUBLIC_DOMAIN}/${key}`,
            r2Key: key,
            tempKey: key,
            type: fileType === 'video' ? 'video' : 'image',
            mimeType: contentType,
            uploadStatus: 'uploading'
        });

        res.json({
            uploadUrl,
            key,
            mediaId: media.id
        });
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        res.status(500).json({ error: 'Failed to generate upload URL' });
    }
};

const finalizeUpload = async (req, res) => {
    try {
        const { mediaId, key, context, metadata } = req.body;

        const media = await Media.findByPk(mediaId);
        if (!media) return res.status(404).json({ error: 'Media record not found' });

        // Update status to processing
        await media.update({ uploadStatus: 'processing' });

        // Background: Download from R2, process (resize/optimize), upload back to R2, delete temp
        processInBackground(mediaId, key, context, metadata);

        res.json({ message: 'Upload finalized, processing started', mediaId });
    } catch (error) {
        console.error('Error finalizing upload:', error);
        res.status(500).json({ error: 'Failed to finalize upload' });
    }
};

const processInBackground = async (mediaId, key, context, metadata) => {
    const tempDownloadPath = path.join(__dirname, '../uploads', `temp_${mediaId}`);
    try {
        // 1. Download from R2
        const getCommand = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
        const { Body } = await r2Client.send(getCommand);

        const writer = fs.createWriteStream(tempDownloadPath);
        await new Promise((resolve, reject) => {
            Body.pipe(writer);
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // 2. Process based on type
        const media = await Media.findByPk(mediaId);
        let finalKey = key;
        let cdnUrl = media.url;

        if (media.type === 'image') {
            const processedFilename = `temp_${mediaId}_opt.webp`;
            const processedPath = path.join(__dirname, '../uploads', processedFilename);

            await sharp(tempDownloadPath)
                .webp({ quality: 80 })
                .toFile(processedPath);

            // Upload processed image
            const folder = context === 'story' ? 'stories' : (context === 'profile' ? 'profiles' : 'posts/images');
            finalKey = `${FOLDER_NAME}/${folder}/${processedFilename}`;

            const uploadCommand = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: finalKey,
                Body: fs.readFileSync(processedPath),
                ContentType: 'image/webp'
            });
            await r2Client.send(uploadCommand);

            cdnUrl = `${process.env.R2_PUBLIC_DOMAIN}/${finalKey}`;

            // Cleanup processed local file
            if (fs.existsSync(processedPath)) fs.unlinkSync(processedPath);
        } else {
            // For videos, we just move them to the right folder for now
            const folder = context === 'story' ? 'stories' : 'posts/videos';
            finalKey = `${FOLDER_NAME}/${folder}/${media.filename}`;

            const uploadCommand = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: finalKey,
                Body: fs.readFileSync(tempDownloadPath),
                ContentType: media.mimeType
            });
            await r2Client.send(uploadCommand);
            cdnUrl = `${process.env.R2_PUBLIC_DOMAIN}/${finalKey}`;
        }

        const originalUrl = media.url;

        // 3. Update Database
        await Media.update({
            uploadStatus: 'completed',
            r2Key: finalKey,
            url: cdnUrl,
            cdnUrl: cdnUrl
        }, { where: { id: mediaId } });

        // 4. Publish Event for consistency
        const { publishEvent } = require('../config/rabbitmq');
        await publishEvent('MEDIA.OPTIMIZED', {
            mediaId: mediaId,
            originalUrl: originalUrl,
            optimizedUrl: cdnUrl,
            thumbnailUrl: cdnUrl, // For images, thumbnail is same for now
            type: media.type
        });

        // 5. Cleanup temp R2 and local
        try {
            // Delete original temp from R2
            const deleteCommand = require('@aws-sdk/client-s3').DeleteObjectCommand;
            await r2Client.send(new deleteCommand({ Bucket: BUCKET_NAME, Key: key }));
        } catch (e) {
            console.warn('Failed to delete temp R2 object:', e);
        }

        if (fs.existsSync(tempDownloadPath)) fs.unlinkSync(tempDownloadPath);

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

        const range = req.headers.range;
        console.log(`[MediaService v2-DEBUG] Requested File: ${key} (Range: ${range || 'none'})`);

        // Closure to handle R2 streaming with Range support
        const streamFromR2 = async (targetKey) => {
            try {
                console.log(`[MediaService] Checking R2: ${targetKey}`);
                // 1. Get Metadata (Total Size & Content Type)
                const headCommand = new HeadObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: targetKey
                });
                const headData = await r2Client.send(headCommand);
                const totalSize = headData.ContentLength;
                const contentType = headData.ContentType || 'application/octet-stream';

                console.log(`[MediaService] Found in R2! Size: ${totalSize}, Type: ${contentType}`);
                // Set Common Headers
                res.set('Content-Type', contentType);
                res.set('Accept-Ranges', 'bytes');
                res.set('Cache-Control', 'public, max-age=31536000');
                res.set('Access-Control-Allow-Origin', '*');
                res.set('Cross-Origin-Resource-Policy', 'cross-origin');

                if (range) {
                    const parts = range.replace(/bytes=/, "").split("-");
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

                    if (isNaN(start) || start >= totalSize) {
                        res.status(416).send('Requested range not satisfiable');
                        return true;
                    }

                    const chunkSize = (end - start) + 1;
                    const getCommand = new GetObjectCommand({
                        Bucket: BUCKET_NAME,
                        Key: targetKey,
                        Range: `bytes=${start}-${end}`
                    });

                    const { Body } = await r2Client.send(getCommand);

                    req.on('close', () => { if (Body && typeof Body.destroy === 'function') Body.destroy(); });

                    res.status(206);
                    res.set('Content-Range', `bytes ${start}-${end}/${totalSize}`);
                    res.set('Content-Length', chunkSize);
                    Body.pipe(res);
                } else {
                    const getCommand = new GetObjectCommand({
                        Bucket: BUCKET_NAME,
                        Key: targetKey
                    });
                    const { Body } = await r2Client.send(getCommand);

                    req.on('close', () => { if (Body && typeof Body.destroy === 'function') Body.destroy(); });

                    res.set('Content-Length', totalSize);
                    Body.pipe(res);
                }
                return true;
            } catch (err) {
                if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
                    console.log(`[MediaService] Not found in R2: ${targetKey}`);
                    return false; // Let it fall back
                }
                // Also fallback on connection timeouts or other R2 errors to prioritize availability
                console.error(`[MediaService] R2 Error for ${targetKey}:`, err.message);
                return false;
            }
        };

        // 1. Try Direct Key from R2
        let handled = await streamFromR2(key);
        if (handled) return;

        // 2. Fallback: Search in Database
        console.log(`[MediaService] Fallback: Checking DB for ${key}`);
        const mediaRecord = await Media.findOne({
            where: {
                [Op.or]: [
                    { r2Key: key },
                    { tempKey: key },
                    { url: { [Op.like]: `%${key}%` } }
                ]
            }
        });

        if (mediaRecord) {
            console.log(`[MediaService] Found DB record! r2Key: ${mediaRecord.r2Key}`);
            if (mediaRecord.r2Key && mediaRecord.r2Key !== key) {
                handled = await streamFromR2(mediaRecord.r2Key);
                if (handled) return;
            }
            if (mediaRecord.tempKey && mediaRecord.tempKey !== key && mediaRecord.tempKey !== mediaRecord.r2Key) {
                console.log(`[R2 Fallback] Found tempKey in DB: ${mediaRecord.tempKey}`); // This line was not in the instruction, keeping original
                handled = await streamFromR2(mediaRecord.tempKey);
                if (handled) return;
            }
        }

        // 3. Fallback: Local Filesystem (Quick check before exhaustive R2 search)
        let localPath = path.join(__dirname, '../uploads', key);
        if (!fs.existsSync(localPath)) {
            localPath = path.join(__dirname, '../uploads', path.basename(key));
        }

        if (fs.existsSync(localPath)) {
            console.log(`[MediaService] Found locally! Serving...`);
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            return res.sendFile(localPath);
        }

        // 4. Last Ditch: UUID or Timestamp-Rand Pattern Match in R2 folders
        const uuidMatch = key.match(/([0-9a-f-]{36}|[0-9]{13}-[0-9]{9})/);
        if (uuidMatch) {
            const idPart = uuidMatch[1];
            const extension = path.extname(key) || '.webp';
            console.log(`[MediaService] Last Ditch Match for ID: ${idPart}`);

            const possiblePaths = [
                // Try as optimized webp in all folders
                `${FOLDER_NAME}/posts/images/${idPart}_opt.webp`,
                `${FOLDER_NAME}/profiles/${idPart}_opt.webp`,
                `${FOLDER_NAME}/stories/${idPart}_opt.webp`,
                // Try original extension in all folders
                `${FOLDER_NAME}/posts/images/${idPart}${extension}`,
                `${FOLDER_NAME}/posts/videos/${idPart}${extension}`,
                `${FOLDER_NAME}/profiles/${idPart}${extension}`,
                `${FOLDER_NAME}/stories/${idPart}${extension}`,
                `${FOLDER_NAME}/temp/${idPart}${extension}`,
                // Try direct root or temp hits
                `${idPart}${extension}`,
                `Jaadoe/temp/${idPart}${extension}`
            ];

            for (const fKey of possiblePaths) {
                handled = await streamFromR2(fKey);
                if (handled) {
                    // console.log(`[R2 Fallback] Pattern Match Success: ${fKey}`); // Removed as per instruction
                    return;
                }
            }
        }

        console.warn(`[MediaService] File not found: ${key}. Redirecting to placeholder.`);
        // Redirect to a clean placeholder image to prevent broken UI and 404 console noise
        const placeholderName = key.includes('thumb') ? 'Thumbnail' : (key.includes('opt') ? 'Optimized' : 'Media');
        return res.redirect(`https://ui-avatars.com/api/?name=${placeholderName}&background=f3f4f6&color=9ca3af&size=512&semibold=true&format=svg`);
    } catch (error) {
        console.error('[MediaService] Global Error:', error);
        if (!res.headersSent) {
            res.status(500).send('Error serving file');
        }
    }
};

module.exports = { getPresignedUrl, finalizeUpload, serveFile };
