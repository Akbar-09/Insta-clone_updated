const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LivePoll = require('./LivePoll');

const LivePollVote = sequelize.define('LivePollVote', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    poll_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: LivePoll,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option_index: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'live_poll_votes',
    timestamps: true,
    underscored: true,
    indexes: [
        { unique: true, fields: ['poll_id', 'user_id'] } // One vote per user per poll
    ]
});

LivePoll.hasMany(LivePollVote, { foreignKey: 'poll_id' });
LivePollVote.belongsTo(LivePoll, { foreignKey: 'poll_id' });

module.exports = LivePollVote;
