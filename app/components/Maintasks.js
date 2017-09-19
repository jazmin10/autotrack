/* Maintasks Component -  contains the semi-circle progress bar and main maintenance
categories for a car */

import React from 'react';
import helpers from "./utils/helpers.js";
// import Progressbar, {SemiCircle} from "react-progressbar.js";
// // var Progressbar = require("react-progressbar.js");
// // var SemiCircle = Progressbar.SemiCircle;


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
	componentDidMount(){
		var passedMaintenanceProps = [
			{
				name: "Cosmetics",
				tasks: []
			},
			{
				name: "Service",
				tasks: []
			}
		];

		var passedProgessProps = .8;

		var categoryNames = [];

		passedMaintenanceProps.map((search, i) => {
			categoryNames.push(search.name);
		});

		// Reinitialize categoryNames and overallProgress 
		this.setState({
			categoryNames: categoryNames, 
			overallProgress: passedProgessProps
		});
	}

	// When input is entered, capture the change
	handleChange(event){
		var newState = {};

		newState[event.target.id] = event.target.value;

		this.setState(newState);
	}

	handleDelete(event){
		// event.preventDefault();
		// console.log("it worked");
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

		var divStyle = {width: ((this.state.overallProgress) * 100) + "%"};

		return (
			<div className="well well-lg">

				{/*<SemiCircle
					progress = {this.state.overallProgress}
					text={(this.state.overallProgress * 100) + "%"}
					options={options}
					initialAnimate={true}
					containerStyle={containerStyle}
					containerClassName={'.progressbar'}
				 />*/}

				{/* Display the overall progress of the car using semi-circle progress bar */}
				<div>
					Progress: {(this.state.overallProgress *100) + "%"}
					{/* <SemiCircle 
						progress = {this.state.overallProgress}
						text={(this.state.overallProgress * 100) + "%"}
						options={options}
						initialAnimate={true}
						containerStyle={containerStyle}
						containerClassName={'.progressbar'}
					/> */}

					<div className="progress">
					  <div 
					  	className="progress-bar progress-bar-success progress-bar-striped active"
					  	role="progressbar" 
					  	aria-valuenow={this.state.overallProgress} 
					  	aria-valuemin="0" 
					  	aria-valuemax="100" 
					  	style={divStyle}>
					    <span className="sr-only">40% Complete (success)</span>
					  </div>
					</div>

					{/* Display a list of names of the main tasks */}
					<div>
						<h2>Main Tasks</h2>
						
					
						{this.state.categoryNames.map((category, i) => {
							return (
								<div key={i} className="well">
									{category}
									
									{/* Span tag is here in case we need to add it for styling <span>*/}
								
									<button 
										value={category}
										className="btn btn-xs btn-danger"
										onClick={this.handleDelete}>
										Delete {/* Group notes: do not use bootstrap */}
									</button>
							
									{/*</span>*/}
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
			</div>
		);
	}
}

