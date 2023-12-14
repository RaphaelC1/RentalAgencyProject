const express = require('express');
const router = express.Router();
const userAuth = require('../utils/users.auth')

async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}








module.exports = router;