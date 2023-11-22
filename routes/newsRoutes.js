const express = require('express');
const router = express.Router();
const axios = require('axios');
const UserHeadlineSelection = require('../models/UserHeadlineSelection'); // Import the model

// Function to fetch top trending topics
async function getTopTrendingTopics() {
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
        return response.data.data.slice(0, 3); // Return the top 3 news topics
    } catch (error) {
        console.error('Error fetching top news:', error);
        throw error;
    }
}

// Route to handle selection of a headline
router.post('/select-headline', async (req, res) => {
    try {
        const { userId, headlineId } = req.body;
        // Check if selection already exists
        const existingSelection = await UserHeadlineSelection.findOne({ where: { userId, headlineId } });
        if (!existingSelection) {
            await UserHeadlineSelection.create({ userId, headlineId });
            res.status(201).send('Headline selected');
        } else {
            res.status(409).send('Headline already selected');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to handle deselection of a headline
router.delete('/deselect-headline', async (req, res) => {
    try {
        const { userId, headlineId } = req.body;
        const selection = await UserHeadlineSelection.findOne({ where: { userId, headlineId } });
        if (selection) {
            await selection.destroy();
            res.status(200).send('Headline deselected');
        } else {
            res.status(404).send('Selection not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = {
    getTopTrendingTopics,
    router
};
