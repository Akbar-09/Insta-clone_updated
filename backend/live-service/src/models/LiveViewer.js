const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveSession = require('./LiveSession');

const LiveViewer = sequelize.define('LiveViewer', {
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
    joinedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    leftAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'live_viewers',
    timestamps: true
});

LiveSession.hasMany(LiveViewer, { foreignKey: 'liveSessionId' });
LiveViewer.belongsTo(LiveSession, { foreignKey: 'liveSessionId' });

module.exports = LiveViewer;
