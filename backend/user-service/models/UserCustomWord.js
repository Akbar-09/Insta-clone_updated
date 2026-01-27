const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserCustomWord = sequelize.define('UserCustomWord', {
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
    word: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'user_custom_words',
    timestamps: false
});

module.exports = UserCustomWord;
