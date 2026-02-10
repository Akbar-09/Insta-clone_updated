const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const AdMedia = sequelize.define('AdMedia', {
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
    mediaType: {
        type: DataTypes.ENUM('IMAGE', 'VIDEO'),
        allowNull: false,
    },
    r2Key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aspectRatio: {
        type: DataTypes.STRING, // "1:1", "4:5", "9:16"
        allowNull: true,
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'ad_media',
    timestamps: true
});

Ad.hasMany(AdMedia, { foreignKey: 'adId', as: 'media' });
AdMedia.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdMedia;
