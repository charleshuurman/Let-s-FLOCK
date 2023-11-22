const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const UserTopic = require('../models/UserTopic');

// View Topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.render('topics', { topics });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Display topic creation form
router.get('/create-topic', (req, res) => {
    res.render('create-topic');
});

// Handle topic creation form submission
router.post('/create-topic', async (req, res) => {
    try {
        const { name, date, description } = req.body;
        await Topic.create({
            name,
            date: date || new Date(),
            description
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// View Topics of the Day
router.get('/topics-of-the-day', async (req, res) => {
    try {
        const topics = await Topic.findAll(); // Add logic here to fetch topics for the current day
        res.render('topics-of-the-day', { topics });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// User-Topic Interaction Page
router.get('/user-topics', async (req, res) => {
    try {
        // Implement getUserTopics and getAllTopics functions or import them if they exist
        const userTopics = await getUserTopics(req.user.id);
        const allTopics = await getAllTopics();

        res.render('user-topics', { userTopics, allTopics });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Join Topic
router.post('/topic/join', async (req, res) => {
  try {
    const { userId, topicId } = req.body;
    await UserTopic.create({ userId, topicId });
    res.redirect('/user-topics');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Leave Topic
router.post('/topic/leave', async (req, res) => {
  try {
    const { userId, topicId } = req.body;
    const userTopic = await UserTopic.findOne({ where: { userId, topicId } });
    if (userTopic) {
      await userTopic.destroy();
      res.redirect('/user-topics');
    } else {
      res.status(404).send('User not found in the topic');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
