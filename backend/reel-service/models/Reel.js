const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reel = sequelize.define('Reel', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    caption: {
        type: DataTypes.TEXT,
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Reel;
