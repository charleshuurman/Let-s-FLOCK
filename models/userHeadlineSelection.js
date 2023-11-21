const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Headline = require('./headline');

const UserHeadlineSelection = sequelize.define('UserHeadlineSelection', {
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
    selected_timeslots: {
        type: DataTypes.JSON
    }
});

UserHeadlineSelection.belongsTo(User, { foreignKey: 'userId' });
UserHeadlineSelection.belongsTo(Headline, { foreignKey: 'headlineId' });

module.exports = UserHeadlineSelection;
