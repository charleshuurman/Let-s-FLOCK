const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-zA-Z0-9_-]+$/i,
            len: [4, 32]
        }
    },
    fullName: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female', 'Other']
    },
    overEighteen: {
        type: DataTypes.BOOLEAN
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    geoLocation: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.STRING
    }
});

// User.hasMany(UserHeadlineSelection, { foreignKey: 'userId' });
// User.hasMany(UserChat, { foreignKey: 'userId' });

module.exports = User;
