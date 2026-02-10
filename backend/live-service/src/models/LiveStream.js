const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LiveStream = sequelize.define('LiveStream', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    streamKey: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    ingestUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('Social', 'Gaming', 'Education', 'Music', 'Fitness', 'Tech'),
        allowNull: false,
        defaultValue: 'Social'
    },
    thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visibility: {
        type: DataTypes.ENUM('Public', 'Followers', 'Private'),
        defaultValue: 'Public'
    },
    status: {
        type: DataTypes.ENUM('LIVE', 'ENDED'),
        defaultValue: 'LIVE'
    },
    startedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    endedAt: {
        type: DataTypes.DATE
    },
    peakViewers: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isRecordingEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    recordingUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'live_streams',
    timestamps: true,
    indexes: [
        { fields: ['userId'] },
        { fields: ['status'] }
    ]
});

module.exports = LiveStream;
