const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ad = sequelize.define('Ad', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER, // References User.id from auth-service
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    caption: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ctaText: {
        type: DataTypes.STRING,
        allowNull: true, // Learn More, Shop Now, Visit Website, etc.
    },
    destinationUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    adType: {
        type: DataTypes.ENUM('NEW_MEDIA', 'BOOST_CONTENT'),
        defaultValue: 'NEW_MEDIA',
    },
    status: {
        type: DataTypes.ENUM('DRAFT', 'REVIEW', 'ACTIVE', 'PAUSED', 'COMPLETED', 'REJECTED'),
        defaultValue: 'DRAFT',
    },
    hideLikes: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    commentsDisabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'ads',
    timestamps: true,
    indexes: [
        { fields: ['userId'] },
        { fields: ['status'] },
        { fields: ['createdAt'] },
    ]
});

module.exports = Ad;
