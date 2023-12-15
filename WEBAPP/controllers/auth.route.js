// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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
    try {
        const { username, userpass } = request.body;

        // Fetch user data based on the provided username
        const storedUser = await userRepo.getOneUser(username);

        if (storedUser) {
            const storedHashedPassword = storedUser.user_pass; // Assuming user_pass is the hashed password in your database

            // Compare the provided password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(userpass, storedHashedPassword);

            if (passwordMatch) {
                // Passwords match - user is authenticated
                request.login(storedUser, function (err) { // Pass the retrieved user to request.login
                    if (err) {
                        console.log("Error during login:", err);
                        return response.send("Error during login");
                    }

                    if (storedUser.user_role === "ADMIN") {
                        return response.redirect("/admin");
                    } else {
                        return response.redirect("/home/");
                    }
                });
            } else {
                // Passwords do not match - invalid credentials
                response.send("Invalid credentials provided");
            }
        } else {
            // User does not exist
            response.send("User does not exist");
        }
    } catch (error) {
        console.error(error);
        response.send("An error occurred during login");
    }
}

function logoutAction(request, response) {
    request.logout(function (err) {
        if (err) { return next(err); }
        response.redirect('/auth/');
    });
}



module.exports = router;