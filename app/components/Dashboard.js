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

		this.state = { 
			isActive: false
		};

		this.tabClick = this.tabClick.bind(this);
		this.logOut = this.logOut.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);
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
			this.handleRedirect();
		}
	}

	logOut(event){
		event.preventDefault();
		localStorage.clear();

		this.handleRedirect();
	}

	handleRedirect() {
		browserHistory.push("/");
	}

	render() {

		return(
			<div>
				<div id="logo"><img alt="AUTOTRACK" src="../../public/assets/images/autotrack-logo.png"/></div>

				<div>

					<div id="nav-pills">
						{/* Tabs for My Projects, Masterlist, and Add/Edit Car */}
						<ul className="nav nav-tabs">
						  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/my-projects?token=" + localStorage.getItem("autotrackToken")}>My Projects</Link></li>
						  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/masterlist?token=" + localStorage.getItem("autotrackToken")}>Masterlist</Link></li>
						  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/add-car?token=" + localStorage.getItem("autotrackToken")}>Add/Edit Car</Link></li>
						  <li role="presentation" className={this.state.isActive ? "active" : null} className="pull-right" onClick={this.logOut}><Link>Log Out</Link></li>
						</ul>
					</div>
					
					{/* Tab Content */}
					<div className="panel panel-default">
						
							{this.props.children}
						
					</div>
				</div>
			</div>
		);
	}
}