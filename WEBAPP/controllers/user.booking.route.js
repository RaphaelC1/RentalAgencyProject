const express = require('express');
const router = express.Router();
const userAuth = require('../utils/users.auth');
const leaseRepo = require('../utils/lease.repository');
const leaseRepository = require('../utils/lease.repository');
const tenantRepo = require('../utils/tenant.repository');
router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);

async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}




router.get('/', async (req, res) => {
    try {
        // Supposons que req.user contient l'objet utilisateur connecté avec user_id
        const userId = req.user.user_id;
        console.log(userId);
        // Utiliser le repository tenant pour trouver le tenant correspondant à l'utilisateur
        const tenant = await tenantRepo.getOneTenantByUserId(userId);
        console.log(tenant);
        if (!tenant) {
            return res.status(404).send('Tenant not found');
        }

        // Utiliser le repository lease pour obtenir les leases du tenant

        const leases = await leaseRepo.getLeaseByTenantId(tenant.id);
        console.log(leases);
        const leaseStart = leases[0].LeaseStart;
        const leaseEnd = leases[0].LeaseEnd;
        const monthlyRent = leases[0].MonthlyRent;
        const totalPayment = await leaseRepo.calculateTotalLeasePayment(leaseStart, leaseEnd, monthlyRent);
        console.log("oeoeoe:", totalPayment);
        // Rendre la vue avec les données de l'utilisateur et ses leases
        res.render('user_booking', { user: req.user, leases: leases, totalPayment: totalPayment });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});








module.exports = router;