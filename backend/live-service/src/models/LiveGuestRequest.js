const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveGuestRequest = sequelize.define('LiveGuestRequest', {
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
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'left'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'live_guest_requests',
    timestamps: true,
    underscored: true
});

LiveStream.hasMany(LiveGuestRequest, { foreignKey: 'stream_id' });
LiveGuestRequest.belongsTo(LiveStream, { foreignKey: 'stream_id' });

module.exports = LiveGuestRequest;
