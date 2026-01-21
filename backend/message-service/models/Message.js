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
        allowNull: false,
        field: 'conversation_id'
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sender_id'
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
            fields: ['conversation_id']
        },
        {
            fields: ['createdAt']
        }
    ]
});

module.exports = Message;
