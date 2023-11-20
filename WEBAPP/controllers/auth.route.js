// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
router.get('/', (req, res) => res.render('auth_view', { extraContent: "" }));
router.get("/user", auth.checkAuthentication("USER"), userAction);
router.get("/admin", auth.checkAuthentication("ADMIN"), userAction);
router.get("/protected", protectedGetAction);
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);

async function userAction(request, response) {
    let userData = await userRepo.getOneUser(request.user.user_name);
    let userJson = JSON.stringify(userData); // if  userData.user_role ...
    response.render("auth_view", { "extraContent": userJson });
}

async function protectedGetAction(request, response) {
    if (request.isAuthenticated()) {
        if (request.user.user_role === "ADMIN") {
            response.redirect("/auth/admin");
        } else {
            response.redirect("/auth/user");
        }
    } else {
        response.redirect("/auth");
    }
}

async function loginPostAction(request, response) {
    areValid = await userRepo.areValidCredentials(request.body.username, request.body.userpass);

    if (areValid) {
        user = await userRepo.getOneUser(request.body.username);
        request.login(user, function (err) {
            if (err) { console.log("ERROR"); console.log(err); return next(err); }

            if (request.user.user_role === "ADMIN") {
                return response.redirect("/auth/admin");
            } else {
                return response.redirect("/auth/user");
            }
        });
    } else {
        response.send("Invalid credentials provided");
        // TODO redirect/normal error message
    }
}

function logoutAction(request, response) {
    request.logout(function (err) {
        if (err) { return next(err); }
        response.redirect('/auth');
    });
}

module.exports = router;