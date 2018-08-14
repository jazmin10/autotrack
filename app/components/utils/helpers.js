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

	// Using in Splash.js. Get the username and password and verify 
	// the user's login credentials are already in the database.
	getAuth: function(username, password) {
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

	
	// Using in Add.js. Scrape car information website by vin number.
	// scrape: (vin) => {

	// 	return axios({
	// 		method: "GET",
	// 		url: "/scrape", 
	// 		params: { vin: vin },
	// 		headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
	// 	}).then(response => {
	// 		return response.data;
	// 	});
	// },

	// Using in Add.js. Makes API request and grabs car's information by vin number
	vinApi: (vin) => {
		return axios({
			method: "GET",
			url: `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/${vin}?format=json`
		}).then(response => {

			// Object will hold make, model, and year of car
			var carInfo = {};

			response.data.Results.forEach((currInfo) => {
				if (currInfo.Variable === "Make") {
					let makeName = currInfo.Value.toLowerCase();

					// Uppercases first letter of make value
					carInfo.make = makeName.charAt(0).toUpperCase() + makeName.slice(1);
				}
				else if (currInfo.Variable === "Model") {
					carInfo.model = currInfo.Value;
				}
				else if (currInfo.Variable === "Model Year") {
					carInfo.year = currInfo.Value;
				}
			});

			return carInfo;
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

	},

	// Using in Add.js. If the VIN# exists in the database already, edit the 
	// car with the new information being passed through.
	updateCarInfo: (vin, car) => {

		return axios({
			method: 'PUT',
			url: "/manage-car-info/" + vin,
			data: car,
			headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
		})
		.then(response => {
			return response.data;
		});
	},

	/* ----- CREATE ROUTES -------*/
	
	// Using in Add.js. If the VIN# doesn't exist in the database yet, add the
	// car into the database and add to the associated user's carlist.
	createCar: (username, car) => {
		return axios({
			method: 'POST',
			url: "/add-new-car/" + username, 
			data: car,
			headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
		});
	},

	/* ---------- DELETE ROUTES ----------- */

	// Using in Profile.js. Delete the car by VIN# from the database.
	deleteCar: (vin) => {
		return axios({
			method:'DELETE',
			url:'/delete-car/' + vin,
			headers: {Authorization: "Bearer " + localStorage.getItem("autotrackToken")}
		});
	}
}

// export helper
export default helpers;

