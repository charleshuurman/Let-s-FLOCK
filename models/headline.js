
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Headline = sequelize.define('Headline', {
    // ... model attributes ...
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    photo_url: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    published_datetime_utc: {
        type: DataTypes.DATE
    },
    source_url: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    source_logo_url: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    source_favicon_url: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }
});

module.exports = Headline;

// // Delay the association setup to avoid circular dependency issues
// // Set up associations outside of the model definition to avoid circular dependencies
// const UserHeadlineSelection = require('./userHeadlineSelection');
// const UserChat = require('./userChat');

// Headline.hasMany(UserHeadlineSelection, { foreignKey: 'headlineId' });
// Headline.hasMany(UserChat, { foreignKey: 'headlineId' });




