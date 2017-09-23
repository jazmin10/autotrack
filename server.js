/* ================== SERVER ================== */

// DEPENDENCIES
// =============================================================

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");

// EXPRESS APP
// =============================================================

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// // set up static directory 'public'
// app.use(express.static("public"));
app.use("/public", express.static("./public"));

// EXPRESS JWT AUTHENTICATION
// =============================================================

// JSON Web Token
var jwtInformation = require("./private.js");
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var secret = jwtInformation.secret;

// Setting up middle ware for json web token
app.use(expressJWT({
	secret: secret,
	// This is to provide the token in the url as well, not only in body of requests
	getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
     	return req.query.token;
    }
    	return null;
  	}
})
// Unprotected routes: don't need token to access
.unless({ 
	path: ['/', '/login']
}));

app.use(function(err, req, res, next){
	if (err.name === "UnauthorizedError") {
		res.sendFile(path.join(__dirname, "./public/noAuthorization.html"));
	}
});

// MONGODB CONFIGURATION
// =============================================================

// mongodb local connection
mongoose.connect("mongodb://localhost/autotrackdb", {
	useMongoClient: true});

// heroku mongolab connection
// mongoose.connect("");

var db = mongoose.connection;

db.on("error", function(err){
	console.log("Mongoose Error: ", err);
});

db.once("open", function(){
	console.log("Mongoose connection successful.");
});

// EXPRESS APP ROUTES
// =============================================================

require("./routes/api-routes.js")(app, jwt, secret);

// START LISTENER
// =============================================================
app.listen(PORT, function(){
	console.log("App listening on PORT " + PORT);
});