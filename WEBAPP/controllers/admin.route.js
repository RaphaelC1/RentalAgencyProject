// controllers/admin.route.js
const express = require('express');
const router = express.Router();
const userAuth = require('../utils/users.auth')

async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}


// Only admin can access the admin side
router.use('/', userAuth.checkAuthentication('ADMIN'));
router.use('/landlord', userAuth.checkAuthentication('ADMIN'));
router.use('/property', userAuth.checkAuthentication('ADMIN'));
router.use('/tenant', userAuth.checkAuthentication('ADMIN'));
router.use('/user', userAuth.checkAuthentication('ADMIN'));


// http://localhost:9000/admin
router.get('/', (req, res) => {
    res.render('admin/admin_home', { favourites: [] });

});


module.exports = router;