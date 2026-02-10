const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { r2Client } = require('../config/s3');
const sharp = require('sharp');
require('dotenv').config();

exports.uploadThumbnail = async (fileBuffer, fileName) => {
    try {
        // Compress image using sharp
        const compressedBuffer = await sharp(fileBuffer)
            .resize(1280, 720, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();

        const key = `live/thumbnails/${Date.now()}-${fileName}`;

        await r2Client.send(new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            Body: compressedBuffer,
            ContentType: 'image/jpeg'
        }));

        return `${process.env.R2_PUBLIC_DOMAIN}/${key}`;
    } catch (error) {
        console.error('Thumbnail Upload Error:', error);
        throw error;
    }
};
