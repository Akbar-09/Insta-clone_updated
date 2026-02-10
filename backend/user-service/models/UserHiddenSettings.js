const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserHiddenSettings = sequelize.define('UserHiddenSettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    hideComments: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'hide_comments'
    },
    advancedFilter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'advanced_filter'
    },
    hideMessageRequests: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'hide_message_requests'
    },
    customHideComments: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'custom_hide_comments'
    },
    customHideMessageRequests: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'custom_hide_message_requests'
    }
}, {
    tableName: 'user_hidden_settings',
    timestamps: false
});

module.exports = UserHiddenSettings;
