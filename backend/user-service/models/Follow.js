const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Follow = sequelize.define('Follow', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'follower_id'
    },
    followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'following_id'
    }
}, {
    tableName: 'follows',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['follower_id', 'following_id']
        }
    ]
});

module.exports = Follow;
