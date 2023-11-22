const express = require('express');
const router = express.Router();

// Import the function to fetch top trending topics
// const getTopTrendingTopics = require('./newsRoutes'); // Ensure this module exists and is correctly implemented

// // Route for the home page
// router.get('/', async (req, res) => {
//     try {
//         const trendingTopics = await getTopTrendingTopics();
//         res.render('home', { trendingTopics });
//     } catch (error) {
//         console.error('Error loading homepage:', error);
//         res.status(500).send('Error loading homepage');
//     }
// });
// Route for the home page
router.get('/', (req, res) => {
    res.render('home');
});


module.exports = router;
