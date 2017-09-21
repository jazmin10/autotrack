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
import isEqual from 'lodash/isequal';

// TASKS -----------------------------

// create and export the Taskbreakdown component
export default class Taskbreakdown extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state={
			taskInfo:[],
			categoryName:"",
			categoryProgress:0,
			newTask:""
		}

		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}

	// We might not need this, keeping just in case
	componentDidMount(){

		if (this.props.passedMaintenance.categoryProgress == null || this.props.passedMaintenance.categoryProgress == undefined
			){
			this.setState({
				taskInfo: this.props.passedMaintenance.tasks,
				categoryName: this.props.passedMaintenance.category,
				categoryProgress: 0
			});
		}
		else {
			this.setState({
				taskInfo: this.props.passedMaintenance.tasks,
				categoryName: this.props.passedMaintenance.category,
				categoryProgress: this.props.passedMaintenance.categoryProgress
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		// method to receive the next props the parent profile will pass

		if (this.props.passedMaintenance.categoryProgress == null || this.props.passedMaintenance.categoryProgress == undefined
			){
			this.setState({
				taskInfo: this.props.passedMaintenance.tasks,
				categoryName: this.props.passedMaintenance.category,
				categoryProgress: 0
			});
		}
		else {
			this.setState({
				taskInfo: this.props.passedMaintenance.tasks,
				categoryName: this.props.passedMaintenance.category,
				categoryProgress: this.props.passedMaintenance.categoryProgress
			});
		}

	}

	handleFormChange(event){
		// method that handles new task being added
		
		var newState={};

		newState[event.target.id] = event.target.value;
		this.setState(newState);

	}

	handleAddTask(event){
		event.preventDefault();

		// create the new task object
		var newTaskObj = {
			name:this.state.newTask,
			completed:0
		};

		// capture the category the task belongs to
		var taskCategory = this.state.categoryName;

		// call addNewTask method and pass newTaskObj
		// and taskCategory to Profile component
		this.props.addNewTask(newTaskObj, taskCategory);

		// empty newTask field
		this.setState({newTask:""});

	}

	handleDeleteTask(event){
		// method that removes tasks
		event.preventDefault();

		// capture the task to be removed
		var deleteTask = event.target.value;

		// remove that task from maintenance -> category
		for (var i = 0; i < this.state.taskInfo.length; i++) {
			if (this.state.taskInfo[i].name === deleteTask) {

				// splice that task from the whole array of taskInfo
				// this array won't have that task anymore
				var deleteTaskInfo = this.state.taskInfo.splice(i, 1);
			}
		}

		// call deleteTaskInfo and pass deleteTaskInfo
		this.props.deleteTaskInfo(deleteTaskInfo);

	}

	handleCheck(event){
		// method that handles checked/unchecked boxes

		// capture the task that has been checked
		var checkedTask = event.target.value;
		console.log("task: " + checkedTask);

		// capture the task's current completed value
		var completedStatus = this.state.taskInfo[event.target.id].completed;
		console.log("completed status: " + completedStatus);
		
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
			height:'60px'
		};

		// if (!isNaN(this.state.categoryProgress) || this.state.categoryProgress == undefined || this.state.categoryProgress == "") {
		// 	var progressNum = 0;
		// 	var percentNum = progressNum + "%";
		// } 
		// else{
			var progressNum = (this.state.categoryProgress * 100).toFixed(0);
			var percentNum = progressNum + "%";			
		// }


		if (this.state.taskInfo.length !== 0){
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
									text={percentNum}
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
											onChange={this.handleFormChange}
											required
										/>
										<br/>

										<button className="btn btn-primary" type="submit" onClick={this.handleAddTask}>Submit</button>
									</div>
								</form>
							</div>

						</div>
					</div>

				</div>
			);
		}

		else {

			if (this.state.categoryName !== "" || this.state.categoryName !== null) {
				return(
					<div className="well">
							
							<h1>{this.state.categoryName}</h1>

							<hr/>

						<div className="add-task-container">

								<form>
									<div className="form-group">
										<h4>Add {this.state.categoryName} Task:</h4>

										<input
											value={this.state.newTask}
											type="text"
											className="form-control"
											id="newTask"
											onChange={this.handleFormChange}
											required
										/>
										<br/>

										<button className="btn btn-primary" type="submit" onClick={this.handleAddTask}>Submit</button>
									</div>
								</form>
							</div>
					</div>
				);
			}
			
		}

	}
}