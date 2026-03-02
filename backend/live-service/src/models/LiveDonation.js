const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveDonation = sequelize.define('LiveDonation', {
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
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'live_donations',
    timestamps: true,
    underscored: true
});

LiveStream.hasMany(LiveDonation, { foreignKey: 'stream_id' });
LiveDonation.belongsTo(LiveStream, { foreignKey: 'stream_id' });

module.exports = LiveDonation;
