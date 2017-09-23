/* Dashboard Component -  contains user's dashboard with nav links to the user's
projects, masterlist, add/edit form */

// Include the React library
import React from 'react';
// import helpers from "./utils/helpers.js";
import { Link } from 'react-router';

import router, {browserHistory} from "react-router";


// import Profile from '../components/Profile.js';
import Projects from '../components/Projects.js';
import Masterlist from '../components/Masterlist.js';
import Add from '../components/Add.js';

export default class Dashboard extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = { isActive: false };

		this.tabClick = this.tabClick.bind(this);
		// this.handleRedirect = this.handleRedirect.bind(this);
	}

	tabClick (e) {
		e.preventDefault();
		$(".nav li").removeClass("active");
		e.currentTarget.className = "active";
	}

	// If there isn't a token in the local storage then redirect user to home page for login
	componentWillMount() {
		if (localStorage.getItem("autotrackToken") === null) {
			browserHistory.push("/");
		}
	}

	render() {

		return(
			<div>
				{/* Navbar with logo and log out button */}
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="#">
				        <img alt="AutoTrack" />
				    	<button type="button" className="btn btn-default navbar-btn">Log Out</button>
				      </a>
				    </div>
				  </div>
				</nav>

				<div className="container">
					{/* Tabs for My Projects, Masterlist, and Add/Edit Car */}
					<ul className="nav nav-tabs">
					  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/my-projects?token=" + localStorage.getItem("autotrackToken")}>My Projects</Link></li>
					  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/masterlist?token=" + localStorage.getItem("autotrackToken")}>Masterlist</Link></li>
					  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/add-car?token=" + localStorage.getItem("autotrackToken")}>Add/Edit Car</Link></li>
					</ul>
					
					{/* Tab Content */}
					<div className="panel panel-default">
						
							{this.props.children}
						
					</div>
				</div>
			</div>
		);
	}
}