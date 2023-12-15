// controllers/auth.route.js
const express = require('express');
const session = require("express-session");
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");


const saltRounds = 10; 

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
        const username = request.body.username;
        const userpass = request.body.userpass;
        // Fetch user data based on the provided username
        const user = await userRepo.getOneUser(username);
        
        console.log("user role :  ", user.user_name);

        console.log("User Input Password:", userpass);
        console.log("Type of User Input Password:", typeof userpass);
        console.log("stored Input Password:", user);
        console.log("Type of stored Input Password:", typeof user.user_pass);
        

        if (user) {
            const storedHashedPassword = user.user_pass; // user_pass is the hashed password in your database
            // Compare the provided password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(userpass, storedHashedPassword);

            console.log("Password Match:", passwordMatch); // Check if the password matches

            if (passwordMatch) {
                // Redirect based on user role
                request.login(user, function (err) { 
                    if (err) { 
                      console.log("Error during login:", err);
                      return response.send("Error during login", response.redirect("/auth/"));
                      
                  } 
            
                    if (request.user.user_role === "ADMIN") {
                        return response.redirect("/admin");
                    } else {
                        return response.redirect("/home/");
                    }
                });
            } else {
                // Passwords do not match - invalid credentials
                return response.send("Invalid credentials provided");
            }
        } else {
            // User does not exist
            return response.send("User does not exist");
        }
    } catch (error) {
        console.error(error);
        return response.send("An error occurred during login");
    }
}

function logoutAction(request, response) {
    request.logout(function (err) {
        if (err) { return next(err); }
        response.redirect('/auth/');
    });
}



module.exports = router;