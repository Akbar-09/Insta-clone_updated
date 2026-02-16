const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
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

        // 3. Update Database
        await Media.update({
            uploadStatus: 'completed',
            r2Key: finalKey,
            url: cdnUrl,
            cdnUrl: cdnUrl
        }, { where: { id: mediaId } });

        // 4. Cleanup temp R2 and local
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

        // 1. Try serving the requested key directly from R2
        try {
            const command = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key
            });
            const { Body, ContentType } = await r2Client.send(command).catch(err => {
                // Throw error to be caught by inner catch if R2 fails
                throw err;
            });

            res.set('Content-Type', ContentType);
            res.set('Cache-Control', 'public, max-age=31536000');
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            return Body.pipe(res);
        } catch (r2Error) {
            // 2. If not found, check if it's a reference in the database
            const mediaRecord = await Media.findOne({
                where: {
                    [Op.or]: [
                        { r2Key: key },
                        { tempKey: key },
                        { url: { [Op.like]: `%${key}%` } }
                    ]
                }
            });

            if (mediaRecord && mediaRecord.r2Key && mediaRecord.r2Key !== key) {
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
                    console.log(`[R2] DB Fallback fetch failed for ${mediaRecord.r2Key}`);
                }
            }

            // 3. Last ditch effort: regex UUID fallback
            const uuidMatch = key.match(/([0-9a-f-]{36})/);
            if (uuidMatch) {
                const uuid = uuidMatch[1];
                const possiblePaths = [
                    `${FOLDER_NAME}/stories/temp_${uuid}_opt.webp`,
                    `${FOLDER_NAME}/posts/images/temp_${uuid}_opt.webp`,
                    `${FOLDER_NAME}/profiles/temp_${uuid}_opt.webp`,
                    `${FOLDER_NAME}/posts/videos/temp_${uuid}_opt.mp4`,
                    `${FOLDER_NAME}/messages/attachments/temp_${uuid}_opt.webp`,
                    `${FOLDER_NAME}/temp/${uuid}.mp4`,
                    `${FOLDER_NAME}/temp/${uuid}.jpg`,
                    `${FOLDER_NAME}/temp/${uuid}.png`,
                    `${FOLDER_NAME}/temp/${uuid}.webp`,
                    `${uuid}.webp`,
                    `${uuid}.mp4`,
                    `${FOLDER_NAME}/${uuid}_opt.webp`
                ];

                for (const fKey of possiblePaths) {
                    try {
                        const fCommand = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: fKey });
                        const { Body: fBody, ContentType: fContentType } = await r2Client.send(fCommand);
                        res.set('Content-Type', fContentType);
                        res.set('Cache-Control', 'public, max-age=31536000');
                        res.set('Access-Control-Allow-Origin', '*');
                        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
                        console.log(`[R2 Fallback] SUCCESS -> Serving ${fKey}`);
                        return fBody.pipe(res);
                    } catch (e) {
                        // Continue to next path
                    }
                }
            }

            // 4. Final Fallback: Check local filesystem
            const localPath = path.join(__dirname, '../uploads', path.basename(key));
            if (fs.existsSync(localPath)) {
                console.log(`[R2 Fallback] Serving from local filesystem: ${localPath}`);
                res.set('Access-Control-Allow-Origin', '*');
                res.set('Cross-Origin-Resource-Policy', 'cross-origin');
                return res.sendFile(localPath);
            }

            return res.status(404).send('File not found');
        }
    } catch (error) {
        console.error('Serve File Global Error:', error);
        res.status(500).send('Error serving file');
    }
};

module.exports = { getPresignedUrl, finalizeUpload, serveFile };
