const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveMutedUser = sequelize.define('LiveMutedUser', {
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
    muted_until: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'live_muted_users',
    timestamps: true
});

LiveStream.hasMany(LiveMutedUser, { foreignKey: 'streamId' });
LiveMutedUser.belongsTo(LiveStream, { foreignKey: 'streamId' });

module.exports = LiveMutedUser;
