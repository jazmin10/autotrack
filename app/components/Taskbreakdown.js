/* ========== TASK BREAKDOWN COMPONENT ==========
 	- contains the breakdown of tasks for each maintenance
	category
	- child of profile
*/

// DEPENDENCIES -----------------------------

// include the React library
import React from 'react';
import helpers from "./utils/helpers.js";
 import { Line } from "./react-progress.js";

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
			newTask:""
		}

		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}

	handleAddTask(event){
		// method that handles new task being added
		
		var newState={};

		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

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
		console.log("task: " + checkedTask);

		// capture the task's current completed value
		var completedStatus = this.state.taskInfo[event.target.id].completed;
		console.log("completed status: " + completedStatus);

		// store new values here
		var newValues = {name:checkedTask, completed:!completedStatus};
		console.log(newValues);

		console.log(this.state.taskInfo[event.target.id]);
		
	}

	render(){

		if (this.state.categoryProgress == 1) {
			var options = {
				strokeWidth:2,
				color: '#42f445' // green
			};
		}
		else if (this.state.categoryProgress < 1 || this.state.categoryProgress >= .5) {
			var options = {
				strokeWidth:2,
				color: '#fb1' // yellow
			};
		}
		else {
			var options = {
				strokeWidth:2,
				color: '#f44242' //red
			};
		}

		var containerStyle = {
			width:'100%',
			height:'50px'
		};

		return(
			<div className="tasks-container">

				<div>
					{/* category name, list of tasks, progress bar line */}

					<div className="well">
						<h1>{this.state.categoryName}</h1>

						<hr/>

						<h3>Task Breakdown</h3>

						<div>
							<Line
								progress = {this.state.categoryProgress}
								text={(this.state.categoryProgress * 100) + "%"}
								options={options}
								initialAnimate={true}
								containerStyle={containerStyle}
								containerClassName={'.progressbar'}
							/>
						</div>

						{

							this.state.taskInfo.map((tasks,i)=>{
								return(
									<div key={i} className="well">
										<h3><input onClick={this.handleCheck} id={i} type="checkbox" name="finished" autoComplete="off" value={tasks.name}/> {tasks.name}</h3> 
										<button className="btn btn-xs btn-danger" onClick={this.handleDeleteTask} value={tasks.name}>Delete Task</button>
									</div>
								);
							})
						}

						<div className="add-task-container">

							<form>
								<div className="form-group">
									<h4>Add {this.state.categoryName} Task:</h4>

									<input
										value={this.state.newTask}
										type="text"
										className="form-control"
										id="newTask"
										onChange={this.handleAddTask}
										required
									/>
									<br/>

									<button className="btn btn-primary" type="submit">Submit</button>
								</div>
							</form>
						</div>

					</div>
				</div>

			</div>
		);
	}
}