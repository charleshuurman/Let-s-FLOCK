const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Topic = require('./Topic');

const UserTopic = sequelize.define('userTopic', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  topicId: {
    type: Sequelize.INTEGER,
    references: {
      model: Topic,
      key: 'id'
    }
  }
});

User.belongsToMany(Topic, { through: UserTopic });
Topic.belongsToMany(User, { through: UserTopic });

module.exports = UserTopic;
