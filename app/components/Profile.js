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
// import Progress from "./Progressbar.js";

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
		// console.log(this.props);
		// console.log(this.props.params.vin);

		helpers.getCarInformation("5YFBURHE9EP015823").then((data) => {

			data.map((maintask) => {
				maintask.categoryProgress = 0;
			});

			// this.calculateOverallProgress();
			this.setState({
				vin: "5YFBURHE9EP015823", 
				// overallProgress: .3, 
				maintenance: data});

		});
	}

	calculateCategoryProgress(){

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

			this.setState({maintenance: newArray}, function(){
				this.calculateOverallProgress()
			});
	}

	calculateOverallProgress(before, after){
		
		var sumProgress = 0;
		var calculatedProgress = 0;

		this.state.maintenance.map((category) => {
			sumProgress += category.categoryProgress;
		});

	
		calculatedProgress = (sumProgress/this.state.maintenance.length);
		
		this.setState({overallProgress: calculatedProgress});
	}

 	componentDidUpdate(prevProps, prevState){
		// check prevState for all states

		if (prevState.overallProgress !== this.state.overallProgress || 
			prevState.vin !== this.state.vin){

			if(!isEqual(prevState.maintenance, this.state.maintenance)){
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

					{this.state.maintenance.map((taskbreakdown, i) => {
						
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