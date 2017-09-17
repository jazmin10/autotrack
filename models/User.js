/*
	================== User Model ==================
*/

// require mongoose
var mongoose = require("mongoose");

// create Schema class
var Schema = mongoose.Schema;

// create User schema
var UserSchema = new Schema({
	// to keep company confidentiality,
	// users are manually added into the database
	username:{
		type:String,
		unique:true
	},
	email:{
		type:String,
		unique:true
	},
	password:{
		type:String
	},
	usercars:[{
		// this will save an array of cars via VIN#
		type:Schema.Types.vin,
		// refers to the Cars model
		ref:"Car"
	}]
});

// create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// export the User model
module.exports = User;