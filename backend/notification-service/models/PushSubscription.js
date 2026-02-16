const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PushSubscription = sequelize.define('PushSubscription', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER, // Assuming user IDs are integers based on current models
        allowNull: false,
        field: 'user_id'
    },
    endpoint: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    p256dh: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    auth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
}, {
    tableName: 'push_subscriptions',
    timestamps: false,

});

module.exports = PushSubscription;
