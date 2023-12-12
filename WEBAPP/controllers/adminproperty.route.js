const express = require('express');
const router = express.Router();
const propertyRepo = require('../utils/property.repository');
const userAuth = require('../utils/users.auth')


router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}

router.use('/admin', userAuth.checkAuthentication('ADMIN'));


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
        Image: request.body.Image || null,
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
        Image: request.body.Image || null,
    };
    var numRows = await propertyRepo.editOneProperty(propertyData, propertyId);
    response.redirect("/admin/property");

}


module.exports = router;
