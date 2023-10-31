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

// app.use(routeBase, callback);
app.use("/static", express.static(__dirname + '/static'));
app.use("/hello", require("./controllers/hello.route"));