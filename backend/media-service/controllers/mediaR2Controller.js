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
        console.log(`[MediaService] Serving ${key} from bucket ${BUCKET_NAME} (Range: ${range || 'none'})`);

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
            // Try exact basename in all known folders
            `${FOLDER_NAME}/temp/${basename}`,
            `${FOLDER_NAME}/posts/images/${basename}`,
            `${FOLDER_NAME}/posts/videos/${basename}`,
            `${FOLDER_NAME}/profiles/${basename}`,
            `${FOLDER_NAME}/stories/${basename}`,
            `${FOLDER_NAME}/thumbnails/${basename}`,

            // Try optimized/processed variants
            `${FOLDER_NAME}/posts/images/${nameNoExt}_opt.webp`,
            `${FOLDER_NAME}/posts/images/${nameNoExt}_opt.jpg`,
            `${FOLDER_NAME}/posts/videos/${nameNoExt}_opt.mp4`,
            `${FOLDER_NAME}/profiles/${nameNoExt}_opt.webp`,
            `${FOLDER_NAME}/profiles/${nameNoExt}_opt.jpg`,

            // Try using idPart (in case of double extensions or weirdness)
            `${FOLDER_NAME}/posts/images/temp_${idPart}_opt.webp`,
            `${FOLDER_NAME}/posts/images/temp_${idPart}_opt.jpg`,
            `${FOLDER_NAME}/posts/videos/${idPart}.mp4`,
            `${FOLDER_NAME}/posts/videos/${idPart}_opt.mp4`,
            `${FOLDER_NAME}/temp/${idPart}.mp4`,
            `${FOLDER_NAME}/temp/${idPart}_opt.mp4`,
            `${FOLDER_NAME}/temp/${idPart}.webp`,
            `${FOLDER_NAME}/temp/${idPart}_opt.webp`,
        ];

        for (const fKey of possiblePaths) {
            handled = await streamFromR2(fKey);
            if (handled) {
                console.log(`[R2 Fallback] Pattern Match Success: ${fKey}`);
                return;
            }
        }

        // 4. Final Fallback: Local Filesystem
        const localPath = path.join(__dirname, '../uploads', path.basename(key));
        if (fs.existsSync(localPath)) {
            console.log(`[R2 Fallback] Serving from local filesystem: ${localPath}`);
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            return res.sendFile(localPath);
        }

        // --- PLACEHOLDER SYSTEM ---
        // If file is still not found, serve a deterministic placeholder to avoid broken UI
        console.error(`[MediaService] File not found: ${key}. Serving placeholder.`);
        const extName = path.extname(key).toLowerCase();
        const isVideoFile = ['.mp4', '.mov', '.avi'].includes(extName);

        if (isVideoFile) {
            const placeholderVideo = 'Jaadoe/posts/videos/1771052741909-249183001_opt.mp4';
            handled = await streamFromR2(placeholderVideo);
            if (handled) return;
        } else {
            // 50 diverse placeholders sampled evenly from 1,367 R2 images across Jaadoe/Omre/wnsocial
            const imagePlaceholders = [
                'Jaadoe/posts/images/1771066396792-828752180_opt.webp',
                'Jaadoe/posts/images/temp_84999aed-feaa-4031-a254-ee866ad2cd2c_opt.webp',
                'Omre/Image/Originals/10d2814ffa7389bb403ca3ceb8f651989.jpg',
                'Omre/Image/Originals/2610d6a1a10413f610b104d8a110007128dac.jpg',
                'Omre/Image/Originals/40e1b9e139f8d686421a1cda796d0e31.png',
                'Omre/Image/Originals/58107495298226ab979be245cf3c6446d.jpg',
                'Omre/Image/Originals/6c5bfc41e7b4ae31e1df171549234d98.jpg',
                'Omre/Image/Originals/82ef9ba31ab2a8b937118bc76cb33352.png',
                'Omre/Image/Originals/9b99e2e1c175dd521aae13d6dca83ea5.jpg',
                'Omre/Image/Originals/b2eea11b2fe67e67adbccb43719deb4a.jpg',
                'Omre/Image/Originals/c6de2c101255376dd4f65dc8ffeb63ae6.jpg',
                'Omre/Image/Originals/e1d8d73e1bbc768f0629f9100ad227cf1.jpg',
                'Omre/Image/Originals/fd87510db4318cfd61099017bcbd6bd4f2.jpg',
                'Omre/Image/Processed/10b315e827c3a5d13e361015591f97e4ba_med.webp',
                'Omre/Image/Processed/23aeffb89df1107d236c02f9b92f7b75b_med.webp',
                'Omre/Image/Processed/3c1bb810a2822d4586eaa9265b2f8472b_med.webp',
                'Omre/Image/Processed/5569fbea2da8973ec458d3eeb121c1034_med.webp',
                'Omre/Image/Processed/6972adb14cba56f0fa2164c18cffb07b_med.webp',
                'Omre/Image/Processed/7deeb2a12819df93b8e8311049dc95259_med.webp',
                'Omre/Image/Processed/986ece47c2c22e7f0889351021d88dbe7_med.webp',
                'Omre/Image/Processed/ae9276cb625eb102e0fa7d33999d617f_med.webp',
                'Omre/Image/Processed/c05e5b710658a108110410887cc7183229db_med.webp',
                'Omre/Image/Processed/db2f738fc114b77a0093a279cd8ba1c3_med.webp',
                'Omre/Image/Processed/f2b4b85fe410db63e84da0c7f7cfae6d1_med.webp',
                'Omre/Image/Processed/system/1024b6f7815bcd258fb6a9e3d5d4c9c8b_compressed.jpg',
                'Omre/Image/Processed/system/2388f737f279863774d069210101081b546_compressed.jpg',
                'Omre/Image/Processed/system/37ddc720a149d8f481073831b1bc64b6e.webp',
                'Omre/Image/Processed/system/51e67ad99108c724872d00d210667d61a3_compressed.jpg',
                'Omre/Image/Processed/system/776691cb7276578850d1fbdfe5ee95d5_compressed.jpg',
                'Omre/Image/Processed/system/9eda7751029c7922ef473ac57991321a7.webp',
                'Omre/Image/Processed/system/b37c3ffc2c4a6e5d0870bfcf5725df89.webp',
                'Omre/Image/Processed/system/d8159c65aa5e8d1a41d5384871022c4fc_compressed.jpg',
                'Omre/Image/Processed/system/f6d65d53f2472150d754effdadaef7103_compressed.jpg',
                'Omre/Image/Thumbnails/100f5a3edbacc7b2c2ae8d216edf92518_thumb.webp',
                'Omre/Image/Thumbnails/1b7577281915485cc9bfc425cc41bc99_thumb.webp',
                'Omre/Image/Thumbnails/34384fccae99acd1a77f87a56a744469_thumb.webp',
                'Omre/Image/Thumbnails/4e2f45cf6062c832ffa14f910d32370a8_thumb.webp',
                'Omre/Image/Thumbnails/62aae8a83a91ea6dd2a1bfa18781744c_thumb.webp',
                'Omre/Image/Thumbnails/7539150dc08777112522b4934783bbe6_thumb.webp',
                'Omre/Image/Thumbnails/91246f524d57addc9fc23fb646bdc611_thumb.webp',
                'Omre/Image/Thumbnails/a6ecc10666a6a5f92e32aa310cf73447d9_thumb.webp',
                'Omre/Image/Thumbnails/ba65edaeb10bb41cdd69ce0692bf8f7a2_thumb.webp',
                'Omre/Image/Thumbnails/d82bcbf5623ab35def4b3538f9a2c74e_thumb.webp',
                'Omre/Image/Thumbnails/ea3d76c71906896a02bd8ef5100f38249_thumb.webp',
                'Omre/Image/Thumbnails/system/10190d869a0101c8104bd99ccf31586a434_thumb.jpg',
                'Omre/Image/Thumbnails/system/31b4379fde3972eca102cbc4b77533a54_thumb.jpg',
                'Omre/Image/Thumbnails/system/6d4f2aeaed6ba345a5fed2352b9d9174_thumb.jpg',
                'Omre/Image/Thumbnails/system/ab8b7ed108cce10887cf9c10f1198ba7459_thumb.jpg',
                'Omre/Image/Thumbnails/system/e53680a7ba25859989c2cc6e337dd0b10_thumb.jpg',
                'wnsocial/images/480340ce-b0db-401e-a7aa-161baaef206c/thumbnails/2e61fda3-6bb3-4fa5-9972-208d8819cfd3.webp'
            ];

            // Deterministically pick one based on the requested filename
            let hash = 0;
            const keyToHash = path.basename(key);
            for (let i = 0; i < keyToHash.length; i++) {
                hash = ((hash << 5) - hash) + keyToHash.charCodeAt(i);
                hash |= 0;
            }
            const index = Math.abs(hash) % imagePlaceholders.length;
            const placeholderImage = imagePlaceholders[index];

            console.log(`[R2 Fallback] Serving dynamic placeholder index ${index}: ${placeholderImage} for ${keyToHash}`);
            handled = await streamFromR2(placeholderImage);
            if (handled) return;
            console.error(`[R2 Fallback] FAILED to serve image placeholder: ${placeholderImage}`);
        }

        console.error(`[MediaService] Giving up on ${key}. Sending 404.`);
        res.status(404).send('File not found');

    } catch (error) {
        console.error('Serve File Global Error:', error.message);
        if (!res.headersSent) {
            res.status(500).send('Error serving file');
        }
    }
};

module.exports = { getPresignedUrl, finalizeUpload, serveFile };
