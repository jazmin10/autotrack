/* Dashboard Component -  contains user's dashboard with nav links to the user's
projects, masterlist, add/edit form */

// Include the React library
import React from 'react';
// import helpers from "./utils/helpers.js";

// import Profile from '../components/Profile.js';
// import Projects from '../components/Projects.js';
// import Masterlist from '../components/Masterlist.js';

export default class Dashboard extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);
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
					  <li role="presentation"><a href="#">My Projects</a></li>
					  <li role="presentation" className="active"><a href="#">Masterlist</a></li>
					  <li role="presentation"><a href="#">Add/Edit Car</a></li>
					</ul>
					
					{/* Tab Content */}
					<div>
						
							{this.props.children}
						
					</div>
				</div>
			</div>
		);
	}
}