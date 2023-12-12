const express = require('express');
const router = express.Router();
const propertyRepo = require('../utils/property.repository');

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
        console.log("test");
        const startDate = req.query['start-date'];
        const endDate = req.query['end-date'];

        // verify if both dates are provided
        if (!startDate || !endDate) {
            return res.status(400).send('Start Date and End Date are required');
        }

        const properties = await propertyRepo.searchPropertiesByDates(startDate, endDate);
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

        res.render('booking_page', { user: req.user, property: property[0] });
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).send('Internal Server Error');
    }
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





// http://localhost:9000/property
router.get('/', (req, res) => {
    res.render('property', { user: req.user });

});




module.exports = router;
