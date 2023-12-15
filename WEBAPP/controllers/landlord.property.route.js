const express = require('express');
const router = express.Router();
const propertyRepo = require('../utils/property.repository');
const landlordRepo = require('../utils/landlord.repository');
router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);

async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}

// Delete one property
router.post('/my_properties/delete', adminPropertyDeleteAction);
// Edit one property
router.get('/my_properties/edit/:propertyId', propertyEditAction);
router.post('/my_properties/update/:propertyId', propertyUpdateAction);
// FUNCTIONS DELETE ONE PROPERTY


async function adminPropertyDeleteAction(request, response) {
    var propertyId = request.body.id;
    console.log("DELETE " + propertyId);
    var numRows = await propertyRepo.delOneProperty(propertyId);

    response.redirect("/my_properties");
}
// FUNCTIONS EDIT ONE PROPERTY
async function propertyEditAction(request, response) {
    // response.send("EDIT ACTION");
    var propertyId = request.params.propertyId;
    var property = await propertyRepo.getOneProperty(propertyId);
    response.render("my_properties/edit_property_landlord", { property: property[0] });
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
    response.redirect("/my_properties");

}

router.get('/', async (req, res) => {
    try {
        const userId = req.user.user_id;
        console.log(userId);
        const landlord = await landlordRepo.getOneLandlordByUserId(userId);
        console.log("id", landlord.id);
        const properties = await propertyRepo.getPropertiesByLandlordId(landlord.id);
        console.log("properties", properties);

        res.render('landlord_property', { user: req.user, properties: properties });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;