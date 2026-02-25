const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CallSession = sequelize.define('CallSession', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    room_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    caller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    call_type: {
        type: DataTypes.ENUM('audio', 'video'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('ringing', 'rejected', 'missed', 'active', 'ended'),
        defaultValue: 'ringing',
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    duration_seconds: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'call_sessions',
    timestamps: true,
    indexes: [
        { fields: ['caller_id'] },
        { fields: ['receiver_id'] },
        { fields: ['room_name'] }
    ]
});

module.exports = CallSession;
