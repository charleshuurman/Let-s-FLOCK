const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Headline = require('./Headline');

const Comment = sequelize.define('comment', {
    // Comment text
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // User ID (foreign key)
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    // Headline ID (foreign key)
    headlineId: {
        type: Sequelize.INTEGER,
        references: {
            model: Headline,
            key: 'id'
        }
    }
    // Add additional fields as needed
});

// Associations
Comment.belongsTo(User);
Comment.belongsTo(Headline);

module.exports = Comment;
