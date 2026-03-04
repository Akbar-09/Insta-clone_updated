const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interest = require('./Interest');
const UserProfile = require('./UserProfile');

const UserInterest = sequelize.define('UserInterest', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserProfile,
            key: 'userId' // Maps to UserProfile's userId
        }
    },
    interestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Interest,
            key: 'id'
        }
    }
});

// Setup relationships
UserProfile.belongsToMany(Interest, { through: UserInterest, foreignKey: 'userId', otherKey: 'interestId' });
Interest.belongsToMany(UserProfile, { through: UserInterest, foreignKey: 'interestId', otherKey: 'userId' });

module.exports = UserInterest;
