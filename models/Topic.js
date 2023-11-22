// const Sequelize = require('sequelize');
// const sequelize = require('../config/database');

// const Topic = sequelize.define('topic', {
//   topicName: Sequelize.STRING,
//   date: Sequelize.DATE,
//   description: Sequelize.TEXT
// });

// module.exports = Topic;

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Headline = sequelize.define('Headline', {
  // Unique identifier for the headline
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Title of the headline
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // URL link to the article
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  // URL of the headline's photo
  photo_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  // Publication date and time in UTC
  published_datetime_utc: {
    type: DataTypes.DATE
  },
  // URL of the source website
  source_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  // URL of the source's logo
  source_logo_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  // URL of the source's favicon
  source_favicon_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  }
}, {
  // Additional model options if needed
});

module.exports = Headline;
