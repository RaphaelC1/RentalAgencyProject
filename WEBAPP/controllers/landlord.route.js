const express = require('express');
const router = express.Router();
const landlordRepo = require('../utils/landlord.repository');
const propertyRepo = require('../utils/property.repository');
const userAuth = require('../utils/users.auth')


router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}

router.use('/admin', userAuth.checkAuthentication('ADMIN'));
router.use('/landlord', userAuth.checkAuthentication('ADMIN'));


// ADD LANDLORD
router.get('/landlord/add', adminLandlordAddAction);
router.post('/landlord/create', adminLandlordCreateAction);
// List all landlords
router.get('/landlord', adminLandlordListAction);
// Delete one landlord
router.post('/landlord/delete', adminLandlordDeleteAction);
// Edit one landlord
router.get('/landlord/edit/:landlordId', landlordEditAction);
router.post('/landlord/update/:landlordId', landlordUpdateAction);// http://localhost:9000/admin



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


module.exports = router;