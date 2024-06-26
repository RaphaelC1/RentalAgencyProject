// controllers/home.route.js
const express = require('express');
const router = express.Router();
const userRepo = require('../utils/users.repository');
router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);


async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}

// http://localhost:9000/home
router.get('/', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('home_view', { user: req.user });
});

// http://localhost:9000/home/contact
router.get('/contact', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('home_contact', { user: req.user });
});

// http://localhost:9000/home/about
router.get('/about', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('home_about', { user: req.user });
});




module.exports = router;