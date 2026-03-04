const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactMatch = sequelize.define('ContactMatch', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    matchedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    source: {
        type: DataTypes.STRING, // 'phonebook', 'facebook' etc.
        defaultValue: 'phonebook'
    }
});

module.exports = ContactMatch;
