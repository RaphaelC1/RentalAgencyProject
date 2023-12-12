const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const auth = require("./utils/users.auth");
const session = require('express-session');



app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in msec
    resave: false
}));

app.set("view engine", "ejs");
app.set("views", "views");

app.listen(process.env.WEB_PORT, '0.0.0.0',
    function () { console.log("Listening on " + process.env.WEB_PORT); }
);

// Initialize Passport middleware
auth.initialization(app);

// MIDDLEWARE REGISTRATIONS
// app.use(callback1, callback2, callback3)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(routeBase,callback);
app.use("/css", express.static(__dirname + '/css'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/home", require("./controllers/home.route"));
app.use("/", require("./controllers/home.route"));
app.use("/admin", require("./controllers/admin.route"));
app.use("/admin", require("./controllers/adminproperty.route"));
app.use("/admin", require("./controllers/tenant.route"));
app.use("/admin", require("./controllers/landlord.route"));
app.use("/admin", require("./controllers/lease.route"));
app.use("/admin", require("./controllers/admin_user.route"));
app.use("/auth", require("./controllers/auth.route"));
app.use("/property", require("./controllers/property.route"));
app.use("/register", require("./controllers/register.route"));


