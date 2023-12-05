// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
router.get('/', (req, res) => res.render('auth_view', { extraContent: "" , user: req.user}));
router.get("/user", auth.checkAuthentication("USER"), userAction);
router.get("/admin", auth.checkAuthentication("ADMIN"), adminAction);
router.get("/protected", protectedGetAction);
router.post("/login", loginPostAction);
//router.get("/logout", logoutAction);

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
    areValid = await userRepo.areValidCredentials(request.body.username, request.body.userpass);


    if (areValid) {
     user = await userRepo.getOneUser(request.body.username);
     console.log("user:",user)
      request.login(user, function (err) { 
          if (err) { 
            console.log("Error during login:", err);
            return response.send("Error during login", response.redirect("/auth/"));
            //  return next(err); 
        } 
  
          if (request.user.user_role === "ADMIN") {
              return response.redirect("/admin");
          } else {
              return response.redirect("/home/");
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
        response.redirect('/auth/');
    });
}

module.exports = router;