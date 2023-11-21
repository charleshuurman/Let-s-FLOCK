const express = require('express');
const headlineSelectionController = require('../controllers/headlineSelectionController');

const router = express.Router();

// Route for users to select a headline
router.post('/select', headlineSelectionController.addUserSelection);

// Route for users to update their headline selection
router.put('/update/:selectionId', headlineSelectionController.updateUserSelection);

// Route for users to remove their headline selection
router.delete('/remove/:selectionId', headlineSelectionController.removeUserSelection);

module.exports = router;
