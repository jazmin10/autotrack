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
			<div className="well information-well">
				<div className="basic-specs-div">
					<h2 id="basic-specs-title">BASIC SPECS</h2>
				
	                <div className="specs-info-div">
	                	<h5 className="spec-titles">MAKE</h5>
	                	<h2 className="specs">{this.state.make}</h2>
	                	<h5 className="spec-titles">MODEL</h5>
	                	<h2 className="specs">{this.state.model}</h2>
	                	<h5 className="spec-titles">YEAR</h5>
	                	<h2 className="specs">{this.state.year}</h2>
	                	<h5 className="spec-titles">COLOR</h5>
	                	<h2 className="specs">{this.state.color}</h2>
	                	<h5 className="spec-titles">MILEAGE</h5>
	                	<h2 className="specs">{this.state.mileage}</h2>
	                	<h5 className="spec-titles">VIN</h5>
	                	<h2 className="specs" id="vin">{this.state.vin}</h2>
					</div>

					<div className="qr-code">
					<QRCode
	                    bgColor="#FFFFFF"
	                    fgColor="#000000"
	                    level="Q"
	                    style={{ width: 256 }}
	                    value={QRVal} 
	                />
	                </div>
				</div>
			</div>
		);
	}
}