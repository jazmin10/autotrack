// include React
import React from "react";

// helper component for making API calls
import helpers from "./utils/helpers.js";

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
	}

	handleChange(event) {

		var newState = {};
		newState[event.target.id] = event.target.value;
		// console.log(newState);
		this.setState(newState);
	}

	// 
	handleSubmit(event) {

		event.preventDefault();

		helpers.getAuth(this.state.username, this.state.password)
		.then(function(response) {
			if (doc !== req.body.username && req.body.password) {
				console.log("Username and Password not found");
				return "Invalid Username or Password";
			}else{
				this.handleRedirect();
			}
		})
	}
	

	handleRedirect() {
		console.log("redirecting");
		// browserHistory.push(/dashboard-manager);
	}

	render() {

		return (
				<div className="splash-container">
					<nav className="navbar navbar-default">
					  	<div className="container-fluid">
							<div className="navbar-header">
								<a className="navbar-brand" href="#">
									<img alt="AutoTrack" />
								</a>
							</div>
						</div>
					</nav>
					<form onSubmit={this.handleSubmit}> 
						
							<input
							type="text"
							value={this.state.username}
							id="username"
							className="form-control"
							onChange={this.handleChange}
							required
							/>
						
						
							<input
							type="text"
							value={this.state.password}
							id="password"
							className="form-control"
							onChange= {this.handleChange}
							required
							/>
						
						<button type="submit" className="btn btn-default navbar-btn">Log In</button>
					</form>
				
					<div className="appInfo-container">
						<div className="row">
							<div className="col-md-4">
									<h1>About</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum, ipsum id cursus euismod, metus est varius elit, fringilla vestibulum magna massa quis purus. In eu lacinia nisi. Aenean dui nunc, accumsan sed ante vel, volutpat aliquam odio. Phasellus tempus sed risus sed laoreet. Aliquam convallis volutpat leo ut porta. Ut tincidunt ipsum ac felis ultrices, eu accumsan tortor suscipit. Nullam quam ante, volutpat quis interdum ac, ullamcorper at ante. Pellentesque ac mattis orci. Etiam pharetra lacus sed augue facilisis, sit amet efficitur dolor semper. Sed malesuada odio et justo placerat feugiat.
									</p>
								</div>
								<div className="col-md-4">
									<h1>Contact</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum, ipsum id cursus euismod, metus est varius elit, fringilla vestibulum magna massa quis purus. In eu lacinia nisi. Aenean dui nunc, accumsan sed ante vel, volutpat aliquam odio. Phasellus tempus sed risus sed laoreet. Aliquam convallis volutpat leo ut porta. Ut tincidunt ipsum ac felis ultrices, eu accumsan tortor suscipit. Nullam quam ante, volutpat quis interdum ac, ullamcorper at ante. Pellentesque ac mattis orci. Etiam pharetra lacus sed augue facilisis, sit amet efficitur dolor semper. Sed malesuada odio et justo placerat feugiat.
									</p>
								</div>
								<div className="col-md-4">
									<h1>Team</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum, ipsum id cursus euismod, metus est varius elit, fringilla vestibulum magna massa quis purus. In eu lacinia nisi. Aenean dui nunc, accumsan sed ante vel, volutpat aliquam odio. Phasellus tempus sed risus sed laoreet. Aliquam convallis volutpat leo ut porta. Ut tincidunt ipsum ac felis ultrices, eu accumsan tortor suscipit. Nullam quam ante, volutpat quis interdum ac, ullamcorper at ante. Pellentesque ac mattis orci. Etiam pharetra lacus sed augue facilisis, sit amet efficitur dolor semper. Sed malesuada odio et justo placerat feugiat.
									</p>
							</div>
						</div>
					</div>
				</div>
				);

	}
}

