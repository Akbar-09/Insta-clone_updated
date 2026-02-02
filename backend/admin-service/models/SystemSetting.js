const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SystemSetting = sequelize.define('SystemSetting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    maintenanceMode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'maintenance_mode'
    },
    allowRegistrations: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'allow_registrations'
    },
    emailAlerts: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'email_alerts'
    },
    adminTheme: {
        type: DataTypes.STRING,
        defaultValue: 'light',
        field: 'admin_theme'
    }
}, {
    tableName: 'system_settings',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: false
});

module.exports = SystemSetting;
