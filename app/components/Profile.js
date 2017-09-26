/* ========== PROFILE COMPONENT ==========
 	- contains car's profile (the main profile page)
 	- includes subcomponents car info, main tasks,
 	and task breakdown
 */

// DEPENDENCIES -----------------------------

// include the React library
import React from 'react';
import helpers from "./utils/helpers.js";
import isEqual from 'lodash/isequal';

import router, {browserHistory} from "react-router";

// include children
import Information from "./Information.js";
import MainTasks from "./Maintasks.js";
import Taskbreakdown from "./Taskbreakdown.js";

// PROFILE -----------------------------

// create and export the profile component
export default class Profile extends React.Component {
	
	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			overallProgress: 0,
			vin: "",
			maintenance: [],
			categoryProgress: []
		}

		this.calculateCategoryProgress = this.calculateCategoryProgress.bind(this);
		this.calculateOverallProgress = this.calculateOverallProgress.bind(this);
		this.addNewTask = this.addNewTask.bind(this);
		this.addNewCategory = this.addNewCategory.bind(this);
		this.deleteTaskInfo = this.deleteTaskInfo.bind(this);
		this.deleteCategory = this.deleteCategory.bind(this);
		this.updateCheck = this.updateCheck.bind(this);
	}

	componentDidMount(){
		// method invoked immediately after component is mounted

		if (localStorage.getItem("autotrackToken") !== null) {
	   
			// run helpers function to get car info from database
			helpers.getCarMaintenanceInfo(this.props.params.vin).then((data) => {
				// use vin number from url via react router link

				data.map((maintask) => {
					maintask.categoryProgress = 0;
				});

				this.setState({
					vin: this.props.params.vin, //need to make this dynamic
					maintenance: data
				});

			});
		}

	}

	calculateCategoryProgress(){
		// method to calculate the progress of each category
		var newArray = [];

		this.state.maintenance.map((maintask, i) => {
			var taskProgress = 0;
			var numberOfTasks = maintask.tasks.length;

			for (let j=0; j < maintask.tasks.length; j++) {
				// get the sum of each task's completion
				taskProgress += maintask.tasks[j].completed;
			}

			// calculate categoryProgress by dividing taskProgress by numberofTasks
			var categoryProgress = Number((taskProgress / numberOfTasks));
			
			// store updated category progress in newObject
			var newObject = {
				category: maintask.category,
				tasks: maintask.tasks,
				categoryProgress: categoryProgress
			}

			newArray.push(newObject);

		});

		// set the state of the whole current maintenance array, once that's run calculateOverallProgress()
		this.setState({maintenance: newArray}, function(){

				this.calculateOverallProgress();
		});
	
	}

	// calculate the overall progress of the car and reset this.state.overallProgress
	calculateOverallProgress(){
		var sumProgress = 0;
		var calculatedProgress = 0;

		this.state.maintenance.map((category) => {
			if (!isNaN(category.categoryProgress)) {
				sumProgress += category.categoryProgress;
			}
		});

	
		calculatedProgress = (sumProgress/this.state.maintenance.length);
	
		var newNumber = Number(calculatedProgress);
		
		this.setState({overallProgress: calculatedProgress});
	}


	addNewTask(newTask, taskCategory){
		// method to add new task

		for (var i = 0; i < this.state.maintenance.length; i++) {
			// loop through the maintenance array for
			// this specific car

			if (this.state.maintenance[i].category === taskCategory) {
				// if the category name matches taskCategory

				// push newTaskObj into that taskCategory's task array
				this.state.maintenance[i].tasks.push(newTask);
			}

		}

		// save the new maintenance array
		var newMaintenanceArr = this.state.maintenance;

		// run helpers function to update the database
		// with the new maintenance array
		var updateK = "maintenance";
		var updateVal = newMaintenanceArr;

		var updateVal = [];

		// remove category progress
		newMaintenanceArr.map((category) => {
			var newUpdateObj = {
				category: category.category,
				tasks: category.tasks
			}

			updateVal.push(newUpdateObj);
		});

		helpers.updateCarMaintenanceArray(this.props.params.vin, updateK, updateVal).then((data) => {

			helpers.getCarMaintenanceInfo(this.props.params.vin).then((data) => {
				
				// make sure to include category progress with value of 0
				
				var newMainArrNewTask = []

				data.map((newCategory) => {
					var newCatObj = {
						category: newCategory.category,
						tasks: newCategory.tasks,
						categoryProgress: 0
					}

					newMainArrNewTask.push(newCatObj);
				});

				this.setState({maintenance: newMainArrNewTask}, function(){
					this.calculateCategoryProgress();
				});
			});

		});
	}


	// When the "Add Main Task" form button is clicked in the Maintasks component...
	addNewCategory(newCategory){
		var newCategoryArr = [];

		this.state.maintenance.map((categories) => {
			newCategoryArr.push({
				category: categories.category,
				tasks: categories.tasks 
			});
		});

		newCategoryArr.push({
			category: newCategory,
			tasks: []
		});

		// run helpers function to update the database
		// with the new maintenance array
		var updateK = "maintenance";
		var updateVal = newCategoryArr;

		helpers.updateCarMaintenanceArray(this.props.params.vin, updateK, updateVal).then((data) => {

			helpers.getCarMaintenanceInfo(this.props.params.vin).then((data) => {
		
				// set new state of maintenance array
				this.setState({maintenance:data});

			});
			
		});
	}

	deleteTaskInfo(deleteTask){
		// method to delete task

		// run helpers function to update the database
		// with the new maintenance array
		var deleteK = "maintenance";
		var deleteVal = this.state.maintenance;

		for (var i = 0 ; i < this.state.maintenance.length; i++) {

			for (var j = 0; j < deleteVal[i].tasks.length; j++){
				if (deleteTask[0].name === deleteVal[i].tasks[j].name) {
					deleteVal[i].tasks.splice(j,1);
				}
			}
		}

		helpers.updateCarMaintenanceArray(this.props.params.vin, deleteK, deleteVal).then((data) => {

			helpers.getCarMaintenanceInfo(this.props.params.vin).then((data) => {
				
				this.setState({maintenance:data}, function(){
					this.calculateCategoryProgress();
				});
				
			});

		});

	}

	deleteCategory(categoryName){

		var index = 0;

		var currentMaintenanceArr = this.state.maintenance;
	
		for (var s=0; s < currentMaintenanceArr.length; s++){

			if (categoryName === currentMaintenanceArr[s].category) {
				index = s;
			}
		}

		currentMaintenanceArr.splice(index, 1);

		var newMaintenanceArr = [];

		currentMaintenanceArr.map((categories) => {
			newMaintenanceArr.push({
				category: categories.category,
				tasks: categories.tasks 
			});
		});

		helpers.updateCarMaintenanceArray(this.state.vin, "maintenance", newMaintenanceArr)
		.then(() => {
			
			helpers.getCarMaintenanceInfo(this.state.vin).then((newMaintenance) => {
				this.setState({maintenance: currentMaintenanceArr}, function(){
					this.calculateCategoryProgress();
				});
			})
		})

		// this.setState({maintenance: currentMaintenanceArr});
	}

	updateCheck(checkedTaskObj, taskCategory){
		// method to update a task's completed status from 0 to 1

		for (var i = 0; i < this.state.maintenance.length; i++) {
			// loop through the maintenance array

			if (this.state.maintenance[i].category === taskCategory){
				// find the matching category
				
				for (var j = 0; j < this.state.maintenance[i].tasks.length;j++){
					// loop through that category's task array 
					// find the matching task

					if (this.state.maintenance[i].tasks[j].name == checkedTaskObj.name){

						// splice the old taskObj off
						this.state.maintenance[i].tasks.splice(j,1);

						// then add the new checkedTaskObj
						this.state.maintenance[i].tasks.push(checkedTaskObj);

					}			

				}
			}
		}

		// save the key and value to be updated
		var newMaintenanceTaskArr = this.state.maintenance;
		var taskUpdateKey = "maintenance";

		helpers.updateCarMaintenanceArray(this.state.vin, taskUpdateKey, newMaintenanceTaskArr)
		.then((data) => {
			helpers.getCarMaintenanceInfo(this.props.params.vin).then((data) => {
				
				this.setState({maintenance:data}, function(){
					this.calculateCategoryProgress();
				});
				
			});
		})
	}

	deleteCar(){
		// method invoked when delete button is clicked
		// deletes car from the database and redirects user back to their projects

		// call helper function to delete
		helpers.deleteCar(this.props.params.vin).then((data) => {
			// redirect to projects
			browserHistory.push("/");
		});
	}

 	componentDidUpdate(prevProps, prevState){
 		// method invoked every time the state updates

		// update category progress bar if there's been a change in state
		if (prevState.overallProgress !== this.state.overallProgress || 
			prevState.vin !== this.state.vin){

			if(!isEqual(prevState.maintenance, this.state.maintenance)){
				// use lodash for deep comparisons
				// in this case, an array of objects within an array of objects
				
				helpers.getCarMaintenanceInfo(this.props.params.vin).then((data) => {

					// get the most recent data from db
					this.setState({maintenance:data}, function(){
						this.calculateCategoryProgress();
					});

				});
			}
			
		}

	}

	// render the component
	render() {

		return (
			<div className="profile-container">
				
				<div>
					<Information vin={this.state.vin}/>
					<MainTasks
						maintenance={this.state.maintenance}
						overallProgress={this.state.overallProgress}
						addNewCategory={this.addNewCategory}
						deleteCategory={this.deleteCategory}
					/>

					{
						this.state.maintenance.map((taskbreakdown, i) => {
							return(
								<div key={i}>
									<Taskbreakdown
										passedMaintenance = {taskbreakdown}
										
										categoryIndex = {i}
										captureCategoryProgress = {this.captureCategoryProgress}

										addNewTask = {this.addNewTask}
										deleteTaskInfo = {this.deleteTaskInfo}
										updateCheck = {this.updateCheck}
									/>
									</div>
							);
						})
					}

					<div className="well">
						<h1>DANGER ZONE</h1>

						<h4>Delete this car</h4>
						<p>Once you delete a car, there's no going back.</p><button onClick={this.deleteCar}></button>
					</div>
				</div>


			</div>
		);
	}
}