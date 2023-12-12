const express = require('express');
const router = express.Router();
const tenantRepo = require('../utils/tenant.repository');
const userAuth = require('../utils/users.auth')


router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}

router.use('/admin', userAuth.checkAuthentication('ADMIN'));
router.use('/tenant', userAuth.checkAuthentication('ADMIN'));



// ADD TENANT
router.get('/tenant/add', adminUserAddAction);
router.post('/tenant/create', adminUserCreateAction);
// List all tenants
router.get('/tenant', adminUserListAction);

// Delete one tenant
router.post('/tenant/delete', adminUserDeleteAction);
// Edit one tenant
router.get('/tenant/edit/:userId', userEditAction);
router.post('/tenant/update/:userId', userUpdateAction);

// FUNCTIONS ADD TENANT
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

    var userId = await tenantRepo.addOneUser(userData);
    response.redirect("/admin/user");
}

//EDIT A TENANT
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
    var numRows = await tenantRepo.editOneUser(userData, userId);
    response.redirect("/admin/user");
}

//FUNCTIONS LIST ALL USERS
async function adminUserListAction(request, response) {
    var tenants = await tenantRepo.getAllTenants();
    console.log(tenants);
    response.render("admin/admin_user", { tenants: tenants });
}
// DELETE ONE USER
async function adminUserDeleteAction(request, response) {
    var tenantId = request.body.id;
    console.log("DELETE " + tenantId);
    var numRows = await tenantRepo.delOneTenant(tenantId);

    response.redirect("/admin/user");
}



module.exports = router;