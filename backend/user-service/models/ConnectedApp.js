const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ConnectedApp = sequelize.define('ConnectedApp', {
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
    appName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'app_name'
    },
    status: {
        type: DataTypes.ENUM('active', 'expired', 'removed'),
        defaultValue: 'active'
    },
    accessType: {
        type: DataTypes.STRING, // e.g., 'Profile information, Media'
        defaultValue: 'Basic access',
        field: 'access_type'
    },
    connectedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'connected_at'
    }
}, {
    tableName: 'connected_apps',
    timestamps: false
});

module.exports = ConnectedApp;
