const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContentPreferences = sequelize.define('ContentPreferences', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    sensitiveContentLevel: {
        type: DataTypes.ENUM('allow', 'limit', 'limit_more'),
        defaultValue: 'limit_more',
        field: 'sensitive_content_level'
    }
}, {
    tableName: 'content_preferences',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
});

module.exports = ContentPreferences;
