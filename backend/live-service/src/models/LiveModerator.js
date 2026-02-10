const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveModerator = sequelize.define('LiveModerator', {
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
    }
}, {
    tableName: 'live_moderators',
    timestamps: true,
    indexes: [
        { fields: ['streamId', 'userId'], unique: true }
    ]
});

LiveStream.hasMany(LiveModerator, { foreignKey: 'streamId' });
LiveModerator.belongsTo(LiveStream, { foreignKey: 'streamId' });

module.exports = LiveModerator;
