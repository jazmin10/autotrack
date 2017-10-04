/* ========== DASHBOARD COMPONENT ==========
 	- contains user's dashboard with nav links to the user's
projects, masterlist, add/edit form
*/

// DEPENDENCIES 
// =====================================================
// Include the React library
import React from 'react';
import { Link } from 'react-router';
import router, {browserHistory} from "react-router";
import Projects from '../components/Projects.js';
import Masterlist from '../components/Masterlist.js';
import Add from '../components/Add.js';

// DASHBOARD COMPONENT
// =====================================================

// create and export the Dashboard component
export default class Dashboard extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = { 
			isActive: false
		};

		// bind functions
		this.tabClick = this.tabClick.bind(this);
		this.logOut = this.logOut.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);
	}

	tabClick (e) {
		// method to navigate between tabs and set active tab state

		e.preventDefault();
		$(".nav li").removeClass("active");
		e.currentTarget.className = "active";
	}

	componentWillMount() {
		// initializes as soon as the component mounts

		if (localStorage.getItem("autotrackToken") === null) {
			// If there isn't a token in the local storage then redirect user to home page for login
			this.handleRedirect();
		}
	}

	logOut(event){
		// method that will handle logging out

		event.preventDefault();
		localStorage.clear();

		this.handleRedirect();
	}

	handleRedirect() {
		// method that will redirect to the home page
		
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
						  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/my-projects?token=" + localStorage.getItem("autotrackToken")}>MY PROJECTS</Link></li>
						  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/masterlist?token=" + localStorage.getItem("autotrackToken")}>MASTERLIST</Link></li>
						  <li role="presentation" className={this.state.isActive ? "active" : null} onClick={this.tabClick}><Link to={"/dashboard-manager/add-car?token=" + localStorage.getItem("autotrackToken")}>ADD/EDIT CAR</Link></li>
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