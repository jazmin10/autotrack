/* ========== MAINTASKS COMPONENT ==========
  - contains the semi-circle progress bar and main maintenance
categories for a car
*/

// DEPENDENCIES 
// =====================================================
import React from 'react';
import helpers from "./utils/helpers.js";
import { SemiCircle } from "./react-progress.js";

// MAINTASKS COMPONENT
// =====================================================

// create and export Maintasks component
export default class Maintasks extends React.Component {

	// initial state setup
	constructor(props){
		super(props);

		// Initializes the overall progress and the main tasks of the car
		// newCategory is used to handle input for the form 
		this.state = {
			overallProgress: 0,
			categoryNames: [],
			newCategory: ""
		}

		// bind functions
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	// When props change...
	componentWillReceiveProps(nextProps){

		// Set a blank array that will hold the names of the main tasks
		var categoryNames = [];

		// Loop through the maintenance array and push main tasks names into
		// the categoryNames array
		nextProps.maintenance.map((maintasks, i) => {
			categoryNames.push(maintasks.category);
		});

		// Initialize categoryNames and overallProgress 
		this.setState({
			categoryNames: categoryNames, 
			overallProgress: nextProps.overallProgress
		});
	}

	// When input is entered in the "Add Main Task" form, capture the change
	handleChange(event){
		var newState = {};

		newState[event.target.id] = event.target.value;

		this.setState(newState);
	}

	// Captures the main task that was chosen for removal
	// This will be removed once delete method is created in profile
	handleDelete(event){
		var deleteName = event.target.value;
		this.props.deleteCategory(deleteName);
	}

	// When the submit button for the "Add Main Task" form is clicked...
	handleSubmit(event){
		event.preventDefault();

		// call the addNewCategory method in the Profile component with the input entered
		this.props.addNewCategory(this.state.newCategory);

		// empty newTask field
		this.setState({newCategory:""});
	}

	render() {

		if (this.state.overallProgress == 1) {
			var options = {
				strokeWidth:2,
				color: '#42f445' // green
			};
		}
		else if (this.state.overallProgress < 1 && this.state.overallProgress >= .5) {
			var options = {
				strokeWidth:2,
				color: '#fb1' // yellow
			};
		}
		else {
			var options = {
				strokeWidth:2,
				color: '#f44242' // red
			};
		}

		var containerStyle = {
			width:'300px',
			height:'150px'
		};

		if (this.state.categoryNames.length !== 0) {

			return (
				<div className="tasks-container">

					<div>

						<div className="well tasks-content">
							{/* Display a list of names of the main tasks */}
							<div className="maintasks-div">
									<h1 className="maintasks-h1">Main Tasks</h1>
									

									{/* Display the overall progress of the car using semi-circle progress bar */}
									<div>
										<SemiCircle
											progress = {this.state.overallProgress}
											text={((this.state.overallProgress * 100).toFixed(0)) + "%"}
											options={options}
											initialAnimate={true}
											containerStyle={containerStyle}
											containerClassName={'semicircleprogressbar'}
										/>
									</div>
									<br/>
									
									{this.state.categoryNames.map((category, i) => {
										return (
											<div className="well" key={i}>
												<h3 className="maintasks-h3">{category}</h3>
											
												<button 
													value={category}
													className="maintask-delete"
													onClick={this.handleDelete}>
													DELETE MAIN TASK
												</button>
									
											</div>
										);
									})}	


								{/* Add a new main task form */}
								<div className="add-maintask-container">
									{/* Need to add onSubmit=method to the form tag */}
									<form onSubmit={this.handleSubmit}>
										<div className="form-group maintasks-form">
											 <h4 className="maintasks-add-form-h4">Add Main Task:</h4>
												

							            	<input
							               	value={this.state.newCategory}
							                type="text"
							                className="form-control maintasks-add-form"
							                id="newCategory"
							                onChange={this.handleChange}
							                required
							              	/>
							      			<button className="btn maintask-add-btn" type="submit">ADD MAIN TASK</button>
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

		return (
			<div className="tasks-container">
				<div id="empty-task" className="well well-lg maintasks-content">
					<div className="maintasks-div">
						{/* Display a list of names of the main tasks */}
						<div>
							<h1 className="maintasks-h1">Main Tasks</h1>
							<br/>
						</div>

						{/* Add a new main task form */}
						<div className="add-maintask-container">
							{/* Need to add onSubmit=method to the form tag */}
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<h4 className="maintasks-add-form-h4">Add Main Task:</h4>

					            	<input
					               	value={this.state.newCategory}
					                type="text"
					                className="form-control maintasks-add-form-input"
					                id="newCategory"
					                onChange={this.handleChange}
					                required
					              	/>
					            	<br/>

		              				<button className="btn maintask-add-btn" type="submit">ADD MAIN TASK</button>
								</div>
							</form>
						</div>
					</div>

				</div>
			</div>	
		);
	}
}

