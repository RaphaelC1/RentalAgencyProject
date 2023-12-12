const express = require('express');
const router = express.Router();
const userRepo = require('../utils/users.repository');
const userAuth = require('../utils/users.auth')


router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}




// ADD USER
router.get('/user/add', adminUserAddAction);
router.post('/user/create', adminUserCreateAction);
// List all users
router.get('/user', adminUserListAction);

// Delete one user
router.post('/user/delete', adminUserDeleteAction);
// Edit one user
router.get('/user/edit/:userId', userEditAction);
router.post('/user/update/:userId', userUpdateAction);

// FUNCTIONS ADD USERS
async function adminUserAddAction(request, response) {
    response.render("admin/add_user", { /* Additional data if needed */ });
}

async function adminUserCreateAction(request, response) {
    var userData = {
        FirstName: request.body.user_name,
        LastName: request.body.user_email || null,
        Email: request.body.user_role || null,
        PhoneNumber: request.body.user_pass || null,
    };

    var userId = await userRepo.addOneUser(userData);
    response.redirect("/admin/user");
}

//EDIT A USER
async function userEditAction(request, response) {
    // response.send("EDIT ACTION");
    var userId = request.params.userId;
    var user = await userRepo.getOneuser(userId);
    response.render("admin/edit_user", { user: user[0] });
}

async function userUpdateAction(request, response) {
    var userId = request.params.userId;
    var userData = {
        FirstName: request.body.user_name,
        LastName: request.body.user_email || null,
        Email: request.body.user_role || null,
        PhoneNumber: request.body.user_pass || null,
    };
    var numRows = await userRepo.editOneUser(userData, userId);
    response.redirect("/admin/user");
}

//FUNCTIONS LIST ALL USERS
async function adminUserListAction(request, response) {
    var users = await userRepo.getOneUser();
    console.log(users);
    response.render("admin/admin_user", { users: users });
}
// DELETE ONE USER
async function adminUserDeleteAction(request, response) {
    var userId = request.body.id;
    console.log("DELETE " + userId);
    var numRows = await userRepo.delOneUser(userId);

    response.redirect("/admin/user");
}



module.exports = router;