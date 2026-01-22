const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserActivitySettings = sequelize.define('UserActivitySettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    showActivityStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'show_activity_status'
    },
    lastActiveAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_active_at'
    }
}, {
    tableName: 'user_activity_settings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserActivitySettings;
