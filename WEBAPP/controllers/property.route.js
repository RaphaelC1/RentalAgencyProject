const express = require('express');
const router = express.Router();
const propertyRepo = require('../utils/property.repository');
const tenantRepo = require('../utils/tenant.repository');
const leaseRepo = require('../utils/lease.repository');
const e = require('express');
router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}



// Fetch all properties
router.get('/', async (req, res) => {
    try {
        const properties = await propertyRepo.getAllProperties();
        res.render('property', { user: req.user, properties: properties });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Search properties by form data
router.get('/search', async (req, res) => {
    try {
        const startDate = req.query['start-date'];
        const endDate = req.query['end-date'];
        const city = req.query.city;
        const rent = req.query.rent;

        // vérifie si les dates sont fournies
        if (!startDate || !endDate) {
            return res.status(400).send('Start Date and End Date are required');
        }

        const properties = await propertyRepo.searchPropertiesByForm(startDate, endDate, city, rent);
        if (properties.length === 0) {
            // Aucune propriété disponible
            return res.render('property_search', { user: req.user, properties: properties, message: 'No properties available ' });
        }
        res.render('property_search', { user: req.user, properties: properties });
    } catch (error) {
        console.error('Error searching properties:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Show one property
router.get('/:id', ensureAuthenticated, ensureTenant, async (req, res) => {
    try {
        const propertyId = req.params.id;
        console.log('Property ID:', propertyId);
        const property = await propertyRepo.getOneProperty(propertyId);

        if (!property) {
            return res.status(404).render('error', { message: 'Property not found' });
        }

        res.render('property_detail', { user: req.user, property: property[0] });
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Show booking page with property details
router.get('/:id/booking', ensureAuthenticated, ensureTenant, async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await propertyRepo.getOneProperty(propertyId);

        if (!property) {
            return res.status(404).render('error', { message: 'Property not found' });
        }

        // Fetch the booked dates for the property
        const bookedDates = await propertyRepo.getBookedDates(propertyId);

        res.render('booking_page', { user: req.user, property: property[0], bookedDates });
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/test', (req, res) => {
    console.log("test post works");
    res.send("Test post works");
});



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {

        // if the user is not authenticated, redirect to login page except for the search form
        if (req.originalUrl.includes('/property/search')) {
            return next();
        }
        res.redirect('/auth?message=Please+log+in+to+view+details');
    }
}
function ensureTenant(req, res, next) {
    if (req.user && req.user.user_role === 'TENANT') {
        return next();
    } else if (!req.isAuthenticated()) {
        // Allow access for non-authenticated users for the search form
        return next();
    } else {
        res.status(401).send('Unauthorized (bad user role)');
    }
}







module.exports = router;
