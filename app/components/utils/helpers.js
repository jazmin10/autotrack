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
		// console.log(username, password);
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
	// Needs to include token in request headers
	getProjectCars: (username) => {
		return axios({
				method: 'GET',
				url: "/user-projects/" + username,
				headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
			}).then(response => {
				return response.data;
			});
	},

	// Using in Masterlist.js. Get a list of all the cars in the database and return.
	// Needs to include token in request headers
	getMasterlist: () => {
		return axios({
			method: 'GET',
			url: "/get-cars/",
			headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
		}).then(response => {
				return response.data;
			});
	},

	// Using in Profile.js. Grab a car's maintenance information by vin
	// Needs to include token in request headers
	getCarMaintenanceInfo: (vin) => {
		return axios({
			method: 'GET',
			url: "/get-car/" + vin,
			headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
		}).then(response => {
			return response.data.maintenance;
		});
	},


	// Using in Information.js and Add.js. Grab a car's information by vin
	// Using in Information.js. Grab a car's information by vin
	// Needs to include token in request headers[]
	getCarInfo: (vin) => {

		return axios({
			method: "GET",
			url: "/get-car/" + vin,
			headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
		}).then(response => {
			return response.data;
		});
	},

	scrape: (vin) => {

		return axios.get("/scrape", { params: { vin: vin }}).then(response => {
			console.log(response);
			return response.data;
		});
	},

	scrape: (vin) => {

		return axios.get("/scrape", { params: { vin: vin }}).then(response => {
			return response.data;
		});
	},


	/* ---------- UPDATE ROUTES ----------- */

	// Using in Profile.js. Update/"delete" a car profile's info/category/tasks.
	// Needs to include token in request headers
	updateCarMaintenanceArray: (vin, updateK, updateVal) => {
		return axios({
			method: 'PUT',
			url: "/manage-car-maintenance/" + vin,
			data: {updateKey:updateK, updateValue:updateVal},
			headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
		}).then(response => {
			
			return response.data;
		});

	}
}

// export helper
export default helpers;

