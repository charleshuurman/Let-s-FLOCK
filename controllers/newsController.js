//newsController.js

const axios = require('axios');
const UserHeadlineSelection = require('../models/userHeadlineSelection'); 

const newsController = {
    fetchHeadlinesByTopic: async (req, res) => {
        try {
            const topic = req.params.topic.toUpperCase();
            const options = {
                method: 'GET',
                url: 'https://real-time-news-data.p.rapidapi.com/topic-news-by-section',
                params: { 
                    topic: topic, 
                    section: 'CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB',
                    country: 'US',
                    lang: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                    'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            res.json({ articles: response.data.articles }); // Corrected response format
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching news' }); // Changed to JSON response
        }
        const response = await axios.request(options);
   return response.data.articles;
    },

    trackUserHeadlineSelection: async (req, res) => {
        try {
            const { userId, headlineId } = req.body;
            const existingSelection = await UserHeadlineSelection.findOne({
                where: { userId, headlineId }
            });

            if (existingSelection) {
                return res.status(409).json({ error: 'Headline already selected by this user' }); // Changed to JSON response
            }

            await UserHeadlineSelection.create({ userId, headlineId });
            res.status(201).json({ message: 'Headline selection tracked successfully' }); // Changed to JSON response
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error tracking headline selection' }); // Changed to JSON response
        }
    },

    // ... other methods, if any ...
};

module.exports = newsController;
