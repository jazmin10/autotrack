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
			mileage: 0,
			vinExist: false
		}

		this.checkVIN = this.checkVIN.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.createRecord = this.createRecord.bind(this);
		this.updateRecord = this.updateRecord.bind(this);
		// this.handleChange = this.handleChange.bind(this);
		// this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
	}

	handleChange(event){

		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	checkVIN(event) {

		event.preventDefault();

		console.log(this.state.vin)
        helpers.getCarInfo(this.state.vin)
         .then(response => {

             console.log(response);

             if(response != null) {

         	     this.setState({
                 vin: response.vin,
                 make: response.make,
                 model: response.model,
                 year: response.year,
                 color: response.color,
                 mileage: response.mileage,
                 vinExist: true

             })

             } else {
             	console.log("Response is null!");

             	this.scrape();

             }

    	 })
    }

    scrape()
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


	      	console.log("scrape resonse " + response);
	      	console.log("scrape response " + response);

	     this.setState({
	         vin: response.vin,
	         make: response.make,
	         model: response.model,
	         year: response.year,
	         color: response.color,
	         mileage: response.mileage
	     })



	      });
	      	console.log("scrape response ");
	      	console.log(response);

		    this.setState({
		        make: response.make,
		        model: response.model,
		        year: response.year,
		     })
	      })
    }

	updateRecord(){
		console.log("updating record");
	}

	createRecord(){
		console.log("create record");
	}

	render() {

		if (this.state.make === "" || this.state.model === "" || this.state.year === "" ) {

		// Render Check Vin input
		return (

			<div className="panel-body">

				<div className="form-group">
					<form onSubmit={this.checkVIN}>

						<h3>VIN Number of the Car:</h3>
						
							<input
							type="text"
							value={this.state.vin}
							id="vin"
							className="form-control"
							onChange={this.handleChange}
							required
							/>

							<button type="submit" className="btn btn-default navbar-btn">Check VIN</button>
					</form>
												
				</div>
			</div>
		)

		}
		else if (this.state.vinExist === false) {
			return(
			<div className="panel-body">

					<div className="addEditForm">

						{/* Create the form and add all the input fields */}

						<form onSubmit={this.createRecord}>
							
							<div className="form-group">

								<h3>VIN Number of the Car:</h3>

						        <input value={this.state.vin} 
									type="text"
									className="form-control"
					                id="vin"
					                onChange={this.handleChange}
					                required
						        />
						        <br/>

								<h3>Make of the Car:</h3>

								<input value={this.state.make} 
									type="text"
									className="form-control"
					                id="make"
					                onChange={this.handleChange}
					                required
					            />
					            <br/>

					            <h3>Model of the Car:</h3>

					            <input value={this.state.model}
						            type="text"
						            className="form-control"
						            id="model"
						            onChange={this.handleChange}
						            required
					            />
								<br/>

								<h3>Year of the Car:</h3>

								<input value={this.state.year}
									type="text"
									className="form-control"
									id="year"
									onChange={this.handleChange}
									required
								/>
								<br/>

								<h3>Color of the Car:</h3>
									
								<input value={this.state.color}
									type="text"
									className="form-control"
									id="color"
									onChange={this.handleChange}
									required
								/>
								<br/>

								<h3>Mileage of the Car:</h3>

								<input value={this.state.mileage}
									type="text"
									className="form-control"
									id="mileage"
									onChange={this.handleChange}
									required
								/>
								<br/>

					            <button className="btn btn-primary" 
					            	type="submit"> Add
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

				<div className="panel-body">

					<div className="addEditForm">

						{/* Create the form and add all the input fields */}

						<form onSubmit={this.updateRecord}>
							
							<div className="form-group">

								<h3>VIN Number of the Car:</h3>

						        <input value={this.state.vin} 
									type="text"
									className="form-control"
					                id="vin"
					                onChange={this.handleChange}
					                required
						        />
						        <br/>

								<h3>Make of the Car:</h3>

								<input value={this.state.make} 
									type="text"
									className="form-control"
					                id="make"
					                onChange={this.handleChange}
					                required
					            />
					            <br/>

					            <h3>Model of the Car:</h3>

					            <input value={this.state.model}
						            type="text"
						            className="form-control"
						            id="model"
						            onChange={this.handleChange}
						            required
					            />
								<br/>

								<h3>Year of the Car:</h3>

								<input value={this.state.year}
									type="text"
									className="form-control"
									id="year"
									onChange={this.handleChange}
									required
								/>
								<br/>

								<h3>Color of the Car:</h3>
									
								<input value={this.state.color}
									type="text"
									className="form-control"
									id="color"
									onChange={this.handleChange}
									required
								/>
								<br/>

								<h3>Mileage of the Car:</h3>

								<input value={this.state.mileage}
									type="text"
									className="form-control"
									id="mileage"
									onChange={this.handleChange}
									required
								/>
								<br/>

					            <button className="btn btn-primary" 
					            	type="submit"> Edit
					            </button>

					            <br/>

							</div>

						</form>

					</div>

				</div>

			)
		}
	}
		// return (

		// 	<div className="panel-body">

		// 	{/* Create the form and add all the input fields */}

		// 	<form ref="form">
		// 		<div className="form-group">

		// 			<h3> VIN Number of the Car: </h3>

		// 	        <input value={this.state.vin} 
		// 				type="text"
		// 				className="form-control"
		//                 id="vin"
		//                 onChange={this.handleSubmitVIN}
		//                 required
		// 	        />
		// 	        <br/>

		// 			<h3> Make of the Car: </h3>

		// 			<input value={this.state.make} 
		// 				type="text"
		// 				className="form-control"
		//                 id="make"
		//                 onChange={this.handleChange}
		//                 required
		//             />
		//             <br/>

		//             <h3> Model of the Car: </h3>

		//             <input value={this.state.model}
		// 	            type="text"
		// 	            className="form-control"
		// 	            id="model"
		// 	            onChange={this.handleChange}
		// 	            required
		//             />
		// 			<br/>

		// 			<h3> Year of the Car: </h3>

		// 			<input value={this.state.year}
		// 				type="text"
		// 				className="form-control"
		// 				id="year"
		// 				onChange={this.handleChange}
		// 				required
		// 			/>
		// 			<br/>

		// 			<h3> Color of the Car: </h3>
						
		// 			<input value={this.state.color}
		// 				type="text"
		// 				className="form-control"
		// 				id="color"
		// 				onChange={this.handleChange}
		// 				required
		// 			/>
		// 			<br/>

		// 			<h3> Mileage of the Car: </h3>

		// 			<input value={this.state.mileage}
		// 				type="text"
		// 				className="form-control"
		// 				id="mileage"
		// 				onChange={this.handleChange}
		// 				required
		// 			/>
		// 			<br/>

		//             <button className="btn btn-primary" 
		//             	type="submit"> Add/Edit
		//             </button>
		//             <br/>
		// 		</div>
		// 	</form>

		// 	</div>

		// )
}
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
