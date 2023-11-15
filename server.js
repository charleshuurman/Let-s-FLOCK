const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

// Session middleware configuration
app.use(session({
    secret: 'your_secret_key', // Replace with your actual secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to false for HTTP, true for HTTPS
}));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up Handlebars with custom helpers, runtime options, and partials
app.engine('handlebars', engine({
    helpers: {
        eq: (v1, v2) => v1 === v2
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    partialsDir: path.join(__dirname, 'views/partials') // Specify the path to your partials
}));
app.set('view engine', 'handlebars');

// Import Sequelize and models
const sequelize = require('./config/database');
const User = require('./models/User');
const Topic = require('./models/Topic');
const UserTopic = require('./models/UserTopic');


module.exports = app;
