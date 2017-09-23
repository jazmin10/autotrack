// include React
import React from "react";

// helper component for making API calls
import helpers from "./utils/helpers.js";

import router, {browserHistory} from "react-router";

// creating the splash component
export default class Splash extends React.Component {

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

	// When the landing page loads...
	componentDidMount() {

		// If user's token saved in local storage, redirect to dashboard
		if (localStorage.getItem("autotrackToken") !== null) {
				this.handleRedirect();
		}
	}

	handleChange(event) {

		var newState = {};
		newState[event.target.id] = event.target.value;
		// console.log(newState);
		this.setState(newState);
	}

	handleSubmit(event) {

		event.preventDefault();

		helpers.getAuth(this.state.username, this.state.password)
		.then(response => {
			
			if (response.username !== undefined) {

				// If log in was successful, set token and username to the local storage
				localStorage.setItem("autotrackToken", response.token);
				localStorage.setItem("username", response.username);

				// Redirect user to the dashboard page
				this.handleRedirect();

			} else {

				// If user credentials were incorrect, 
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
							type="password"
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

