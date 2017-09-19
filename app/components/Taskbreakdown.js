/* ========== TASK BREAKDOWN COMPONENT ==========
 	- contains the breakdown of tasks for each maintenance
	category
	- child of profile
*/

// DEPENDENCIES -----------------------------

// include the React library
import React from 'react';
// import helpers from "./utils/helpers.js";

// var ProgressBar = require('react-progressbar.js');
// var Line = ProgressBar.Line;
// var Progress = require('./Progressbar.js');

// TASKS -----------------------------

// create and export the Tasks component
export default class Tasks extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state={
			taskInfo:[{
				name: "Paint",
				completed:true
			},{
				name: "Dents",
				completed: false
			}],
			categoryName:"Cosmetics",
			categoryProgress:.5,
		}

		this.handleCheck = this.handleCheck.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}

	// handleAddTask(){
	// 	// method that handles new task being added
	// }

	// handleUpdateTask(){
	// 	// method that handles any changes/user inputs
	// }

	handleDeleteTask(event){
		// method that removes tasks

		// capture the task to be removed
		var deleteTask = event.target.value;
		console.log(deleteTask);

		// remove that task from maintenance -> category
	}

	handleCheck(event){
		// method that handles checked/unchecked boxes

		// capture the task that has been checked
		var checkedTask = event.target.value;
		console.log(checkedTask);

		// set the check's completed status to the opposite
	}

	render(){

		var divStyle = {
			width: ((this.state.categoryProgress) * 100) + "%"
		};

		return(
			<div className="tasks-container">

				<div>
					{/* category name, list of tasks, progress bar line */}

					<div className="well">
						<h1>{this.state.categoryName}</h1>

						<hr/>

						<h3>Task Breakdown</h3>

						<div className="progress">
							<div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" style={divStyle} aria-valuenow={((this.state.categoryProgress) * 100) + "%"} aria-valuemin="0" aria-valuemax="100">{((this.state.categoryProgress) * 100) + "%"}</div>
						</div>

						{

							this.state.taskInfo.map((tasks,i)=>{
								return(
									<div key={i} className="well">
										<h3><input onClick={this.handleCheck} type="checkbox" name="finished" autoComplete="off" value={tasks.name}/> {tasks.name}</h3> 
										<button className="btn btn-xs btn-danger" onClick={this.handleDeleteTask} value={tasks.name}>Delete Task</button>
									</div>
								);
							})
						}

						<div className="add-task-container">
						</div>

					</div>
				</div>

			</div>
		);
	}
}