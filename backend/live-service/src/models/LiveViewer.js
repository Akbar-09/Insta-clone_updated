const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveViewer = sequelize.define('LiveViewer', {
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
    joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    left_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    watch_duration_seconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    tableName: 'live_stream_viewers',
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ['stream_id'] },
        { fields: ['user_id'] },
        { fields: ['left_at'] }
    ]
});

LiveStream.hasMany(LiveViewer, { foreignKey: 'stream_id' });
LiveViewer.belongsTo(LiveStream, { foreignKey: 'stream_id' });

module.exports = LiveViewer;
