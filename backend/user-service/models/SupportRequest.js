const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SupportRequest = sequelize.define('SupportRequest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    category: {
        type: DataTypes.ENUM('report', 'safety', 'violation', 'monetisation'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'resolved', 'closed'),
        defaultValue: 'pending'
    },
    description: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    }
}, {
    tableName: 'support_requests',
    timestamps: false
});

module.exports = SupportRequest;
