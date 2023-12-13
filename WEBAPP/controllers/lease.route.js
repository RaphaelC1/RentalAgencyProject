const express = require('express');
const router = express.Router();
const leaseRepo = require('../utils/lease.repository');


router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);
async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}

// ADD LEASE
router.get('/lease/add', adminLeaseAddAction);
router.post('/lease/create', adminLeaseCreateAction);
// Delete one lease
router.post('/lease/delete', adminLeaseDeleteAction);
// Edit one lease
router.get('/lease/edit/:leaseId', leaseEditAction);
router.post('/lease/update/:leaseId', leaseUpdateAction);
// List all leases
router.get('/lease', adminLeaseListAction);


//FUNCTIONS LIST ALL LEASES
async function adminLeaseListAction(request, response) {
    var leases = await leaseRepo.getAllLeases();
    console.log(leases);
    response.render("admin/admin_lease", { leases: leases });
}

// FUNCTIONS ADD LEASE
async function adminLeaseAddAction(request, response) {
    response.render("admin/add_lease", { /* Additional data if needed */ });
}

async function adminLeaseCreateAction(request, response) {
    var leaseData = {
        LeaseStart: request.body.leaseStart,
        LeaseEnd: request.body.leaseEnd || null,
        MonthlyRent: request.body.Rent || null,
        SecurityDeposit: request.body.deposit || null,
        id_Properties: request.body.propertyId || null,
        id_Tenants: request.body.tenantId || null,
    };

    var leaseId = await leaseRepo.addOneLease(leaseData);
    response.redirect("/admin/lease");
}

//EDIT A LEASE
async function leaseEditAction(request, response) {
    // response.send("EDIT ACTION");
    var leaseId = request.params.leaseId;
    var lease = await leaseRepo.getOneLease(leaseId);
    response.render("admin/edit_lease", { lease: lease[0] });
}

async function leaseUpdateAction(request, response) {
    var leaseId = request.params.leaseId;
    var leaseData = {
        LeaseStart: request.body.leaseStart,
        LeaseEnd: request.body.leaseEnd || null,
        MonthlyRent: request.body.Rent || null,
        SecurityDeposit: request.body.deposit || null,
        id_Properties: request.body.propertyId || null,
        id_Tenants: request.body.tenantId || null,
    };
    var numRows = await leaseRepo.editOneLease(leaseData, leaseId);
    response.redirect("/admin/lease");
}

// DELETE ONE LEASE
async function adminLeaseDeleteAction(request, response) {
    var leaseId = request.body.id;
    console.log("DELETE " + leaseId);
    var numRows = await leaseRepo.delOneLease(leaseId);

    response.redirect("/admin/lease");
}




module.exports = router;