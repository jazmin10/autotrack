  // include React
import React from "react";

// helper component for making API calls
import helpers from "./utils/helpers.js";

import router, {browserHistory} from "react-router";


// creating the splash component
export default class Splash extends React.Component {

	// checkCredentials() {}

	constructor(props){
		
		super(props);

		this.state = {
			username: "",
			password: ""
		};
		

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);

	}

	handleChange(event) {

		var newState = {};
		newState[event.target.id] = event.target.value;
		// console.log(newState);
		this.setState(newState);
	}

	componentDidMount() {
  
		// If user's token saved in local storage, redirect to dashboard
		if (localStorage.getItem("autotrackToken") !== null) {
  				this.handleRedirect();
			}
  	}
  	

	handleSubmit(event) {

		event.preventDefault();

		helpers.getAuth(this.state.username, this.state.password)
		.then(response => {

			console.log(response);
			
			if (response.username !== undefined) {
				localStorage.setItem("autotrackToken", response.token);
				localStorage.setItem("username", response.username);


				this.handleRedirect();
				
			} else {

				console.log("Username and Password not found");
				return "Invalid Username or Password";

			}
		})
	}
	

	handleRedirect() {

		browserHistory.push("/dashboard-manager?token=" + localStorage.getItem("autotrackToken"));
	}

	render() {

		return (
			<div className="splash-container">

				<div className="jumbotron" style={{backgroundColor: '#000000', marginTop: '100', height: '100vh'}}>
					<div className="col-md-3"></div>
					<div className="col-md-6">

						<img src="../../public/assets/images/autotrack-logo.png" style={{width: '100%'}} alt="AutoTrack" />

						<form onSubmit={this.handleSubmit}> 
							
								<input
								type="text"
								value={this.state.username}
								placeholder="Username"
								id="username"
								className="form-control"
								onChange={this.handleChange}
								required
								/>

								<br/>
							
							
								<input
								type="password"
								value={this.state.password}
								placeholder="Password"
								id="password"
								className="form-control"
								onChange= {this.handleChange}
								required
								/>

								<br/>
							
							<input type="image" src="../../public/assets/images/autotrack-start.png" className="center-block" style={{width: '100'}} alt="Start/Login" />
						</form>
					</div>
					<div className="col-md-3"></div>
				</div>

			</div>
		);

	}
}

