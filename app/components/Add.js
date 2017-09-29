/* Add Component -  contains the add/edit form for the cars */

import React from 'react';
import helpers from "./utils/helpers.js";
import Information from './Information.js'

//Not sure if it is needed. Add it for now..
import { Link } from 'react-router';

import router, {browserHistory} from "react-router";

export default class Add extends React.Component {

	//initial state setup in constructor
	constructor(props){
		super(props);

		this.state = {
			vin: "",
			make: "",
			model: "",
			year: 0,
			color: "N/A",
			mileage: 0,
			vinExist: false
		}

		this.checkVIN = this.checkVIN.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.createRecord = this.createRecord.bind(this);
		this.updateRecord = this.updateRecord.bind(this);
		this.handleUpdateRedirect = this.handleUpdateRedirect.bind(this);
		this.clear = this.clear.bind(this);
	}

	clear(){
		this.setState({
			vin: "",
			make: "",
			model: "",
			year: 0,
			color: "N/A",
			mileage: 0,
			vinExist: false
		});
	}

	handleChange(event){

		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	checkVIN(event) {

		event.preventDefault();

    helpers.getCarInfo(this.state.vin).then(response => {

        if(response != null) {

     	    this.setState({
             vin: response.vin,
             make: response.make,
             model: response.model,
             year: response.year,
             color: response.color,
             mileage: response.mileage,
             vinExist: true

         	});

        } else {
         	this.scrape();
        }

    	});
    }

    scrape() {

	  	helpers.scrape(this.state.vin).then(response => {

		    this.setState({
	        make: response.make,
	        model: response.model,
	        year: response.year
		    });
	    });
    }

	updateRecord(event) {

		event.preventDefault();
		// update DB where this record is
		var updateCar = {
			make: this.state.make,
			model:this.state.model,
			year: this.state.year,
			color: this.state.color,
			mileage: this.state.mileage
		}

		helpers.updateCarInfo(this.state.vin, updateCar)
		.then(data => {

			this.handleUpdateRedirect(data.vin);
		});
	}

	createRecord(event) {
		event.preventDefault();
		var username = localStorage.getItem("username");

		var newCar = {
			vin: this.state.vin,
			make: this.state.make,
			model:this.state.model,
			year: this.state.year,
			color: this.state.color,
			mileage: this.state.mileage,
			maintenance: []
		}
		
		helpers.createCar(username, newCar).then(() => {
			this.setState({
				vin: "",
				make: "", 
				model: "", 
				year: 0, 
				color: "N/A", 
				mileage: 0
			});
		});
		
	}

	handleUpdateRedirect(vin) {
		browserHistory.push("/dashboard-manager/profile/" + vin + "?token=" + localStorage.getItem("autotrackToken"));
	}

	render() {

		if (this.state.make === "" || this.state.model === "" || this.state.year === "" ) {

		// Render Check Vin input
		return (

			<div id="vinsearch-panel" className="panel-body">

				<div className="form-group vinsearch-form">
					<form onSubmit={this.checkVIN}>

						<h3 className="vin-h3">VIN Number</h3>
						
							<input
							type="text"
							value={this.state.vin}
							id="vin"
							className="form-control vinsearch-input"
							onChange={this.handleChange}
							required
							/>

							<button type="submit" 
							id="vinsearch-btn" className="btn">SEARCH VIN</button>
					</form>
												
				</div>
			</div>
		)

		}
		else if (this.state.vinExist === false) {
			return(
			<div className="panel-body add-panel">

					<span className="glyphicon glyphicon-arrow-left" onClick={this.clear}></span>

					<div className="addEditForm">

						{/* Create the form and add all the input fields */}

						<form onSubmit={this.createRecord}>
							
							<div className="form-group">

								<h3 className="addedit-form-h3">VIN Number</h3>

						        <input value={this.state.vin} 
									type="text"
									className="form-control addedit-input"
					                id="vin"
					                onChange={this.handleChange}
					                required
								        />
						        <br/>

								<h3 className="addedit-form-h3">Make</h3>

								<input value={this.state.make} 
									type="text"
									className="form-control addedit-input"
					                id="make"
					                onChange={this.handleChange}
					                required
					            />
					            <br/>

					            <h3 className="addedit-form-h3">Model</h3>

					            <input value={this.state.model}
						            type="text"
						            className="form-control addedit-input"
						            id="model"
						            onChange={this.handleChange}
						            required
					            />
								<br/>

								<h3 className="addedit-form-h3">Year</h3>

								<input value={this.state.year}
									type="text"
									className="form-control addedit-input"
									id="year"
									onChange={this.handleChange}
									required
								/>
								<br/>

								<h3 className="addedit-form-h3">Color</h3>
									
								<input value={this.state.color}
									type="text"
									className="form-control addedit-input"
									id="color"
									onChange={this.handleChange}
									required
									
								/>
								<br/>

								<h3 className="addedit-form-h3">Mileage</h3>

								<input value={this.state.mileage}
									type="text"
									className="form-control addedit-input"
									id="mileage"
									onChange={this.handleChange}
									required
								/>
								<br/>

					            <button id="addcar-btn" className="btn" 
					            	type="submit"> Add Car
					            </button>

					            <br/>

							</div>

						</form>

					</div>

				</div>
				);
			}

		

			// Render Add/Edit Form
			return (

				<div className="panel-body add-panel">

					<span className="glyphicon glyphicon-arrow-left" onClick={this.clear}></span>
					
					<div id="inForm" className="addEditForm">

						{/* Create the form and add all the input fields */}

						<form onSubmit={this.updateRecord}>
							
							<div className="form-group">

								<h3 className="addedit-form-h3">VIN Number</h3>

						        <input value={this.state.vin} 
									type="text"
									className="form-control addedit-input"
					                id="vin"
					                onChange={this.handleChange}
					                required
						        />
						        <br/>

								<h3 className="addedit-form-h3">Make</h3>

								<input value={this.state.make} 
									type="text"
									className="form-control addedit-input"
					                id="make"
					                onChange={this.handleChange}
					                required
					            />
					            <br/>

					            <h3 className="addedit-form-h3">Model</h3>

					            <input value={this.state.model}
						            type="text"
						            className="form-control addedit-input"
						            id="model"
						            onChange={this.handleChange}
						            required
					            />
								<br/>

								<h3 className="addedit-form-h3">Year</h3>

								<input value={this.state.year}
									type="text"
									className="form-control addedit-input"
									id="year"
									onChange={this.handleChange}
									required
								/>
								<br/>

								<h3 className="addedit-form-h3">Color</h3>
									
								<input value={this.state.color}
									type="text"
									className="form-control addedit-input"
									id="color"
									onChange={this.handleChange}
									required
								/>
								<br/>

								<h3 className="addedit-form-h3">Mileage</h3>

								<input value={this.state.mileage}
									type="text"
									className="form-control addedit-input"
									id="mileage"
									onChange={this.handleChange}
									required
								/>
								<br/>

					            <button id="editcar-btn" className="btn" 
					            	type="submit"> Edit Car
					            </button>

					            <br/>

							</div>

						</form>

					</div>

				</div>

			)
		}
	}
