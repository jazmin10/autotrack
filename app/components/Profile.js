/* ========== PROFILE COMPONENT ==========
 	- contains car's profile (the main profile page)
 	- includes subcomponents car info, main tasks,
 	and task breakdown
 */

// DEPENDENCIES -----------------------------

// include the React library
import React from 'react';
import helpers from "./utils/helpers.js";

// include children
import Information from "./Information.js";
import MainTasks from "./Maintasks.js";
import Tasks from "./Taskbreakdown.js";

// PROFILE -----------------------------

// create and export the profile component
export default class Profile extends React.Component {
	
	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			overallProgress:0,
			vin:"",
			maintenance:[]
		}
	}

	captureProgressCategory(progress){
		// this method doesn't calculate the progress
		// progress calculation will be done in Tasks component

		// this method captures the progress of the category

		// this.setState to the new progress of the category
	}

	addNewCategory(){
		// this method adds a new category
		// pass this method down to MainTasks component
		// this.setState push new category to maintenance
	}

	addNewTask(){
		// this method adds a new task
		// pass this method down to Tasks component
		// this.setState push new task to maintenance -> category
	}
	
	deleteCategory(){
		// this method deletes a category
		// pass this method down to MainTasks component
		// this.setState removes the category from maintenance
	}

	deleteTask(){
		// this method deletes a task
		// pass this method down to Tasks component
		// this.setState removes the task from maintenance -> category
	}

	componentDidUpdate(prevProps, prevState){
		// check prevState for all states

		// update overall progress bar
		// equation: sum of each category's progress / # of categories
	}

	// Render the component: displays navbar and jumbotron
	render() {

		return (
			<div className="profile-container">
				<div>
					{/* Display children components */}

					<Information />
					<MainTasks />
					<Tasks />

				</div>

			</div>
		);
	}
}