const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Optional: Denormalize user data if needed for "Liked by..." lists, 
    // but for now simplest is best.
}, {
    indexes: [
        {
            unique: true,
            fields: ['userId', 'postId']
        }
    ]
});

module.exports = Like;
