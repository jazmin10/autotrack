/* ========== TASK BREAKDOWN COMPONENT ==========
 	- contains the breakdown of tasks for each maintenance
	category
	- child of profile
*/

// DEPENDENCIES -----------------------------

// include the React library
import React from 'react';
import helpers from "./utils/helpers.js";

// TASKS -----------------------------

// create and export the Tasks component
export default class Tasks extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state={
			taskInfo:[],
			categoryName:"",
			categoryProgress:0
		}
	}

	handleAddTask(){
		// method that handles new task being added
	}

	handleUpdateTask(){
		// method that handles any changes/user inputs
	}

	handleDeleteTask(){
		// method that removes tasks

		// capture the task to be removed
		// remove that task from maintenance -> category
	}

	render(){
		return(
			<div className="tasks-container">
				<div>
					{/* category name, list of tasks, progress bar line */}
				</div>
			</div>
		);
	}
}