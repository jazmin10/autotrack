// include React
import React from "react";

// helper component for making API calls
import helpers from "./utils/helpers.js";

// creating the main component
export default class Splash extends React.Component {

	// checkCredentials() {}

	constructor(props){
		
		super(props);

		this.state = {
			userName: "",
			password: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {

		this.setState({ userName: event.target.value} );
		this.setState({ password: event.target.value} );
	}

	handleSubmit(event) {

		event.preventDefault();

		helpers.getAuth(this.state.userName, this.state.password).then(function(data) {
			if (data !== req.body.username && req.body.password) {
				console.log("Username and Password not found");
				return "Invalid Username or Password";
			}else{
				handleRedirect() {
					browserHistory.push("/Dashboard");
				}
			}
		}
	}
	
	render() {

		return(
				<div className="splash-container">
					<nav className="navbar navbar-default">
					  <div className="container-fluid">
					    <div className="navbar-header">
					      <a className="navbar-brand" href="#">
					        <img alt="AutoTrack" />
						    <form ref="form" onSubmit={this.handleSubmit}> 
						        <input
						        	value={this.state.userName}
						        	type="text"
						        	className="form-control text-center"
						        	id="userName"
						        	onChange={this.handleChange}
						        />
						        <input
						        	value={this.state.password}
						        	type="text"
						        	className="form-control text-center"
						        	id="password"
						        	onChange={this.handleChange}
						        />
						    	<button type="submit" className="btn btn-default navbar-btn">Log In</button>
						    </form>
					      </a>
					    </div>
					  </div>
					</nav>
					<div className="appInfo-container">
						<div class="row">
							<div class="col-md-4">
									<h1>About</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum, ipsum id cursus euismod, metus est varius elit, fringilla vestibulum magna massa quis purus. In eu lacinia nisi. Aenean dui nunc, accumsan sed ante vel, volutpat aliquam odio. Phasellus tempus sed risus sed laoreet. Aliquam convallis volutpat leo ut porta. Ut tincidunt ipsum ac felis ultrices, eu accumsan tortor suscipit. Nullam quam ante, volutpat quis interdum ac, ullamcorper at ante. Pellentesque ac mattis orci. Etiam pharetra lacus sed augue facilisis, sit amet efficitur dolor semper. Sed malesuada odio et justo placerat feugiat.
									</p>
								</div>
								<div class="col-md-4">
									<h1>Contact</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum, ipsum id cursus euismod, metus est varius elit, fringilla vestibulum magna massa quis purus. In eu lacinia nisi. Aenean dui nunc, accumsan sed ante vel, volutpat aliquam odio. Phasellus tempus sed risus sed laoreet. Aliquam convallis volutpat leo ut porta. Ut tincidunt ipsum ac felis ultrices, eu accumsan tortor suscipit. Nullam quam ante, volutpat quis interdum ac, ullamcorper at ante. Pellentesque ac mattis orci. Etiam pharetra lacus sed augue facilisis, sit amet efficitur dolor semper. Sed malesuada odio et justo placerat feugiat.
									</p>
								</div>
								<div class="col-md-4">
									<h1>Team</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum, ipsum id cursus euismod, metus est varius elit, fringilla vestibulum magna massa quis purus. In eu lacinia nisi. Aenean dui nunc, accumsan sed ante vel, volutpat aliquam odio. Phasellus tempus sed risus sed laoreet. Aliquam convallis volutpat leo ut porta. Ut tincidunt ipsum ac felis ultrices, eu accumsan tortor suscipit. Nullam quam ante, volutpat quis interdum ac, ullamcorper at ante. Pellentesque ac mattis orci. Etiam pharetra lacus sed augue facilisis, sit amet efficitur dolor semper. Sed malesuada odio et justo placerat feugiat.
									</p>
							</div>
						</div>
					</div>
				)

	}
};

		