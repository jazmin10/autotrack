/* ========== PROFILE COMPONENT ==========
 	- contains car's profile (the main profile page)
 	- includes subcomponents car info, main tasks,
 	and task breakdown
 */

// DEPENDENCIES -----------------------------

// include the React library
import React from 'react';
import helpers from "./utils/helpers.js";
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
			maintenance: []
		}
	}

	componentDidMount() {
		var databaseInformation = {
			overallProgress: .3,
			vin: "5YFBURHE9EP015823",
			maintenance: [
				{
					category: "Cosmetics",
					tasks: [
						{
							name: "Paint",
							completed: 1
						},
						{
							name: "Dent",
							completed: 0
						},
					],
					categoryProgress: 0.5
				},
				{
					category: "Service",
					tasks: [
						{
							name: "Oil Change",
							completed: 0
						},
						{
							name: "Tire Rotation",
							completed: 1
						},
						{
							name: "Coolant Flush",
							completed: 0
						}
					],
					categoryProgress: .33
				}
			]
		}

		this.setState({
			overallProgress: databaseInformation.overallProgress,
			vin: databaseInformation.vin,
			maintenance: databaseInformation.maintenance
		});
	}

	// captureProgressCategory(progress){
	// 	// this method doesn't calculate the progress
	// 	// progress calculation will be done in Tasks component

	// 	// this method captures the progress of the category

	// 	// this.setState to the new progress of the category
	// }

	// addNewCategory(){
	// 	// this method adds a new category
	// 	// pass this method down to MainTasks component
	// 	// this.setState push new category to maintenance
	// }

	// addNewTask(){
	// 	// this method adds a new task
	// 	// pass this method down to Tasks component
	// 	// this.setState push new task to maintenance -> category
	// }
	
	// deleteCategory(){
	// 	// this method deletes a category
	// 	// pass this method down to MainTasks component
	// 	// this.setState removes the category from maintenance
	// }

	// deleteTask(){
	// 	// this method deletes a task
	// 	// pass this method down to Tasks component
	// 	// this.setState removes the task from maintenance -> category
	// }

	// componentDidUpdate(prevProps, prevState){
	// 	// check prevState for all states

	// 	// update overall progress bar
	// 	// equation: sum of each category's progress / # of categories
	// }

	// render the component
	render() {
		return (
			<div className="profile-container">
				<div>
					<Information />
					<MainTasks
						maintenance={this.state.maintenance}
						overallProgress={this.state.overallProgress}
					/>

					{this.state.maintenance.map((taskbreakdown, i) => {
						
							return(
								<div className="col-md-6" key={i}>
									<Taskbreakdown
										passedMaintenance = {taskbreakdown}
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