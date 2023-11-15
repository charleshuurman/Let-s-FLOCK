const axios = require('axios');

async function getTopTrendingTopics() {
    const options = {
        method: 'GET',
        url: 'https://onurmatik-twitter-trends-archive-v1.p.rapidapi.com/download',
        params: {
            country: 'US',
            date: '2023-11-14' // set in the future to dynamically set this to the current date
        },
        headers: {
            'X-RapidAPI-Key': 'fb0d56aa0fmshdf514f8aede4325p1d53c5jsnf9d5599fd30a',
            'X-RapidAPI-Host': 'onurmatik-twitter-trends-archive-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.slice(0, 5); // Assuming the API returns an array of topics
    } catch (error) {
        console.error('Error fetching trending topics:', error);
        return [];
    }
}

module.exports = getTopTrendingTopics;
