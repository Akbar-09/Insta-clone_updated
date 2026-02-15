const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveChatMessage = sequelize.define('LiveChatMessage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    streamId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: LiveStream,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isModerator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isSystem: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'live_chat_messages',
    timestamps: true,
    indexes: [
        { fields: ['streamId'] },
        { fields: ['createdAt'] }
    ]
});

LiveStream.hasMany(LiveChatMessage, { foreignKey: 'streamId' });
LiveChatMessage.belongsTo(LiveStream, { foreignKey: 'streamId' });

module.exports = LiveChatMessage;
