const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReelLike = sequelize.define('ReelLike', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['userId', 'reelId']
        }
    ]
});

module.exports = ReelLike;
