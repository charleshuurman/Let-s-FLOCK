const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserHeadlineSelection = require('../models/UserHeadlineSelection');
const Headline = require('../models/Headline');
const router = express.Router();

// GET route for user registration form
router.get('/register', (req, res) => {
  res.render('register');
});

// GET route for user login form
router.get('/login', (req, res) => {
  res.render('login');
});

// POST route for user registration
router.post('/register', async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword
    });
    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.id;
      req.session.username = user.username;
      res.redirect('/');
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET route for user's profile
router.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }

  try {
    const user = await User.findOne({
      where: { id: req.session.userId }
    });

    if (user) {
      res.render('profile', { user: user.get({ plain: true }) });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching user data');
  }
});

// GET route for user's home page with selected headlines
router.get('/home', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }

  try {
    const selectedHeadlines = await UserHeadlineSelection.findAll({
      where: { userId: req.session.userId },
      include: [{ model: Headline, as: 'headline' }]
    });

    res.render('UserHeadlineSelection', { 
      selectedHeadlines: selectedHeadlines.map(sh => sh.get({ plain: true })),
      username: req.session.username
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching user data');
  }
});


UserHeadlineSelection.findAll({
  include: [{ model: User, as: 'user' }]
});
// ... other routes ...

module.exports = router;
