const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Topic = sequelize.define('topic', {
  topicName: Sequelize.STRING,
  date: Sequelize.DATE,
  description: Sequelize.TEXT
});

module.exports = Topic;
