
// DEPENDENCIES
// =====================================================
// include React
import React from "react";

// helper component for making API calls
import helpers from "./utils/helpers.js";

import router, {browserHistory} from "react-router";


// SPLASH COMPONENT
// =====================================================
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

			<div className="scroll-fixed-wrapper">    
  <ul className="scroll-fixed">
      <li>
          <a href="#app">Main</a>
      </li>
      <li>
          <a href="#about">About</a>
      </li>
      <li>
          <a href="#contact">Contact</a>
      </li>
  </ul>
</div>


				<div className="jumbotron splash-jumbotron">
					<div className="col-md-3"></div>
					<div className="col-md-6">

						<img src="../../public/assets/images/autotrack-logo.png" style={{width: '100%'}} alt="AutoTrack" />

						<form onSubmit={this.handleSubmit}> 
							
								<input
								className="splash-input"
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
								className="splash-input"
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

			    <section id="about" className="splash-well">
			        <div className="container splash-div">
			            <div className="row">
			                <div className="col-lg-12 text-center">
			                    <h2 className="splash-h2">What is AutoTrack?</h2>
			                    <hr className="splash-hr"/>
			                </div>
			            </div>
			            <div className="row">
			                <div className="col-lg-8 col-lg-offset-2">
									<p className="splash-p">At AUTOTRACK we understand cost controls. That’s why we’ve built an app that takes the guesswork out of your vehicle reconditioning process. By streamlining asynchronous communication with outside vendors and internal partners alike, AUTOTRACK eliminates the wasteful meandering around the car lot.  AUTOTRACK offers login permissions so that vendors, using a QR code reader, may scan specific cars to see the necessary repairs, submit bids, and have bids approved that pertain only to their specialization. Internally, individual units can be tracked through the reconditioning process from the desk.
									</p>
			                </div>
			            </div>
			        </div>
			    </section>

			    {/* CONTACT SECTION */}

			    <section id="contact" className="splash-well">
			        <div className="container splash-div">
			            <div className="row">
			                <div className="col-lg-12 text-center">
			                    <h2 className="splash-h2">About the Team</h2>
			                    <hr className="splash-hr"/>
			                </div>
			            </div>
			            <div className="row">
			                <div className="col-lg-8 col-lg-offset-2">
									<p className="splash-p">The AUTOTRACK team formed during the summer of 2017 at the coding bootcamp at the University of Texas, Austin.  Please check out individual work and other team projects in the links below.
									</p>
			                </div>
			            </div>
			            <div className="row">
			            	<div className="col-md-2"></div>
			                <div className="col-md-4">
									<h3 className="splash-h3">Jazmin Estrada</h3>
									<span><a href="https://github.com/jazmin10" target="_blank"><img src="../../public/assets/images/github.png" style={{width: '25'}} alt="Github" /></a> <a href="https://www.linkedin.com/in/jazm%C3%ADn-estrada-650396140/" target="_blank"><img src="../../public/assets/images/linkedin.png" style={{width: '25'}} alt="LinkedIn" /></a></span>
									<br/>
									<h3 className="splash-h3">Melissa Hernandez</h3>
									<span><a href="https://github.com/MissHernandez" target="_blank"><img src="../../public/assets/images/github.png" style={{width: '25'}} alt="Github" /></a> <a href="https://www.linkedin.com/in/misshernandez/" target="_blank"><img src="../../public/assets/images/linkedin.png" style={{width: '25'}} alt="LinkedIn" /></a></span>
									<br/>
									<h3 className="splash-h3">Sada Kallur</h3>
									<span><a href="https://github.com/sadashivakj" target="_blank"><img src="../../public/assets/images/github.png" style={{width: '25'}} alt="Github" /></a> <a href="https://www.linkedin.com/in/sadashiva-kallur-73611410/" target="_blank"><img src="../../public/assets/images/linkedin.png" style={{width: '25'}} alt="LinkedIn" /></a></span>
									<br/>
			                </div>
			                <div className="col-md-4">
									<h3 className="splash-h3">Flynn Tan</h3>
									<span><a href="https://github.com/sundropgold" target="_blank"><img src="../../public/assets/images/github.png" style={{width: '25'}} alt="Github" /></a> <a href="https://www.linkedin.com/in/flynn-tan-40503596/" target="_blank"><img src="../../public/assets/images/linkedin.png" style={{width: '25'}} alt="LinkedIn" /></a></span>
									<br/>
									<h3 className="splash-h3">Steve Walsh</h3>
									<span><a href="https://github.com/Finfischley" target="_blank"><img src="../../public/assets/images/github.png" style={{width: '25'}} alt="Github" /></a> <a href="https://www.linkedin.com/in/stephen-walsh-22916360" target="_blank"><img src="../../public/assets/images/linkedin.png" style={{width: '25'}} alt="LinkedIn" /></a></span>
									<br/>
			                </div>
			                <div className="col-md-2"></div>
			            </div>
			        </div>
			    </section>


			</div>
		);

	}
}

