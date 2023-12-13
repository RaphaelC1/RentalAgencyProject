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
router.get('/user/edit/:user_id', userEditAction);
router.post('/user/update/:user_id', userUpdateAction);

// FUNCTIONS ADD USERS
async function adminUserAddAction(request, response) {
    response.render("admin/add_user", { /* Additional data if needed */ });
}

async function adminUserCreateAction(request, response) {
    let userData = {
        user_name: request.body.username, 
        user_email: request.body.email,   
        user_role: request.body.role,     
        user_pass: request.body.password 
    };

    var userId = await userRepo.addOneUser(userData);
    response.redirect("/admin/user");
}

//EDIT A USER
async function userEditAction(request, response) {
    try {
        var userId = request.params.user_id;
        var users = await userRepo.getOneUser(userId);
        response.render("admin/edit_user", { users: users });
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
}

async function userUpdateAction(request, response) {
    try {
        var userId = request.params.user_id;
        var userData = {
            user_name: request.body.username,
            user_email: request.body.email || null,
            user_role: request.body.role || null,
            user_pass: request.body.password || null,
        };

        var numRows = await userRepo.editOneUser(userData, userId);

        // Assuming numRows is returned from the editOneUser function to indicate the number of affected rows
        if (numRows > 0) {
            response.redirect("/admin/user");
        } else {
            // Handle the case where no rows were updated
            // You can redirect to an error page or handle it as per your application's logic
            response.status(500).send("Failed to update user.");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
}


//FUNCTIONS LIST ALL USERS
async function adminUserListAction(request, response) {
    try {
        var users = await userRepo.getAllUsers(); // Fetch all users from the database
        response.render("admin/admin_user", { users: users }); // Pass the users' data to the view
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }
}



// DELETE ONE USER
async function adminUserDeleteAction(request, response) {
    try {
        var userId = request.body.id;
        await userRepo.delOneUser(userId); 
        response.redirect("/admin/user"); 
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }
    
}



module.exports = router;