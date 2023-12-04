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
// List all tenants
router.get('/tenant', adminTenantListAction);

// Delete one tenant
router.post('/tenant/delete', adminTenantDeleteAction);
// Edit one tenant
router.get('/tenant/edit/:tenantId', tenantEditAction);
router.post('/tenant/update/:tenantId', tenantUpdateAction);

// ADD LANDLORD
router.get('/landlord/add', adminLandlordAddAction);
router.post('/landlord/create', adminLandlordCreateAction);
// List all landlords
router.get('/landlord', adminLandlordListAction);
// Delete one landlord
router.post('/landlord/delete', adminLandlordDeleteAction);
// Edit one landlord
router.get('/landlord/edit/:landlordId', landlordEditAction);
router.post('/landlord/update/:landlordId', landlordUpdateAction);


// ADD PROPERTY
router.get('/property/add', adminPropertyAddAction);
router.post('/property/create', adminPropertyCreateAction);
// List all properties
router.get('/property', adminPropertyListAction);
// Delete one property
router.post('/property/delete', adminPropertyDeleteAction);
// Edit one property
router.get('/property/edit/:propertyId', propertyEditAction);
router.post('/property/update/:propertyId', propertyUpdateAction);


// FUNCTIONS ADD LANDLORD
async function adminLandlordAddAction(request, response) {
    response.render("admin/add_landlord", { /* Additional data if needed */ });
}

async function adminLandlordCreateAction(request, response) {
    var landlordData = {
        FirstName: request.body.firstName,
        LastName: request.body.lastName || null,
        Email: request.body.email || null,
        PhoneNumber: request.body.phoneNumber || null,
    };

    var landlordId = await landlordRepo.addOneLandlord(landlordData);
    response.redirect("/admin/landlord");
}
// FUNCTIONS LIST ALL LANDLORDS
async function adminLandlordListAction(request, response) {
    var landlords = await landlordRepo.getAllLandlords();
    response.render("admin/admin_landlord", { landlords: landlords });
}
// FUNCTIONS DELETE ONE LANDLORD
async function adminLandlordDeleteAction(request, response) {
    var landlordId = request.body.id;

    // Get all properties associated with the landlord
    var properties = await propertyRepo.getPropertiesByLandlordId(landlordId);

    // Delete each property
    for (let i = 0; i < properties.length; i++) {
        await propertyRepo.delOneProperty(properties[i].id);
    }

    // Delete the landlord
    var numRows = await landlordRepo.delOneLandlord(landlordId);

    response.redirect("/admin/landlord");
}
// EDIT A LANDLORD
async function landlordEditAction(request, response) {
    // response.send("EDIT ACTION");
    var landlordId = request.params.landlordId;
    var landlord = await landlordRepo.getOneLandlord(landlordId);
    response.render("admin/edit_landlord", { landlord: landlord[0] });
}

async function landlordUpdateAction(request, response) {
    var landlordId = request.params.landlordId;
    var landlordData = {
        FirstName: request.body.firstName,
        LastName: request.body.lastName || null,
        Email: request.body.email || null,
        PhoneNumber: request.body.phoneNumber || null,
    };
    console.log("hey landlordData in function landlordUpdateAction:", landlordData);
    console.log("hey landlordId in function landlordUpdateAction:", landlordId);
    var numRows = await landlordRepo.editOneLandlord(landlordData, landlordId);
    response.redirect("/admin/landlord");
}

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


// FUNCTIONS ADD PROPERTY
async function adminPropertyAddAction(request, response) {
    response.render("admin/add_property", { /* Additional data if needed */ });
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
    response.redirect("/admin/property");
}


// FUNCTIONS LIST ALL PROPERTIES
async function adminPropertyListAction(request, response) {
    var properties = await propertyRepo.getAllProperties();
    console.log(properties);
    response.render("admin/admin_property", { properties: properties });
}
// FUNCTIONS DELETE ONE PROPERTY
async function adminPropertyDeleteAction(request, response) {
    var propertyId = request.body.id;
    console.log("DELETE " + propertyId);
    var numRows = await propertyRepo.delOneProperty(propertyId);

    response.redirect("/admin/property");
}
// FUNCTIONS EDIT ONE PROPERTY
async function propertyEditAction(request, response) {
    // response.send("EDIT ACTION");
    var propertyId = request.params.propertyId;
    var property = await propertyRepo.getOneProperty(propertyId);
    response.render("admin/edit_property", { property: property[0] });
}
async function propertyUpdateAction(request, response) {
    var propertyId = request.params.propertyId;
    var propertyData = {
        Address: request.body.Address || null,
        City: request.body.City || null,
        ZipCode: request.body.ZipCode || null,
        NumberOfBedrooms: request.body.NumberOfBedrooms || null,
        NumberOfBathrooms: request.body.NumberOfBathrooms || null,
        Rent: request.body.Rent || null,
        id_Landlords: request.body.LandlordId || null,
    };
    var numRows = await propertyRepo.editOneProperty(propertyData, propertyId);
    response.redirect("/admin/property");

}



// http://localhost:9000/admin
router.get('/', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('admin/admin_home', { favourites: [] });

});


module.exports = router;