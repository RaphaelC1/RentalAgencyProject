// controllers/register.route.js
const express = require('express');
const router = express.Router();
const userRepo = require('../utils/users.repository');
const userAuth = require('../utils/users.auth')
router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}


// http://localhost:9000/register
router.get('/', (req, res) => {
    res.render('register', { user: req.user });

});

// ADD USER
router.get('/user/add', userAddAction);
router.post('/user/create', userCreateAction);


// FUNCTIONS ADD USERS
async function userAddAction(request, response) {
    response.render("/add_user", { /* Additional data if needed */ });
}

async function userCreateAction(request, response) {
    let userData = {
        user_name: request.body.username, 
        user_email: request.body.email,   
        user_role: request.body.role,     
        user_pass: request.body.password 
    };

    var userId = await userRepo.addOneUser(userData);
    response.redirect("/auth/");
}
module.exports = router;