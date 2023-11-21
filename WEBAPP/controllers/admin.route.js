// controllers/admin.route.js
const express = require('express');
const router = express.Router();
const tenantRepo = require('../utils/tenant.repository');
const landlordRepo = require('../utils/landlord.repository');
const propertyRepo = require('../utils/property.repository');

router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}

// ADD TENANT
router.get('/tenant/add', adminTenantAddAction);
router.post('/tenant/create', adminTenantCreateAction);

// ADD LANDLORD
router.get('/landlord/add', adminLandlordAddAction);
router.post('/landlord/create', adminLandlordCreateAction);

// ADD PROPERTY
router.get('/property/add', adminPropertyAddAction);
router.post('/property/create', adminPropertyCreateAction);
// List all properties
router.get('/property', adminPropertyListAction);
// Delete one property
router.post('/property/delete', adminPropertyDeleteAction);

// FUNCTIONS ADD TENANT
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

// FUNCTIONS ADD LANDLORD
async function adminLandlordAddAction(request, response) {
    response.render("add_landlord", { /* Additional data if needed */ });
}

async function adminLandlordCreateAction(request, response) {
    var landlordData = {
        FirstName: request.body.firstName,
        LastName: request.body.lastName || null,
        Email: request.body.email || null,
        PhoneNumber: request.body.phoneNumber || null,
    };

    var landlordId = await landlordRepo.addOneLandlord(landlordData);
    response.redirect("/admin");
}

// FUNCTIONS ADD PROPERTY
async function adminPropertyAddAction(request, response) {
    response.render("add_property", { /* Additional data if needed */ });
}

async function adminPropertyCreateAction(request, response) {
    var propertyData = {
        Address: request.body.Address || null,
        City: request.body.City || null,
        ZipCode: request.body.ZipCode || null,
        NumberOfBedrooms: request.body.NumberOfBedrooms || null,
        NumberOfBathrooms: request.body.NumberOfBathrooms || null,
        Rent: request.body.Rent || null,
        id_Landlords: request.body.LandlordId || null,
    };

    var propertyId = await propertyRepo.addOneProperty(propertyData);
    response.redirect("/admin");
}


// FUNCTIONS LIST ALL PROPERTIES
async function adminPropertyListAction(request, response) {
    var properties = await propertyRepo.getAllProperties();
    console.log(properties);
    response.render("admin_property", { properties: properties });
}
// FUNCTIONS DELETE ONE PROPERTY
async function adminPropertyDeleteAction(request, response) {
    var propertyId = request.body.id;
    console.log("DELETE " + propertyId);
    var numRows = await propertyRepo.delOneProperty(propertyId);

    response.redirect("/admin/property");
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

// http://localhost:9000/admin/property
router.get('/property', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('admin_property', { favourites: [] });
});

module.exports = router;