const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const AdBookmark = sequelize.define('AdBookmark', {
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
    tableName: 'ad_bookmarks',
    timestamps: true,
    indexes: [
        { unique: true, fields: ['adId', 'userId'] }
    ]
});

Ad.hasMany(AdBookmark, { foreignKey: 'adId', as: 'adBookmarks' });
AdBookmark.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdBookmark;
