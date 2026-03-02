const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveBlockedUser = sequelize.define('LiveBlockedUser', {
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
    }
}, {
    tableName: 'live_blocked_users',
    timestamps: true
});

LiveStream.hasMany(LiveBlockedUser, { foreignKey: 'streamId' });
LiveBlockedUser.belongsTo(LiveStream, { foreignKey: 'streamId' });

module.exports = LiveBlockedUser;
