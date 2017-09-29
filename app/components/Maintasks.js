/* Maintasks Component -  contains the semi-circle progress bar and main maintenance
categories for a car */

import React from 'react';
import helpers from "./utils/helpers.js";
import { SemiCircle } from "./react-progress.js";


export default class Maintasks extends React.Component {
	constructor(props){
		super(props);

		// Initializes the overall progress and the main tasks of the car
		// newCategory is used to handle input for the form 
		this.state = {
			overallProgress: 0,
			categoryNames: [],
			newCategory: ""
		}

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
				color: '#42f445'
			};
		}
		else if (this.state.overallProgress < 1 && this.state.overallProgress >= .5) {
			var options = {
				strokeWidth:2,
				color: '#fb1'
			};
		}
		else {
			var options = {
				strokeWidth:2,
				color: '#f44242'
			};
		}

		var containerStyle = {
			width:'300px',
			height:'150px'
		};

		if (this.state.categoryNames.length !== 0) {

			return (
				<div className="tasks-container">
					<div className="well tasks-content individual-tasks-div">
						{/* Display a list of names of the main tasks */}
						<div className="">
							<h1 className="main-tasks">Main Tasks</h1>
							

							{/* Display the overall progress of the car using semi-circle progress bar */}
							<div>
								<SemiCircle
									progress = {this.state.overallProgress}
									text={((this.state.overallProgress * 100).toFixed(0)) + "%"}
									options={options}
									initialAnimate={true}
									containerStyle={containerStyle}
									containerClassName={'.progressbar'}
								/>
							</div>
							<br/>
							
							{this.state.categoryNames.map((category, i) => {
								return (
									<div className="well" key={i}>
										<h3 className="main-cat">{category}</h3>
									
										<button 
											value={category}
											className="maintask-delete"
											onClick={this.handleDelete}>
											Delete {/* Group notes: do not use bootstrap glyphicons */}
										</button>
							
									</div>
								);
							})}	
						</div>

						{/* Add a new main task form */}
						<div className="add-task-container">
							{/* Need to add onSubmit=method to the form tag */}
							<form onSubmit={this.handleSubmit}>
								<div className="form-group tasks-form">
								 <h4 className="tasks-add-form-h4">Add Main Task:</h4>
									

				            	<input
				               	value={this.state.newCategory}
				                type="text"
				                className="form-control tasks-add-form"
				                id="newCategory"
				                onChange={this.handleChange}
				                required
				              	/>
				      			<button className="btn main-task-add-btn" type="submit">Submit</button>
								<br/>
								</div>
							</form>
						</div>
					</div>	
				</div>
			);
		}

		return (
				<div id="empty-task" className="well well-lg">

						{/* Display a list of names of the main tasks */}
						<div>
							<h2>Main Tasks</h2>
							<hr/>
						</div>

						{/* Add a new main task form */}
						<div>
							{/* Need to add onSubmit=method to the form tag */}
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<h4>Add Main Task:</h4>

		            	<input
		               	value={this.state.newCategory}
		                type="text"
		                className="form-control"
		                id="newCategory"
		                onChange={this.handleChange}
		                required
		              />
		              <br/>

		              <button className="btn btn-primary" type="submit">Submit</button>
								</div>
							</form>
						</div>

				</div>
			);
	}
}

