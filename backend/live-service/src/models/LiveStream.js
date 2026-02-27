const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LiveStream = sequelize.define('LiveStream', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    room_name: {
        type: DataTypes.STRING,
        unique: true
    },
    host_id: {
        type: DataTypes.STRING, /* using STRING here for foreign key to users.id which seems to be UUID or STRING in this app */
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Social'
    },
    visibility: {
        type: DataTypes.ENUM('public', 'followers', 'private'),
        defaultValue: 'public'
    },
    thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'live', 'ended'),
        defaultValue: 'scheduled'
    },
    scheduled_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    peak_viewers: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total_viewers: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'live_streams',
    timestamps: true,
    underscored: true, /* ensures createdAt -> created_at */
    indexes: [
        { fields: ['host_id'] },
        { fields: ['status'] }
    ]
});

module.exports = LiveStream;
