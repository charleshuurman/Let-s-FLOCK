require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lets_flock_db', process.env.DB_USER, process.env.DB_PASS, {
    host: '127.0.0.1',
    port: 3306, // Ensure this matches your MySQL server port
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log SQL queries in development
    define: {
      timestamps: true, // Set timestamps to true by default
    }
});

module.exports = sequelize;


