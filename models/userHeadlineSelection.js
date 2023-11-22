// models/UserHeadlineSelection.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary
const User = require('./User'); // Import the User model here
const Headline = require('./Headline'); // Import the Headline model here

const UserHeadlineSelection = sequelize.define('UserHeadlineSelection', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', // 'users' refers to the table name
            key: 'id', // 'id' refers to the column name in the users table
        },
        allowNull: false,
    },
    headlineId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'headlines', // 'headlines' refers to the table name
            key: 'id', // 'id' refers to the column name in the headlines table
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'UserHeadlineSelection',
    timestamps: false, // Assuming no created_at or updated_at fields
    onDelete: 'CASCADE', // This will cascade the delete action to maintain referential integrity
    onUpdate: 'CASCADE', // This will cascade the update action to maintain referential integrity
});

// Associations
UserHeadlineSelection.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserHeadlineSelection.belongsTo(Headline, { foreignKey: 'headlineId', as: 'headline' });


User.hasMany(UserHeadlineSelection, { foreignKey: 'userId', as: 'headlineSelections' });
Headline.hasMany(UserHeadlineSelection, { foreignKey: 'headlineId', as: 'userSelections' });


module.exports = UserHeadlineSelection;
