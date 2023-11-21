const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

// Route for updating user profile
router.put('/profile/update', userController.updateProfile);

// Route for updating user password
router.put('/password/update', userController.updatePassword);

// Additional routes can be added as needed

module.exports = router;
