const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('Media', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    originalName: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    r2Key: { // New: Store the object key
        type: DataTypes.STRING,
    },
    cdnUrl: { // New: Store the CDN URL (might be same as url, but kept for clarity)
        type: DataTypes.STRING,
    },
    tempKey: { // New: Store the original temp key for fallback
        type: DataTypes.STRING,
    },
    thumbnailUrl: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.ENUM('image', 'video'),
        allowNull: false,
    },
    mimeType: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.INTEGER, // Size in bytes
    },
    width: {
        type: DataTypes.INTEGER,
    },
    height: {
        type: DataTypes.INTEGER,
    },
    duration: {
        type: DataTypes.FLOAT, // For videos, in seconds
    },
    uploadStatus: {
        type: DataTypes.ENUM('uploading', 'processing', 'completed', 'failed'),
        defaultValue: 'uploading',
    },
    processingError: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: true,
});

module.exports = Media;
