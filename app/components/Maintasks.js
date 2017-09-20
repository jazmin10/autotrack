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
		this.handleDelete = this.handleDelete.bind(this);
	}

	// When the component mounts...
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

	// When input is entered, capture the change
	handleChange(event){
		var newState = {};

		newState[event.target.id] = event.target.value;

		this.setState(newState);
	}

	// Captures the main task that was chosen for removal
	// This will be removed once delete method is created in profile
	handleDelete(event){
		var deleteName = event.target.value;
		console.log(deleteName);
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

		return (
			<div className="well well-lg">

					{/* Display the overall progress of the car using semi-circle progress bar */}
					<div>
						<SemiCircle
							progress = {this.state.overallProgress}
							text={(this.state.overallProgress * 100) + "%"}
							options={options}
							initialAnimate={true}
							containerStyle={containerStyle}
							containerClassName={'.progressbar'}
						/>
					</div>

					{/* Display a list of names of the main tasks */}
					<div>
						<h2>Main Tasks</h2>
						
						{this.state.categoryNames.map((category, i) => {
							return (
								<div key={i} className="well">
									{category}
								
									<button 
										value={category}
										className="btn btn-xs btn-danger"
										onClick={this.handleDelete}>
										Delete {/* Group notes: do not use bootstrap glyphicons */}
									</button>
						
								</div>
							);
						})}	
					</div>

					{/* Add a new main task form */}
					<div>
						{/* Need to add onSubmit=method to the form tag */}
						<form>
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

