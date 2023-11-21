//newsroutes.js

// const express = require('express');
// const newsController = require('../controllers/newsController');
// const router = express.Router();

// // Route to fetch headlines by topic
// router.get('/headlines/:topic', newsController.fetchHeadlinesByTopic);



// // Route to track user's headline selection
// router.post('/track-selection', newsController.trackUserHeadlineSelection);

// // You can add more routes for other news-related functionalities if needed

// module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to fetch headlines by topic
router.get('/headlines/:topic', async (req, res) => {
    const topic = req.params.topic;
    try {
        const response = await axios.get('https://real-time-news-data.p.rapidapi.com/topic-news-by-section', {
            params: {
                topic: topic,
                section: 'CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB',
                country: 'US',
                lang: 'en'
            },
            headers: {
                'X-RapidAPI-Key': '7e027ea54emshf9404a1862b3e29p1ea3d4jsndd6053e82d3d',
                'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
            }
        });
        res.json(response.data.articles);
    } catch (error) {
        console.error('Error fetching headlines:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
});

// You can add more routes for other news-related functionalities if needed

module.exports = router;

