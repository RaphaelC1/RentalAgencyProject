// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
router.get('/', (req, res) => {
    const message = req.query.message || "";
    res.render('auth_view', { extraContent: message, user: req.user });
});

router.get("/user", auth.checkAuthentication("USER"), userAction);
router.get("/admin", auth.checkAuthentication("ADMIN"), adminAction);
router.get("/protected", protectedGetAction);
router.post("/login", loginPostAction);

// Retrieves user data and renders a view with the user's JSON data.
async function userAction(request, response) {
    let userData = await userRepo.getOneUser(request.user.user_name);
    let userJson = JSON.stringify(userData); // if  userData.user_role ...
    response.render("profile_user", { "extraContent": userJson });
}

async function adminAction(request, response) {
    let userData = await userRepo.getOneUser(request.user.user_name);
    let userJson = JSON.stringify(userData); // if  userData.user_role ...
    response.render("admin_home", { "extraContent": userJson });
}

async function protectedGetAction(request, response) {
    if (request.isAuthenticated()) {
        if (request.user.user_role === "ADMIN") {
            response.redirect("/admin");
        } else {
            response.redirect("/home");
        }
    } else {
        response.redirect("/auth");
    }
}


async function loginPostAction(request, response) {
    const username = request.body.username;
    const providedPassword = request.body.userpass;
    // Check if the username exists
    const user = await userRepo.getOneUser(username);
    if (!user) {
        return response.send("User not found");
    }
    const isValidPassword = await userRepo.checkPassword(username, providedPassword);

    if (isValidPassword) {
        request.login(user, function (err) {
            if (err) {
                console.error("Error during login:", err);
                return response.send("Error during login");
            }

            if (user.user_role === "ADMIN") {
                return response.redirect("/admin");
            } else {
                return response.redirect("/home/");
            }
        });
    } else {
        return response.send("Wrong password");
    }
}

function logoutAction(request, response) {
    request.logout(function (err) {
        if (err) { return next(err); }
        response.redirect('/auth/');
    });
}



module.exports = router;