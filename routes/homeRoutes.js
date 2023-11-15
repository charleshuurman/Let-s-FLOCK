

const express = require('express');
const router = express.Router();

//function and use it to fetch trending topics:
const getTopTrendingTopics = require('./trendingTopics');

router.get('/', async (req, res) => {
    try {
        const trendingTopics = await getTopTrendingTopics();
        res.render('home', { trendingTopics });
    } catch (error) {
        res.status(500).send('Error loading homepage');
    }
});

module.exports = router;
