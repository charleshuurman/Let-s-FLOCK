const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Headline extends Model {}

Headline.init({
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
  sequelize,
  modelName: 'Headline',
  timestamps: false // Assuming no created_at or updated_at fields
});

module.exports = Headline;
