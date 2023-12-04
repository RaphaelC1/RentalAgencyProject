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
        res.render('property', { properties });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Show one property
router.get('/:id', async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await propertyRepo.getOneProperty(propertyId);

        if (!property) {
            return res.status(404).render('error', { message: 'Property not found' });
        }

        res.render('property_detail', { property });
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).send('Internal Server Error');
    }
});


// http://localhost:9000/property
router.get('/', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('property', { favourites: [] });

});



module.exports = router;




























module.exports = router;