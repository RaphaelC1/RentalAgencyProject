// controllers/admin.route.js
const express = require('express');
const router = express.Router();

router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}


// http://localhost:9000/admin
router.get('/', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('admin/admin_home', { favourites: [] });

});


module.exports = router;