// models/UserHeadlineSelection.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./user'); 
const Headline = require('./Headline');

const UserHeadlineSelection = sequelize.define('UserHeadlineSelection', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', 
            key: 'id', 
        },
        allowNull: false,
    },
    headlineId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'headlines', 
            key: 'id', // 'id' refers to the column name in the headlines table
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'UserHeadlineSelection',
    timestamps: false, 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE', 
});

// Associations
UserHeadlineSelection.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserHeadlineSelection.belongsTo(Headline, { foreignKey: 'headlineId', as: 'headline' });


User.hasMany(UserHeadlineSelection, { foreignKey: 'userId', as: 'headlineSelections' });
Headline.hasMany(UserHeadlineSelection, { foreignKey: 'headlineId', as: 'userSelections' });


module.exports = UserHeadlineSelection;
