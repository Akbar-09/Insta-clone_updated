const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const AdLike = sequelize.define('AdLike', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    adId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'ads',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'ad_likes',
    timestamps: true,
    indexes: [
        { unique: true, fields: ['adId', 'userId'] }
    ]
});

Ad.hasMany(AdLike, { foreignKey: 'adId', as: 'adLikes' });
AdLike.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdLike;
