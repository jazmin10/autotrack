/* ========== API ROUTES ========== */

// dependencies
var path = require("path");

// required models
var User = require("../models/User.js");
var Car = require("../models/Cars.js");

// set mongoose to leverage built in JS ES6 Promises

var mongoose = require("mongoose");
// mongoose.Promise = Promise;

// ===== CAR & TASKS =====
// GET - get all cars
module.exports = function(app) {

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

	// POST - add new car to database
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
				// handle cars that have already been saved
				// cars that are saved in database must be unique
				// res.json({alreadySaved: true});
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

	// UPDATE - car information, maintenance, or tasks
	app.put("/manage-car-maintenance/:vin", function(req,res){

		// use the updateKey passed through from axios
		var changeKey = req.body.changeKey;

		// use the updateValue passed through from axios
		var changeValue = req.body.changeValue;

		// create set object so that you can dynamically
		// set changes using variables
		var set = {};
		set[changeKey] = changeValue;

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

				// possible errors

				// wrong data type
			}
			else {
				res.json(doc);
			}
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

	// ===== USER =====
	// GET - login information
	app.get("/login", function(req,res){

		User.findOne({
			username:req.body.username,
			password:req.body.password
		}, function(err, doc){
			if (err) {
				console.log(err);
				res.json({authenticated: false});
			}
			else if (req.body.username === null || req.body.password === null || req.body.username === "" || req.body.password === "") {
				console.log("Invalid Credentials");
				res.json({authenticated: false});
			}
			else {
				// how we handle logged in user here
				console.log(doc);
				return(doc);
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

	// ===== HTML =====
	// GET - index html page
	app.get("*", function(req,res){
		res.sendFile(path.resolve(__dirname, "../public/index.html"));
	});
}