const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveSetting = sequelize.define('LiveSetting', {
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
    comments_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    filter_spam: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    filter_abuse: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    filter_flagged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'live_settings',
    timestamps: true
});

LiveStream.hasOne(LiveSetting, { foreignKey: 'streamId' });
LiveSetting.belongsTo(LiveStream, { foreignKey: 'streamId' });

module.exports = LiveSetting;
