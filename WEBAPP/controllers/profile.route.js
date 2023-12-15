//profile.route.js
const express = require('express');
const router = express.Router();
const userRepo = require('../utils/users.repository');
router.get("/logout", logoutAction);
router.get('/my/:name', mynameAction);
router.get('/myy', mynameAction);

// Logout route to log out the user and redirect to the login page
router.get('/logout', logoutAction);

async function mynameAction(request, response) {
    response.send("MYNAME ACTION " + request.params.name);
}


// http://localhost:9000/profile
router.get('/', (req, res) => {
    //res.send('Hello, from controller...');
    res.render('profile_user', { user: req.user });
});

router.get('/edit', (req, res)=>{
    res.render('edit_profile', { user: req.user });
});
// POST endpoint to handle profile updates
router.post('/edit', async (req, res) => {
    try {
        const { username, email, role, password } = req.body;

        // Assuming you have the user ID stored in the session
        const userId = req.user.user_id;

        // Logic to update user data in the database using your repository or ORM
        // Update the Users table with the new user data
        // Example using a repository function (replace with your actual update logic):
        const updatedUserData = {
            user_name: username,
            user_email: email,
            user_role: role,
            user_pass: password
        };

        // Filter out undefined values and replace them with null
        Object.keys(updatedUserData).forEach(key => {
            if (updatedUserData[key] === undefined) {
                updatedUserData[key] = null;
            }
        });

        const numRowsAffected = await userRepo.updateUser(userId, updatedUserData);

        if (numRowsAffected) {
            // If the update was successful, redirect the user to their profile
            res.redirect('/home/');
        } else {
            // Handle the case where the update was not successful
            res.status(500).send('Failed to update user profile');
        }
    } catch (error) {
        console.error(error);
        res.redirect('edit_profile', { user: req.user });
    }
});




function logoutAction(request, response) {
    // Log out the user
    request.logout(function(err) {
        if (err) {
            console.error("Error during logout:", err);
            // Handle the error, if any
        }
        // Destroy the session to log the user out completely
        request.session.destroy(function (err) {
            if (err) {
                console.error("Error destroying session:", err);
                // Handle the error, if any
            }
            // Redirect the user to the login page after logging out
            response.redirect('/auth');
        });
    });
}

module.exports = router;