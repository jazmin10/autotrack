/* Add Component -  contains the add/edit form for the cars */

import React from 'react';
import helpers from "./utils/helpers.js";
import Information from './Information.js'

//Not sure if it is needed. Add it for now..
import { Link } from 'react-router';

export default class Add extends React.Component {

	//initial state setup in constructor
	constructor(props){
		super(props);

		this.state = {
			vin: "",
			make: "",
			model: "",
			year: 0,
			color: "",
			mileage: 0
		}

		this.checkVIN = this.checkVIN.bind(this);
		this.handleChangeInfo = this.handleChangeInfo.bind(this);
		// this.handleSubmitVIN = this.handleSubmitVIN.bind(this);
		// this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
	}

	handleChangeInfo(){
		var newInputState = {};
		newInputState[event.target.id] = event.target.value;
		this.setState(newInputState);
	}

	checkVIN(event){
		event.preventDefault();
		console.log(this.state.vin);
	 	helpers.getCarInfo(this.state.vin)
	 	.then(response => {
	 		
	 		console.log(response);
	 		
	 		if(response !== null) {

	 			this.setState  ({
	 				vin: response.vin,
	 				make: response.make,
	 				model: response.model,
	 				year: response.year,
	 				color: response.color,
	 				mileage: response.mileage
	 			})
	 			
	 		}else{

	 			console.log("Response is null");

	 			this.scrape();
	 			
	 		}

	 	}
	 	//if DB return null then call helper.scrape()
	 	//else set the state
	 	)
	}

	scrape() {

	     helpers.scrape(this.state.vin)
	      .then(response => {

	      	console.log("scrape response " + response);

	     this.setState({
	         vin: response.vin,
	         make: response.make,
	         model: response.model,
	         year: response.year,
	         color: response.color,
	         mileage: response.mileage
	     })



	      })
	}

	// handleSubmitVIN(){}

	// handleSubmitInfo(){

	// }
	

		render() {

		if(this.state.vin === "") {
			return (
				<div>
					<div className="form-group">	
						<form onSubmit={this.checkVIN}>
						
							<h3> VIN Number of the Car: </h3>

					        <input placeholder={this.state.vin} 
					        	value={this.state.vin} 
								type="text"
								className="form-control"
				                id="vin"
				                onChange={this.handleChangeInfo}
				                required
					        />
					    
						</form>
					</div>
					<div>
						<button className="btn btn-primary" type="submit">Submit</button>
					</div>
				</div>
			);
		}
		else{
			return(
				<div className="addEditForm">
				        <h3> VIN Number of the Car: </h3>

				        <input placeholder={this.state.vin} 
				        	value={this.state.vin} 
							type="text"
							className="form-control"
			                id="vin"
			                onChange={this.handleChangeInfo}
			                required
				        />

						<h3> Make of the Car: </h3>

						<input placeholder={this.state.make} 
							value={this.state.make} 
							type="text"
							className="form-control"
			                id="make"
			                onChange={this.handleChangeInfo}
			                required
			            />
			            <br/>

			            <h3> Model of the Car: </h3>

			            <input placeholder={this.state.model}
			            	value={this.state.model}
				            type="text"
				            className="form-control"
				            id="model"
				            onChange={this.handleChangeInfo}
				            required
			            />
						<br/>

						<h3> Year of the Car: </h3>

						<input placeholder={this.state.year}
							value={this.state.year}
							type="text"
							className="form-control"
							id="year"
							onChange={this.handleChangeInfo}
							required
						/>
						<br/>

						<h3> Color of the Car: </h3>
							
						<input value={this.state.color}
							type="text"
							className="form-control"
							id="color"
							onChange={this.handleChangeInfo}
							required
						/>
						<br/>

						<h3> Mileage of the Car: </h3>

						<input value={this.state.mileage}
							type="text"
							className="form-control"
							id="mileage"
							onChange={this.handleChangeInfo}
							required
						/>
						<br/>

			            <button className="btn btn-primary" 
			            	type="submit"> Add/Edit
			            </button>
			            <br/>
				</div>

				
			);
		}
		}

		
	}
