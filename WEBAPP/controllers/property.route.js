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
        res.render('property', { user: req.user, properties : properties });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Show one property
router.get('/:id', ensureAuthenticated, ensureTenant, async (req, res) => {
    try {
        const propertyId = req.params.id;
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

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth?message=Please+log+in+to+view+details');
    }
}
function ensureTenant(req, res, next) {
    if (req.user && req.user.user_role === 'TENANT') {
        return next();
    } else {
        res.status(401).send('Unauthorized (bad user role)');
    }
}



// http://localhost:9000/property
router.get('/', (req, res) => {
    res.render('property', { user: req.user });

});

//http://localhost:9000/property/id/booking
router.get('/:id/booking', ensureAuthenticated, ensureTenant, (req, res) => {
    res.render('booking_page', { user: req.user });
});


module.exports = router;
