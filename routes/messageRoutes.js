const express = require('express');
const router = express.Router();

// Generic message route
router.get('/message', (req, res) => {
    const { title, message, linkHref, linkText } = req.query;
    res.render('message', {
        title: title || 'Message',
        message: message || 'Here is your message.',
        link: linkHref ? { href: linkHref, text: linkText || 'Go Back' } : null
    });
});


// Specific error route
router.get('/error', (req, res) => {
    res.render('message', {
        title: 'Error',
        message: 'An unexpected error occurred.',
        link: {
            href: '/',
            text: 'Go Home'
        }
    });
});

// Specific confirmation route
router.get('/confirmation', (req, res) => {
    res.render('message', {
        title: 'Confirmation',
        message: 'Your action was successful!',
        link: {
            href: '/dashboard',
            text: 'Back to Dashboard'
        }
    });
});

module.exports = router;
