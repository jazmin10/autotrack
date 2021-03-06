/* ========== TASK BREAKDOWN COMPONENT ==========
 	- contains the breakdown of tasks for each maintenance
	category
	- child of profile
*/

// DEPENDENCIES 
// =====================================================

// include the React library
import React from 'react';
// include helpers
import helpers from "./utils/helpers.js";
// include react progressbar
import { Line } from "./react-progress.js";
// include isEqual from lodash
import isEqual from 'lodash/isequal';

// TASKBREAKDOWN COMPONENT 
// =====================================================

// create and export the Taskbreakdown component
export default class Taskbreakdown extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state={
			taskInfo:[],
			categoryName:"",
			categoryProgress:0,
			newTask:"",
			checked:false
		}

		// bind functions
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}

	componentDidMount(){
		// method invoked immediately after component is mounted
		
		if (this.props.passedMaintenance.categoryProgress == null || this.props.passedMaintenance.categoryProgress == undefined
			){
			// if the passed categoryProgress is null or undefined, set it as 0
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
		// method that will handle the new task object 

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

		// update the state with the new array without the deleted task
		this.setState({
			taskInfo:deleteTaskInfo
		});

		// call deleteTaskInfo and pass deleteTaskInfo
		this.props.deleteTaskInfo(deleteTaskInfo);

	}

	handleCheck(event){
		// method that handles checked/unchecked boxes

		// capture the task that has been checked
		var checkedTask = event.target.value;

		// capture the task's current completed value
		var completedStatus = this.state.taskInfo[event.target.id].completed;

		// capture the category name
		var taskCategory = this.state.categoryName;

		this.setState({checked:true});

		// if the completed value is 0, 
		// go through this whole process to change it to 1
		// if it's already 1, leave it be
		if (completedStatus == 0) {			
			// loop through the taskInfo array to find the matching task
			for (var i = 0; i < this.state.taskInfo.length; i++){

				if (this.state.taskInfo[i].name == checkedTask){
					// look for the matching task name
					
					// create new task obj with the completed value 1
					var completedTaskObj = {
						name: checkedTask,
						completed:1
					};

					this.props.updateCheck(completedTaskObj, taskCategory);
					this.setState({checked:false});
				}
			}	
		}	
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

		if (isNaN(this.state.categoryProgress) || this.state.categoryProgress == undefined || this.state.categoryProgress == null) {
			var percentNum = "0%";
		} 
		else{
			var progressNum = (this.state.categoryProgress * 100).toFixed(0);
			var percentNum = progressNum + "%";			
		}

		// if the taskInfo array has something in it
		if (this.state.taskInfo.length !== 0){
			return(
				<div className="tasks-container">

					<div>
						{/* category name, list of tasks, progress bar line */}

						<div className="well tasks-content">

							<div className="individual-tasks-div">
								<h1 className="tasks-h1">{this.state.categoryName}</h1>

								<div>
									<Line
										progress = {this.state.categoryProgress}
										text={percentNum}
										options={options}
										initialAnimate={true}
										containerStyle={containerStyle}
										containerClassName={'lineprogressbar'}
									/>
								</div>

								{

									this.state.taskInfo.map((tasks,i)=>{

										if (tasks.completed == 0) {
											return(
												<div key={i} className="well">
													<h3 className="tasks-h3"><input onClick={this.handleCheck} id={i} type="checkbox" name="finished" autoComplete="off" value={tasks.name} checked={this.state.checked}/> {tasks.name}</h3> 
													<button className="btn task-delete-btn" onClick={this.handleDeleteTask} value={tasks.name}>DELETE TASK</button>
												</div>
											);
										}

										return(
											<div key={i} className="well">
												<h3 className="tasks-h3"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span> {tasks.name}</h3>
												<button className="btn task-delete-btn" onClick={this.handleDeleteTask} value={tasks.name}>DELETE TASK</button>
											</div>
										);
										
									})
								}

								<div className="add-task-container">

									<form>
										<div className="form-group tasks-form">
											<h4 className="tasks-add-form-h4">Add {this.state.categoryName} Task:</h4>

											<input
												value={this.state.newTask}
												type="text"
												className="form-control tasks-add-form-input"
												id="newTask"
												onChange={this.handleFormChange}
												required
											/>
											<button className="btn task-add-btn" type="submit" onClick={this.handleAddTask}>ADD TASK</button>
											<br/>
											
										</div>
									</form>
								</div>

							</div>
						</div>
					</div>

				</div>
			);
		}

		else {

			// if the category doesn't yet exist, render this
			if (this.state.categoryName !== "" || this.state.categoryName !== null) {
				return(
					<div className="tasks-container">
						<div>
							<div className="well tasks-content">

								<div className="individual-tasks-div">
									
									<h1 className="tasks-h1">{this.state.categoryName}</h1>
									
									<div className="add-task-container">

										<form>
											<div className="form-group tasks-form">
												<h4 className="tasks-add-form-h4">Add {this.state.categoryName} Task:</h4>

												<input
													value={this.state.newTask}
													type="text"
													className="form-control tasks-add-form-input"
													id="newTask"
													onChange={this.handleFormChange}
													required
												/>
												<br/>

												<button className="btn task-add-btn" type="submit" onClick={this.handleAddTask}>ADD TASK</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
			
		}

	}
}