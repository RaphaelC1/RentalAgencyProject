const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.listen(process.env.WEB_PORT, '0.0.0.0',
    function () { console.log("Listening on " + process.env.WEB_PORT); }
);

app.get('/', (request, response) => { // 'GET' as a HTTP VERB, not as a 'getter'!
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // optional
});

// MIDDLEWARE REGISTRATIONS
// app.use(callback1, callback2, callback3)
const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

const session = require("express-session");
app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in msec
    resave: false
}));

//if (request.session.cart===undefined) request.session.cart = [];
//request.session.cart.push("xxxx");

const auth = require("./utils/users.auth");
auth.initialization(app);

// app.use(routeBase, callback);
app.use("/static", express.static(__dirname + '/static'));
app.use("/hello", require("./controllers/hello.route"));
app.use("/cars", require("./controllers/cars.route"));
app.use("/auth", require("./controllers/auth.route"));

// npm install cors
var cors = require('cors');
const { request } = require('express');
app.use(cors());
app.use("/carsapi", require("./controllers/carsapi.route"));


let value = "something";
let other = `xxx yyy ${value} zzz`;