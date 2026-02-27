const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveChatMessage = sequelize.define('LiveChatMessage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    stream_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: LiveStream,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'live_stream_messages',
    timestamps: true,
    updatedAt: false, // We usually don't update chat messages in live streams
    underscored: true,
    indexes: [
        { fields: ['stream_id'] },
        { fields: ['created_at'] }
    ]
});

LiveStream.hasMany(LiveChatMessage, { foreignKey: 'stream_id' });
LiveChatMessage.belongsTo(LiveStream, { foreignKey: 'stream_id' });

module.exports = LiveChatMessage;
