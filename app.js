const express = require('express');
const axios = require('axios');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


  
// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up Handlebars with custom helpers, runtime options, and partials
app.engine('handlebars', engine({
    helpers: { eq: (v1, v2) => v1 === v2 },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');

// Middleware to make user session data available in all templates
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Import Sequelize and models
const sequelize = require('./config/database');
const User = require('./models/user');
const Headline = require('./models/headline');
//const UserHeadlineSelection = require('./models/userHeadlineSelection');

// Define associations
// User.hasMany(UserHeadlineSelection, { foreignKey: 'userId' });
// Headline.hasMany(UserHeadlineSelection, { foreignKey: 'headlineId' });
// UserHeadlineSelection.belongsTo(User, { foreignKey: 'userId' });
// UserHeadlineSelection.belongsTo(Headline, { foreignKey: 'headlineId' });

// Import routes
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Use routes
app.use('/', homeRoutes);
app.use('/users', userRoutes);
//app.use('/topics', topicRoutes);
app.use(messageRoutes);

// Home route
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.render('home', { loggedIn: true, username: req.session.username });
    } else {
        res.render('home', { loggedIn: false });
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).send('Unable to log out');
        }
        res.redirect('/users/login');
    });
});

// Route to fetch top news
const apiKey = process.env.RAPID_API_KEY;
app.get('/top-news', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-news-data.p.rapidapi.com/top-headlines',
            params: { country: 'US', lang: 'en' },
            headers: {
                'X-RapidAPI-Key':  apiKey,
                'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const topNews = response.data.data.slice(0, 10); // Get the top 10 news topics
        res.json(topNews);
    } catch (error) {
        console.error('Error fetching top news:', error);
        res.status(500).send('Error fetching top news');
    }
});

app.get('/api/user-headlines/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find all headline selections for the user
        const userHeadlines = await UserHeadlineSelection.findAll({
            where: { userId: userId },
            include: [{
                model: Headline, // Assuming you've set up an association in UserHeadlineSelection
                as: 'headline'   // 'headline' should match the alias used in your association
            }]
        });

        // Extracting headline details from the selections
        const headlines = userHeadlines.map(selection => selection.headline);

        res.json(headlines);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});


// Sync the database and start the server
sequelize.sync()
    .then(() => {
        console.log('Database synchronized successfully');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });


module.exports = app;
