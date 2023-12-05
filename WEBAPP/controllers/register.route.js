// controllers/register.route.js
const express = require('express');
const router = express.Router();

router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}


// http://localhost:9000/register
router.get('/', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('register', { user: req.user });

});

// Add new user
//router.get('/user/add', userAddAction); //TO DO
//router.post('/user/create', userCreateAction); //TO DO


module.exports = router;