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

	handleChange(event) {

		var newState = {};
		newState[event.target.id] = event.target.value;
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

			if (response.username !== undefined) {
				localStorage.setItem("autotrackToken", response.token);
				localStorage.setItem("username", response.username);
				this.handleRedirect();
				
			} else {
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

				{/* ABOUT SECTION */}

			    <section id="about" style={{backgroundColor: '#000000', marginTop: '100', height: '100vh'}}>
			        <div className="container">
			            <div className="row">
			                <div className="col-lg-12 text-center">
			                    <h2>About</h2>
			                    <hr/>
			                </div>
			            </div>
			            <div className="row">
			                <div className="col-lg-8 col-lg-offset-2">
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum, ipsum id cursus euismod, metus est varius elit, fringilla vestibulum magna massa quis purus. In eu lacinia nisi. Aenean dui nunc, accumsan sed ante vel, volutpat aliquam odio. Phasellus tempus sed risus sed laoreet. Aliquam convallis volutpat leo ut porta. Ut tincidunt ipsum ac felis ultrices, eu accumsan tortor suscipit. Nullam quam ante, volutpat quis interdum ac, ullamcorper at ante. Pellentesque ac mattis orci. Etiam pharetra lacus sed augue facilisis, sit amet efficitur dolor semper. Sed malesuada odio et justo placerat feugiat.
									</p>
			                </div>
			            </div>
			        </div>
			    </section>

			    {/* CONTACT SECTION */}

			    <section id="contact" style={{backgroundColor: '#000000', marginTop: '100', height: '100vh'}}>
			        <div className="container">
			            <div className="row">
			                <div className="col-lg-12 text-center">
			                    <h2>Contact Me</h2>
			                    <hr/>
			                </div>
			            </div>
			            <div className="row">
			                <div className="col-lg-8 col-lg-offset-2">
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum, ipsum id cursus euismod, metus est varius elit, fringilla vestibulum magna massa quis purus. In eu lacinia nisi. Aenean dui nunc, accumsan sed ante vel, volutpat aliquam odio. Phasellus tempus sed risus sed laoreet. Aliquam convallis volutpat leo ut porta. Ut tincidunt ipsum ac felis ultrices, eu accumsan tortor suscipit. Nullam quam ante, volutpat quis interdum ac, ullamcorper at ante. Pellentesque ac mattis orci. Etiam pharetra lacus sed augue facilisis, sit amet efficitur dolor semper. Sed malesuada odio et justo placerat feugiat.
									</p>
			                </div>
			            </div>
			        </div>
			    </section>


			</div>
		);

	}
}

