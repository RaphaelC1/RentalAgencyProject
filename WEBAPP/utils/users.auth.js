const passport = require("passport");
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
          if (user && request.user.user_role === "ADMIN") { 
            return next();
          } else {
            return response.end("401 Unautorized (bad user level)"); // TODO: Hierarchy
          }
        } else { // No special role needed for page -> next middleware
          return next();
        }
      } else {
        return response.end("401 Unautorized (not authenticated)");
        // response.redirect("/auth"); // not authenticated at all
      }
    }
        
  },

};