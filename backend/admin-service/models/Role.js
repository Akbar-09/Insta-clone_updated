const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, // SuperAdmin, Moderator, Analyst
        allowNull: false,
        unique: true
    },
    permissions: {
        type: DataTypes.JSONB, // Array of permission strings: ['users:read', 'posts:delete', 'settings:write']
        defaultValue: []
    }
});

module.exports = Role;
