var axios = require("axios");

var helper = {

getAuth: function() {
	return axios.get("/login");
},

}
