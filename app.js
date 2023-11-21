require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/database');
const axios = require('axios'); // Import axios for making API requests

const app = express();

const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Import routes
const headlineSelectionRoutes = require('./routes/headlineSelectionRoutes');
const newsRoutes = require('./routes/newsRoutes');
const userChatRoutes = require('./routes/userChatRoutes');
const userRoutes = require('./routes/userRoutes');

// Using routes
app.use('/headline-selections', headlineSelectionRoutes);
app.use('/news', newsRoutes);
app.use('/chats', userChatRoutes);
app.use('/users', userRoutes);

// Home route
app.get('/', (req, res) => {
    const topics = ['WORLD', 'NATIONAL', 'BUSINESS', 'TECHNOLOGY', 'ENTERTAINMENT', 'SPORTS', 'SCIENCE', 'HEALTH'];
    res.render('home', { topics });
});

// // Route for fetching headlines based on topic
// app.get('/fetch-headlines/:topic', async (req, res) => {
//     const topic = req.params.topic;
//     try {
//         const response = await axios.get('https://real-time-news-data.p.rapidapi.com/topic-news-by-section', {
//             params: {
//                 topic: topic,
//                 section: 'CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB',
//                 country: 'US',
//                 lang: 'en'
//             },
//             headers: {
//                 'X-RapidAPI-Key': '7e027ea54emshf9404a1862b3e29p1ea3d4jsndd6053e82d3d',
//                 'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
//             }
//         });
//         res.json(response.data.articles);
//     } catch (error) {
//         console.error('Error fetching headlines:', error);
//         res.status(500).json({ error: 'Error fetching news' });
//     }
// });
// Route for fetching top headlines
// Home route
app.get('/', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://real-time-news-data.p.rapidapi.com/top-headlines',
        params: { country: 'US', lang: 'en' },
        headers: {
            'X-RapidAPI-Key': '7e027ea54emshf9404a1862b3e29p1ea3d4jsndd6053e82d3d',
            'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.render('home', { headlines: response.data.articles });
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        res.status(500).render('error', { error: 'Error fetching top headlines' });
    }
});


const configureAssociations = require('./associations');
// Configure model associations
configureAssociations();

// Synchronize Sequelize models with the database, then start the server
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database tables created');
        app.listen(PORT, () => {
            console.log(`Server running on http://127.0.0.1:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Failed to synchronize database:', error);
    });

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
