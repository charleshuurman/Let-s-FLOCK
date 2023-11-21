const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Import the User model
const Headline = require('./headline'); // Import the Headline model

const UserChat = sequelize.define('UserChat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    headlineId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Headlines',
            key: 'id'
        }
    },
    message: {
        type: DataTypes.STRING
    },
    timestamp: {
        type: DataTypes.DATE
    }
});

UserChat.belongsTo(User, { foreignKey: 'userId' });
UserChat.belongsTo(Headline, { foreignKey: 'headlineId' });

module.exports = UserChat;
