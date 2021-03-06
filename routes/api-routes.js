/* ========== API ROUTES ========== */

// DEPENDENCIES
// =============================================================

var path = require("path");

// required models
var User = require("../models/User.js");
var Car = require("../models/Cars.js");

var cheerio = require("cheerio");
var request = require("request");

// set mongoose to leverage built in JS ES6 Promises

var mongoose = require("mongoose");
mongoose.Promise = Promise;


// API ROUTES
// =============================================================

module.exports = function(app, jwt, secret) {
	
	// =============== CAR & TASKS ===============

	// GET - get all cars
	app.get("/get-cars", function(req,res){

		Car.find({}, function(err,doc){

			if (err) {
				console.log(err);
			}
			else {
				res.json(doc);
			}
		});
	});

	// GET - get specific car by VIN#
	app.get("/get-car/:vin", function(req,res){

		Car.findOne({
				vin: req.params.vin
		}, function(err,doc){

			if (err) {
				console.log(err);
			}
			else {
				res.json(doc);
			}
		});
	});

	// POST - add new car (associated with user) to database
	app.post("/add-new-car/:username", function(req,res){
		
		// the new car that will be added into the database
		var carDoc = {};

		// get car doc fields through axios
		carDoc.vin = req.body.vin;
		carDoc.make = req.body.make;
		carDoc.model = req.body.model;
		carDoc.year = req.body.year;
		carDoc.color = req.body.color;
		carDoc.mileage = req.body.mileage;
		carDoc.maintenance = req.body.maintenance;

		// create new Car
		var newCar = new Car(carDoc);

		// save new Car to database
		newCar.save(function(err,doc){

			if (err) {
				console.log(err);
			}
			
			else {

				// find the user associated with this car
				User.findOneAndUpdate({
					"username":req.params.username
					},
					{
						$push:{
							"usercars":doc._id
						}
				}).exec(function(err,newdoc){
						if(err){
							res.send(err);
						}
						else {
							res.json(newdoc);
						}
				});
			}
		});
	});

	// UPDATE - update for maintenance or tasks (via maintenance array)
	app.put("/manage-car-maintenance/:vin", function(req,res){

		// use the updateKey passed through from axios
		var updateKey = req.body.updateKey;

		// use the updateValue passed through from axios
		var updateValue = req.body.updateValue;

		// create set object so that you can dynamically
		// set changes using variables
		var set = {};
		set[updateKey] = updateValue;

		// add edits to car document via vin number
		Car.findOneAndUpdate(
			{
				"vin":req.params.vin
			},
			{
				$set:set
			}).exec(function(err,doc){

			if (err){
				console.log(err);
			}
			else {
				res.json(doc);
			}
		});

	});

	// UPDATE - specifically for car info in the db; update multiple fields
	app.put("/manage-car-info/:vin", function(req, res){

		var updateDoc = {};

		updateDoc.make = req.body.make;
		updateDoc.model = req.body.model;
		updateDoc.year = req.body.year;
		updateDoc.color = req.body.color;
		updateDoc.mileage = req.body.mileage;

		Car.findOneAndUpdate({
			"vin": req.params.vin
		},
		{
			$set: updateDoc
		}, {new: true}).exec(function(err, doc){
			if(err) throw(err);
			
			res.json(doc);
		});


	});

	// DELETE - delete car from database by VIN#
	app.delete("/delete-car/:vin", function(req,res){

		// Find the car in the cars collection and remove it
		Car.findOneAndRemove({
			"vin":req.params.vin
			}).exec(function(err,doc){
			if (err){
				console.log(err);
			}
			else {
				// Find the car in the usercars array from the user collection and remove it
				User.findOneAndUpdate({usercars: {$in: [doc._id]}},
					{$pull: {usercars: {$in: [doc._id]}}}, {new: true}).exec(function(err, doc){
						res.send("CAR REMOVED");
					});
			}
		});
	});

	// DELETE - delete car info
	app.delete("/delete-car-info/:vin", function(req,res){

		// use the deleteKey passed through from axios
		var deleteKey = req.body.deleteKey;

		// use the deleteValue passed through from axios
		var deleteValue = req.body.deleteValue;

		// create set object so that you can dynamically
		// set changes using variables
		var remove = {};
		remove[deleteKey] = deleteValue;

		// add edits to car document via vin number
		Car.findOneAndUpdate(
			{
				"vin":req.params.vin
			},
			{
				$unset:remove
			}, function(err,doc){

			if (err){
				console.log(err);
			}
			else {
				res.send(doc);
			}
		});

	});

	// ******* PREVIOUS SCRAPING ROUTE *******
	// GET - scrape vehiclehistory.com for Car Info
	// app.get("/scrape", function(req, res) {

	// 	var queryURL = "https://www.vehiclehistory.com/paging-vin-report-data/specifications.php?vin=" + req.query.vin;

	// 	request(queryURL, function(error, response, html) {
	// 		if (error) throw error;
	// 		var $ = cheerio.load(html);

	// 		var results = {};

	// 		$("ul li").each(function(i, element) {
	// 			var content = $(element).find(".table_col_40").text();
	// 			var parent = $(element).find(".table_col_60").text();

	// 			if (parent === "MAKE") {
	// 				results.make = content;
	// 			}
	// 			else if (parent === "MODEL") {
	// 				results.model = content;
	// 			}
	// 			else if (parent === "YEAR") {
	// 				results.year = content;
	// 			}
				
	// 		});
	// 		res.json(results);
	// 	});
	// });

	// =============== USER ===============

	// POST - create new user; this is not a functionality available to users
	// users must be added through Postman
	app.post("/new-user", function(req, res){

		var results = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			usercars: []
		}

		var newUser = new User(results);

		newUser.save(function(err, user){
			if (err) throw err;

			res.json(user);
		});

	});

	// GET - check login information and perform login authentication
	app.get("/login", function(req,res){

		if (req.query.username === null || req.query.password === null || req.query.username === "" || req.query.password === "") {
			res.json({authenticated: false});
		}

		User.findOne({
			username:req.query.username,
			password:req.query.password
		}, function(err, doc){
			if (err) {
				console.log(err);
				res.json({authenticated: false});
			}

			if (doc === null) {
				res.json({authenticated: false});
			}
			else {
				// If credentials match a user in the db, respond with their username and jwt-token
				var myToken = jwt.sign({}, secret);

		 		res.status(200).json({
		 			token: myToken,
		 			username: doc.username
		 		});
			}
		});
	});

	// GET - user information and cars
	app.get("/user-projects/:username", function(req,res){

		User.findOne({
			username:req.params.username
		})
		.populate("usercars")
		.exec(function(err,doc){
			if (err) {
				console.log(err);
			}
			else {
				res.json(doc);
			}
		});
	});	

	// =============== HTML ===============
	// GET - index html page
	app.get("*", function(req,res){
		res.sendFile(path.resolve(__dirname, "../public/index.html"));
	});
}