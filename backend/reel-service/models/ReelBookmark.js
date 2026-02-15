const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReelBookmark = sequelize.define('ReelBookmark', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['reelId', 'userId']
        }
    ]
});

module.exports = ReelBookmark;
