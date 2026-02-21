const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CallLog = sequelize.define('CallLog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        type: DataTypes.ENUM('missed', 'rejected', 'completed'),
        allowNull: false,
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
    tableName: 'call_logs',
    timestamps: false,
    indexes: [
        { fields: ['caller_id'] },
        { fields: ['receiver_id'] },
        { fields: ['started_at'] }
    ]
});

module.exports = CallLog;
