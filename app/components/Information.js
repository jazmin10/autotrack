/* ========== CAR INFORMATION COMPONENT ==========
 	- contains car information (vin, make, model, year, color,
mileage) for a car
	- child of profile
*/

// DEPENDENCIES -----------------------------
// include the react library
import React from 'react';

// include helpers
import helpers from "./utils/helpers.js";

// include QR code
import { QRCode } from 'react-qr-svg';

// INFORMATION -----------------------------
export default class Information extends React.Component {
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

	// componentDidMount() {

	// 	console.log(this.props.params.vin)
	// 	helpers.getCarInfo(this.props.params.vin).then((data) => {

	// 		this.setState({
	// 			vin: data.vin,
	// 			make: data.make,
	// 			model: data.model,
	// 			year: data.year,
	// 			color: data.color,
	// 			mileage: data.mileage
	// 		});
	// 	});
	// }

	componentWillReceiveProps(nextProps){
		helpers.getCarInfo(nextProps.vin).then((data) => {

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

		var QRVal = "http://localhost:3000/dashboard-manager/profile/" + (this.state.vin);
		
		return(
			<div className="container" className="well">
				<h2>Basic Specs</h2>
				<QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 256 }}
                    value={QRVal} 
                />
				<h4>
					{this.state.year} {this.state.color} {this.state.make} {this.state.model}
				</h4>
				<h5>Mileage: {this.state.mileage}</h5>
				<h5>VIN: {this.state.vin}</h5>
			</div>
		);
	}
}