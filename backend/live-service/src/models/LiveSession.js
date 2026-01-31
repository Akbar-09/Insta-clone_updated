const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LiveSession = sequelize.define('LiveSession', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING, // Should match user-service ID type, assuming UUID/String
        allowNull: false
    },
    streamKey: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    audience: {
        type: DataTypes.ENUM('public', 'practice'),
        defaultValue: 'public'
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'live', 'ended'),
        defaultValue: 'scheduled'
    },
    startedAt: {
        type: DataTypes.DATE
    },
    endedAt: {
        type: DataTypes.DATE
    },
    peakViewers: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'live_sessions',
    timestamps: true
});

module.exports = LiveSession;
