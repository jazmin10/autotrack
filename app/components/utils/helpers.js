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

	/* ---------- GET ROUTES ----------- */

	getAuth: function(username, password) {
		console.log(username, password);
		return axios.get("/login", {
			params: {
				username: username,
				password: password
			}
		}).then(response => {
			return (response.data);
		});
	},

	// Using in Projects.js. Get all the cars assigned to a particular user and return.
	getProjectCars: (username) => {
		return axios.get("/user-projects/" + username)
			.then(response => {
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
	getCarInfo: (vin, key, val) => {
		
		return axios.get("/get-car/" + vin).then(response => {
			// console.log(response.data.maintenance);
			return response.data;
		});
	},

	/* ---------- UPDATE ROUTES ----------- */

	// Using in Profile.js. Update a car profile's info/category/tasks.
	updateCarProfile: (vin, updateK, updateVal) => {
		return axios.put("/edit-car/" + vin, {updateKey:updateK, updateValue:updateVal}).then(response => {
			return response.data;
		});
	}
}

// export helper
export default helpers;

