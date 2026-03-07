const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HashtagFollow = sequelize.define('HashtagFollow', {
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
    hashtag: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'hashtag_follows',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'hashtag']
        }
    ]
});

module.exports = HashtagFollow;
