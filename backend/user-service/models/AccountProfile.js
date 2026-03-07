const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountProfile = sequelize.define('AccountProfile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: { // References UserProfile userId
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    business_email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    business_phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    business_address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    whatsapp_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reach_preference: {
        type: DataTypes.ENUM('call', 'text'),
        defaultValue: 'call',
    },
    display_category: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    display_contact: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    timestamps: true
});

module.exports = AccountProfile;
