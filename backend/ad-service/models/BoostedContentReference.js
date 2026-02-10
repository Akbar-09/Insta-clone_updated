const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const BoostedContentReference = sequelize.define('BoostedContentReference', {
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
    contentType: {
        type: DataTypes.ENUM('POST', 'REEL', 'STORY'),
        allowNull: false,
    },
    contentId: {
        type: DataTypes.INTEGER, // References Post.id, Reel.id, or Story.id
        allowNull: false,
    },
    originalData: {
        type: DataTypes.JSONB, // Snapshot of original content data if needed
        allowNull: true,
    }
}, {
    tableName: 'boosted_content_references',
    timestamps: true
});

Ad.hasOne(BoostedContentReference, { foreignKey: 'adId', as: 'boostedContent' });
BoostedContentReference.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = BoostedContentReference;
