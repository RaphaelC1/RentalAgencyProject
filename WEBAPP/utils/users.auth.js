const passport = require("passport");
const session = require("express-session");

const usersRepo = require("../utils/users.repository.js");

//hierarchy const


module.exports = {
  initialization(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
      try {
        // Your serialization logic
        done(null, user.user_name);
      } catch (error) {
        console.error("Error during serialization:", error);
        done(error, null);
      }
    });
    
    passport.deserializeUser(async function (username, done) {
      let user = await usersRepo.getOneUser(username);
      done(null, user);
    });
  },

  checkAuthentication(role) {
    return function (request, response, next) {
      if (request.isAuthenticated()) {
        if (role) {
          if (request.user && request.user.user_role === role) { 
            return next();
          } else {
            return response.status(401).end("Unauthorized (bad user level)");
          }
        } else { // No special role needed for page -> next middleware
          return next();
        }
      } else {
        return response.status(401).end("Unauthorized (not authenticated)");
        // Redirect to authentication page if not authenticated
      }
    }
  },

};