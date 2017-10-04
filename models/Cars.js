/*
	================== Cars Model ==================
*/

// DEPENDENCIES
// =============================================================

// require mongoose
var mongoose = require("mongoose");

// create Schema class
var Schema = mongoose.Schema;

// CAR SCHEMA
// =============================================================

// create Car schema
var CarSchema = new Schema({
	vin:{
		type:String,
		required:true,
		unique:true
	},
	make:{
		type:String,
		required:true
	},
	model:{
		type:String,
		required:true
	},
	year:{
		type:Number,
		required:true
	},
	color:{
		type:String
	},
	mileage:{
		type:Number,
		default: 0
	},
	maintenance:{
		type:Array
	}
});

// create the Car model with the CarSchema
var Car = mongoose.model("Car", CarSchema);

// export the Car model
module.exports = Car;