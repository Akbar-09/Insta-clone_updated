const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    indexes: [
        {
            fields: ['conversationId']
        },
        {
            fields: ['createdAt']
        }
    ]
});

module.exports = Message;
