const express = require('express');
const userChatController = require('../controllers/userChatController');

const router = express.Router();

// Route for posting a chat message
router.post('/post', userChatController.postMessage);

// Route for getting chat messages for a specific headline
router.get('/messages/:headlineId', userChatController.getChatMessages);

// Additional routes can be added as needed

module.exports = router;
