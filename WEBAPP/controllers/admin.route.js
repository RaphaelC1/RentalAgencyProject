// controllers/admin.route.js
const express = require('express');
const router = express.Router();
const tenantRepo = require('../utils/tenant.repository'); // Update the path

router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}


router.get('/tenant/add', adminTenantAddAction);
router.post('/tenant/create', adminTenantCreateAction);


async function adminTenantAddAction(request, response) {
    response.render("add_tenant", { /* Additional data if needed */ });
}

async function adminTenantCreateAction(request, response) {
    var tenantData = {
        FirstName: request.body.firstName,
        LastName: request.body.lastName || null,
        Email: request.body.email || null,
        PhoneNumber: request.body.phoneNumber || null,
    };

    var tenantId = await tenantRepo.addOneTenant(tenantData);
    response.redirect("/admin");
}


// http://localhost:9000/admin
router.get('/', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('admin_home', { favourites: [] });

});

// http://localhost:9000/admin/tenant
router.get('/tenant', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('admin_tenant', { favourites: [] });
});


// http://localhost:9000/admin/landlord
router.get('/landlord', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('admin_landlord', { favourites: [] });
});

// http://localhost:9000/admin/landlord/add
router.get('/landlord/add', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('add_landlord', { favourites: [] });
});

// http://localhost:9000/admin/apartment
router.get('/apartment', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('admin_apartment', { favourites: [] });
});

// http://localhost:9000/admin/apartment/add
router.get('/apartment/add', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('add_apartment', { favourites: [] });
});



module.exports = router;