const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveViewer = sequelize.define('LiveViewer', {
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
    joinedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    leftAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'live_viewers',
    timestamps: true,
    indexes: [
        { fields: ['streamId'] },
        { fields: ['userId'] },
        { fields: ['leftAt'] } // Helpful to find active viewers
    ]
});

LiveStream.hasMany(LiveViewer, { foreignKey: 'streamId' });
LiveViewer.belongsTo(LiveStream, { foreignKey: 'streamId' });

module.exports = LiveViewer;
