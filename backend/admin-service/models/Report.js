const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    reporter_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reported_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content_type: {
        type: DataTypes.ENUM('post', 'reel', 'comment', 'dm', 'user'),
        allowNull: false
    },
    content_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'review', 'resolved'),
        defaultValue: 'pending'
    },
    resolution_type: {
        type: DataTypes.ENUM('ignored', 'user_banned'),
        allowNull: true
    }
}, {
    tableName: 'reports',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Report;
