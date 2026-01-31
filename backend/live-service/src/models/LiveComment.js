const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveSession = require('./LiveSession');

const LiveComment = sequelize.define('LiveComment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    liveSessionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: LiveSession,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: { // Denormalize for performance
        type: DataTypes.STRING,
        allowNull: true
    },
    profilePic: { // Denormalize for performance
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'live_comments',
    timestamps: true
});

LiveSession.hasMany(LiveComment, { foreignKey: 'liveSessionId' });
LiveComment.belongsTo(LiveSession, { foreignKey: 'liveSessionId' });

module.exports = LiveComment;
