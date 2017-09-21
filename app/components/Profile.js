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
// import {QRCode} from "react-qr-svg";

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
	}

	componentDidMount(){
		// method invoked immediately after component is mounted

		// run helpers function to get car info from database
		helpers.getCarMaintenanceInfo(this.props.params.vin).then((data) => {
			// use vin number from url via react router link

			data.map((maintask) => {
				maintask.categoryProgress = 0;
			});

			this.setState({
				vin: "5YFBURHE9EP015823", 
				overallProgress: .3, 
				maintenance: data});

		});
	}

	calculateCategoryProgress(){
		// method to calculate the progress of each category

		var newArray = [];

		this.state.maintenance.map((maintask, i) => {
			var taskProgress = 0;
			var numberOfTasks = 0;

			for (let j=0; j < maintask.tasks.length; j++) {
				// get the sum of each task's completion
				taskProgress += maintask.tasks[j].completed;

				// get the number of tasks in a category
				numberOfTasks++;
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
			sumProgress += category.categoryProgress;
		});

	
		calculatedProgress = (sumProgress/this.state.maintenance.length);
	
		var newNumber = Number(calculatedProgress);
		
		this.setState({overallProgress: calculatedProgress});
	}

 	componentDidUpdate(prevProps, prevState){
 		// method invoked every time the state updates

		// update category progress bar if there's been a change in state
		if (prevState.overallProgress !== this.state.overallProgress || 
			prevState.vin !== this.state.vin){

			if(!isEqual(prevState.maintenance, this.state.maintenance)){
				// use lodash for deep comparisons
				// in this case, an array of objects within an array of objects

				this.calculateCategoryProgress();
			}
			
		}

	}

	// render the component
	render() {
		return (
			<div className="profile-container">
				<div>
					{/*<Information />*/}
					<MainTasks
						maintenance={this.state.maintenance}
						overallProgress={this.state.overallProgress}
					/>

					{
						this.state.maintenance.map((taskbreakdown, i) => {
						
							return(
								<div className="col-md-6" key={i}>
									<Taskbreakdown
										passedMaintenance = {taskbreakdown}
										
										categoryIndex = {i}
										captureCategoryProgress = {this.captureCategoryProgress}
									/>
									</div>
							);
						})
					}
				</div>


			</div>
		);
	}
}