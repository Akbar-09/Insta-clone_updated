const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Message;
