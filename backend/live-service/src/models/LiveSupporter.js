const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveSupporter = sequelize.define('LiveSupporter', {
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
    badge_level: {
        type: DataTypes.INTEGER, // 1, 2, or 3 hearts
        defaultValue: 1
    },
    amount_paid: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'live_supporters',
    timestamps: true,
    underscored: true
});

LiveStream.hasMany(LiveSupporter, { foreignKey: 'stream_id' });
LiveSupporter.belongsTo(LiveStream, { foreignKey: 'stream_id' });

module.exports = LiveSupporter;
