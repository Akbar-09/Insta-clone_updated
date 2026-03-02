const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LivePoll = sequelize.define('LivePoll', {
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
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    options: {
        type: DataTypes.JSONB, // Array of { text: string }
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER, // in seconds
        defaultValue: 60
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'live_polls',
    timestamps: true,
    underscored: true
});

LiveStream.hasMany(LivePoll, { foreignKey: 'stream_id' });
LivePoll.belongsTo(LiveStream, { foreignKey: 'stream_id' });

module.exports = LivePoll;
