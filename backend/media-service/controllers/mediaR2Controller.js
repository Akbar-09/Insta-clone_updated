const { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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
        console.log(`[MediaService] Serving ${key} (Range: ${range || 'none'})`);

        // Closure to handle R2 streaming with Range support
        const streamFromR2 = async (targetKey) => {
            try {
                // 1. Get Metadata (Total Size & Content Type)
                const headCommand = new HeadObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: targetKey
                });
                const headData = await r2Client.send(headCommand);
                const totalSize = headData.ContentLength;
                // R2 sometimes stores mp4 as 'application/octet-stream' — fix to ensure browser video playback
                let contentType = headData.ContentType || 'application/octet-stream';
                if (targetKey.endsWith('.mp4') && contentType === 'application/octet-stream') {
                    contentType = 'video/mp4';
                } else if (targetKey.endsWith('.webm')) {
                    contentType = 'video/webm';
                } else if (targetKey.endsWith('.webp')) {
                    contentType = 'image/webp';
                }

                // Set Common Headers
                res.set('Content-Type', contentType);
                res.set('Accept-Ranges', 'bytes');
                res.set('Cache-Control', 'public, max-age=31536000');
                res.set('Access-Control-Allow-Origin', '*');
                res.set('Access-Control-Allow-Headers', 'Range');
                res.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges');
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
                    res.set('Content-Length', totalSize);
                    Body.pipe(res);
                }
                return true;
            } catch (err) {
                if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
                    return false; // Let it fall back
                }
                throw err;
            }
        };

        // 1. Try Direct Key from R2
        let handled = await streamFromR2(key);
        if (handled) return;

        // 2. Fallback: Search in Database
        console.log(`[R2 Fallback] Key ${key} not found directly. Checking database...`);
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
            if (mediaRecord.r2Key && mediaRecord.r2Key !== key) {
                console.log(`[R2 Fallback] Found r2Key in DB: ${mediaRecord.r2Key}`);
                handled = await streamFromR2(mediaRecord.r2Key);
                if (handled) return;
            }
            if (mediaRecord.tempKey && mediaRecord.tempKey !== key && mediaRecord.tempKey !== mediaRecord.r2Key) {
                console.log(`[R2 Fallback] Found tempKey in DB: ${mediaRecord.tempKey}`);
                handled = await streamFromR2(mediaRecord.tempKey);
                if (handled) return;
            }
        }

        // 3. Last Ditch: Pattern Match in R2 folders
        // Extract the filename portion and the extension:
        const basename = path.basename(key); // e.g. "1771562239481-211424583.jpg"
        const ext = path.extname(basename);   // e.g. ".jpg"
        const nameNoExt = path.basename(basename, ext); // e.g. "1771562239481-211424583"

        // Try to match UUID (36-char hex) or timestamp-random format (13digits-Ndigits)
        const idMatch = key.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9]{10,}-[0-9]+)/);
        const idPart = idMatch ? idMatch[1] : nameNoExt;
        console.log(`[R2 Fallback] Attempting pattern match for ${idPart}, ext=${ext}`);

        const possiblePaths = [
            // Try exact basename in all known folders (covers temp timestamp uploads)
            `${FOLDER_NAME}/temp/${basename}`,
            `${FOLDER_NAME}/posts/images/${basename}`,
            `${FOLDER_NAME}/posts/videos/${basename}`,
            `${FOLDER_NAME}/profiles/${basename}`,
            `${FOLDER_NAME}/stories/${basename}`,
            // Try optimized/processed variants
            `${FOLDER_NAME}/profiles/temp_${idPart}_opt.webp`,
            `${FOLDER_NAME}/posts/images/temp_${idPart}_opt.webp`,
            `${FOLDER_NAME}/posts/videos/${idPart}.mp4`,
            `${FOLDER_NAME}/temp/${idPart}.mp4`,
            `${FOLDER_NAME}/temp/${idPart}.webp`,
            `${FOLDER_NAME}/temp/${idPart}${ext}`,
        ];

        for (const fKey of possiblePaths) {
            handled = await streamFromR2(fKey);
            if (handled) {
                console.log(`[R2 Fallback] Pattern Match Success: ${fKey}`);
                return;
            }
        }

        // 4. Final Fallback: Local Filesystem (Great for non-migrated videos)
        const localPath = path.join(__dirname, '../uploads', path.basename(key));
        if (fs.existsSync(localPath)) {
            console.log(`[R2 Fallback] Serving from local filesystem: ${localPath}`);
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            // sendFile handles Range internally!
            return res.sendFile(localPath);
        }

        console.error(`[MediaService] File not found: ${key}`);
        res.status(404).send('File not found');

    } catch (error) {
        console.error('Serve File Global Error:', error.message);
        if (!res.headersSent) {
            res.status(500).send('Error serving file');
        }
    }
};

module.exports = { getPresignedUrl, finalizeUpload, serveFile };
