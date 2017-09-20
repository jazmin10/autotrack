/* ========== PROFILE COMPONENT ==========
 	- contains car's profile (the main profile page)
 	- includes subcomponents car info, main tasks,
 	and task breakdown
 */

// DEPENDENCIES -----------------------------

// include the React library
import React from 'react';
import helper from "./utils/helpers.js";
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
		this.calculate = this.calculate.bind(this);
	}

	componentDidMount(){

		helper.getCarInformation("5YFBURHE9EP015823").then((data) => {

			var categoryProgressArr = [];

			data.map((maintask) => {
				maintask.categoryProgress = 0;
				categoryProgressArr.push(0);
			});

			this.setState({
				vin: "5YFBURHE9EP015823", 
				overallProgress: .3, 
				maintenance: data, 
				categoryProgress: categoryProgressArr});

		});
	}

	calculateCategoryProgress(categoryIndex){
		// method to calculate each category's progress

		// store the taskProgress
		var taskProgress = 0;

		// number of tasks in the category
		var numberOfTasks = this.state.maintenance[categoryIndex].tasks;

		for (var i = 0; i < numberOfTasks.length; i++) {
			// loop through and add the completed status of each task
			taskProgress += numberOfTasks[i].completed; 
		}

		// divide the sum of completed statuses over the number of tasks in that category
		taskProgress = (taskProgress / numberOfTasks.length).toFixed(2);

		var categoryProgressToUpdate = this.state.maintenance[categoryIndex].category;

		// update category's progress
		var maintenance = { 
				category: categoryProgressToUpdate,
				tasks: numberOfTasks,
				categoryProgress: taskProgress
		
			}

		return (maintenance);

	}

	calculate(){

			var newArray = [];

			this.state.maintenance.map((maintask, i) => {
				var taskProgress = 0;
				var numberOfTasks = 0;

				for (let j=0; j < maintask.tasks.length; j++) {
					taskProgress += maintask.tasks[j].completed;
					numberOfTasks++;
				}

				var categoryProgress = Number((taskProgress / numberOfTasks).toFixed(2));
				
				var newObject = {
					category: maintask.category,
					tasks: maintask.tasks,
					categoryProgress: categoryProgress
				}

				newArray.push(newObject);

			});

			// console.log(newArray);
			this.setState({maintenance: newArray});
			
			// THE FOLLOWING PIECE OF CODE IS NOT WORKING. IT'S NOT RESETTING MAINTENANCE TO THE NEWARRAY
			// this.setState({maintenance: newArray});
	}

	
 	componentDidUpdate(prevProps, prevState){
		// check prevState for all states
		console.log("we are in the update react method");

		// update overall progress bar
		// equation: sum of each category's progress / # of categories
		console.log(prevState.maintenance);
		console.log(this.state.maintenance);

		this.state.maintenance.filter(({category, tasks, categoryProgress}) => {
				var {category: prevCat, tasks: prevTasks, categoryProgress: prevCatProg } = prevState.maintenance
				var 

		})

		var {} = prevState.maintenance

		var {} = this.state.maintenance

		console.log(prevState.overallProgress !== this.state.overallProgress, prevState.vin !== this.state.vin, prevState.maintenance !== this.state.maintenance)

		if (prevState.overallProgress !== this.state.overallProgress || 
			prevState.vin !== this.state.vin || 
			prevState.maintenance !== this.state.maintenance){
			
			
			// if (prevState.maintenance !== this.state.maintenance) {
				this.calculate();
			// }
			// this.calculate();
			// console.log(this.state);
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

					{/*{this.state.maintenance.map((taskbreakdown, i) => {
						
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
					}*/}
				</div>


			</div>
		);
	}
}