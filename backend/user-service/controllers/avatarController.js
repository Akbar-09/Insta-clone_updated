const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require('sharp');
const path = require('path');
const crypto = require('crypto');
const UserProfile = require('../models/UserProfile');
const AccountHistory = require('../models/AccountHistory');
const { publishEvent } = require('../config/rabbitmq');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB limit
    }
});

const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'omretesting';
const FOLDER_NAME = 'Jaadoe'; // Root folder for the app in R2

exports.uploadMiddleware = upload.single('avatar');

exports.uploadAvatar = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'Please upload a file' });
        }

        const profile = await UserProfile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'Profile not found' });
        }

        const uuid = crypto.randomUUID();
        const processedFilename = `${uuid}_opt.webp`;
        const finalKey = `${FOLDER_NAME}/profiles/${processedFilename}`;

        // Compress using sharp
        const compressedBuffer = await sharp(req.file.buffer)
            .resize({ width: 500, height: 500, fit: 'cover' })
            .webp({ quality: 80 })
            .toBuffer();

        // Upload to R2
        const uploadCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: finalKey,
            Body: compressedBuffer,
            ContentType: 'image/webp'
        });
        await r2Client.send(uploadCommand);

        const cdnUrl = `${process.env.R2_PUBLIC_DOMAIN}/${finalKey}`;

        // Save to DB
        const oldPhoto = profile.profilePicture;
        profile.profilePicture = cdnUrl;
        profile.avatarUrl = cdnUrl;
        profile.avatarType = 'image';
        await profile.save();

        // Log history
        await AccountHistory.create({
            userId,
            action: 'PROFILE_PHOTO_CHANGE',
            oldValue: oldPhoto,
            newValue: cdnUrl
        });

        // Publish event
        await publishEvent('PROFILE_UPDATED', {
            userId: profile.userId,
            username: profile.username,
            fullName: profile.fullName,
            profilePicture: profile.profilePicture,
            timestamp: new Date()
        });

        res.json({
            status: 'success',
            data: {
                profilePicture: cdnUrl,
                avatarUrl: cdnUrl,
                avatarType: 'image'
            },
            message: 'Avatar uploaded successfully'
        });
    } catch (error) {
        console.error('Upload Avatar Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
