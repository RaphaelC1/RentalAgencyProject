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
router.get('/tenant/add', adminTenantAddAction);
router.post('/tenant/create', adminTenantCreateAction);
// List all tenants
router.get('/tenant', adminTenantListAction);

// Delete one tenant
router.post('/tenant/delete', adminTenantDeleteAction);
// Edit one tenant
router.get('/tenant/edit/:tenantId', tenantEditAction);
router.post('/tenant/update/:tenantId', tenantUpdateAction);

// FUNCTIONS ADD TENANT
async function adminTenantAddAction(request, response) {
    response.render("admin/add_tenant", { /* Additional data if needed */ });
}

async function adminTenantCreateAction(request, response) {
    var tenantData = {
        FirstName: request.body.firstName,
        LastName: request.body.lastName || null,
        Email: request.body.email || null,
        PhoneNumber: request.body.phoneNumber || null,
        user_id: request.body.userId || null,
    };

    var tenantId = await tenantRepo.addOneTenant(tenantData);
    response.redirect("/admin/tenant");
}

//EDIT A TENANT
async function tenantEditAction(request, response) {
    // response.send("EDIT ACTION");
    var tenantId = request.params.tenantId;
    var tenant = await tenantRepo.getOneTenant(tenantId);
    response.render("admin/edit_tenant", { tenant: tenant[0] });
}

async function tenantUpdateAction(request, response) {
    var tenantId = request.params.tenantId;
    var tenantData = {
        FirstName: request.body.firstName,
        LastName: request.body.lastName || null,
        Email: request.body.email || null,
        PhoneNumber: request.body.phoneNumber || null,
        user_id: request.body.userId || null,
    };
    var numRows = await tenantRepo.editOneTenant(tenantData, tenantId);
    response.redirect("/admin/tenant");
}

//FUNCTIONS LIST ALL TENANTS
async function adminTenantListAction(request, response) {
    var tenants = await tenantRepo.getAllTenants();
    console.log(tenants);
    response.render("admin/admin_tenant", { tenants: tenants });
}
// DELETE ONE TENANT
async function adminTenantDeleteAction(request, response) {
    var tenantId = request.body.id;
    console.log("DELETE " + tenantId);
    var numRows = await tenantRepo.delOneTenant(tenantId);

    response.redirect("/admin/tenant");
}



module.exports = router;