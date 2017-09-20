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

var helper = {

	getAuth: function() {
		return axios.get("/login");
	},

	getProjectCars: (username) => {
		console.log(username);
		return axios.get("/user-projects/" + username)
			.then(response => {

				return response.data;

			});
	}

}

// export helper
export default helper;

