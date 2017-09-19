/*
	================== HELPERS FILE ==================
*/

// DEPENDENCIES
// ======================================================

// use axios to perform GET/POST requests
var axios = require("axios");

// HELPERS
// ======================================================

// export helper
export default helper;

var axios = require("axios");

var helper = {

getAuth: function() {
	return axios.get("/login");
},

}

