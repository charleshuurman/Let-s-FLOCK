const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  fullName: Sequelize.STRING,
  gender: Sequelize.ENUM('Male', 'Female', 'Other'),
  overEighteen: Sequelize.BOOLEAN,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  geoLocation: Sequelize.STRING
});

module.exports = User;
