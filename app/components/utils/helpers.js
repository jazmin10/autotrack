var axios = require("axios");

var helpers = {

getAuth: function(username, password) {
	// console.log(username);
	// console.log(password);
	return axios.get('/login',{
		params: {username: username,
				password: password}
	}).then(function(res){
		// return(doc);
		console.log(doc);
	});
}

};

module.exports = helpers;
