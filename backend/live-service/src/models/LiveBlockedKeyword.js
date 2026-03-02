const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveBlockedKeyword = sequelize.define('LiveBlockedKeyword', {
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
    keyword: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'live_blocked_keywords',
    timestamps: true
});

LiveStream.hasMany(LiveBlockedKeyword, { foreignKey: 'streamId' });
LiveBlockedKeyword.belongsTo(LiveStream, { foreignKey: 'streamId' });

module.exports = LiveBlockedKeyword;
