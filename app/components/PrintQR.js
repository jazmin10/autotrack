import React from 'react';
import helpers from "./utils/helpers.js";
import { QRCode } from 'react-qr-svg';
import router, {browserHistory} from "react-router";

export default class PrintQR extends React.Component {

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

		this.print = this.print.bind(this);
	}

	print(){
		window.print();
    }

   render() {

		var QRVal = "http://localhost:3000/dashboard-manager/profile/" + (this.props.params.vin);
		
		return(
			<div className="well information-well">
					<div className="qr-code">
						<QRCode
		                    bgColor="#FFFFFF"
		                    fgColor="#000000"
		                    level="Q"
		                    style={{ width: 500 }}
		                    value={QRVal} 
	                	/>
		            </div>
                    <div className="well information-well">
                    	<button onClick={this.print}> PRINT </button> 
                    </div>
			</div>
		);
	}
}