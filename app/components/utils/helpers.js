/*
	================== HELPERS FILE ==================
*/

// DEPENDENCIES
// ======================================================

// use axios to perform GET/POST requests
var axios = require("axios");

// HELPERS
// ======================================================

var axios = require("axios");

var helpers = {

	getAuth: function() {
		return axios.get("/login");
	},

	// Using in Projects.js. Get all the cars assigned to a particular user and return.
	getProjectCars: (username) => {
		return axios.get("/user-projects/" + username)
			.then(response => {
				console.log("getProjectCars");
				console.log(response.data);
				return response.data;
			});
	},

	// Using in Masterlist.js. Get a list of all the cars in the database and return.
	getMasterlist: () => {
		return axios.get("/get-cars/")
			.then(response => {
				return response.data;
			});
	},

	// Using in Profile.js. Grab a car's maintenance information by vin
	getCarMaintenanceInfo: (vin) => {
		return axios.get("/get-car/" + vin).then(response => {
			return response.data.maintenance;
		});
	},

	// Using in Information.js. Grab a car's information by vin
	getCarInfo: (vin) => {
		return axios.get("/get-car/" + vin).then(response => {
			// console.log(response.data.maintenance);
			return response.data;
		});
	}

}

// export helper
export default helpers;

