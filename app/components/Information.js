/* Information Component -  contains the car information (vin, make, model, year, color,
mileage) for a car */

import React from 'react';
import helpers from "./utils/helpers.js";

export default class Projects extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			vin: "",
			make: "",
			model: "",
			year: 0,
			color: "",
			mileage: 0
		}
	}

	componentDidMount() {
		helpers.getCarInfo("5YFBURHE9EP015823").then((data) => {
			this.setState({
				vin: data.vin,
				make: data.make,
				model: data.model,
				year: data.year,
				color: data.color,
				mileage: data.mileage
			});
		});
	}

	render() {
		return(
			<div className="container" className="well">
				<h2>Basic Specs</h2>
				<h4>
					{this.state.year} {this.state.color} {this.state.make} {this.state.model}
				</h4>
				<h5>Mileage: {this.state.mileage}</h5>
				<h5>VIN: {this.state.vin}</h5>
			</div>
		);
	}
}