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
		this.redirectBack = this.redirectBack.bind(this);
	}

	redirectBack(){
		browserHistory.push("/dashboard-manager/profile/" + this.props.params.vin + "?token=" + localStorage.getItem("autotrackToken"));
	}

	print(){
		window.print();
    }

   render() {

		var QRVal = "http://localhost:3000/dashboard-manager/profile/" + (this.props.params.vin);

		var screenSize = window.innerWidth;

		if (screenSize < 500) {
			return(

				<div className="print-qr-well well">

					<h2>VIN: {this.props.params.vin}</h2>
	      	<span id="back-print-btn" className="glyphicon glyphicon-circle-arrow-left" onClick={this.redirectBack}></span>
	        <button id="print-qr-btn" onClick={this.print}> PRINT </button> 
					<div className="print-qr">
						<QRCode
	            bgColor="#FFFFFF"
	            fgColor="#000000"
	            level="Q"
	            style={{ width: 300 }}
	            value={QRVal} 
	           />
		      </div>
		      
				</div>
			);
		}

		return(

			<div className="print-qr-well well">

				<h2>VIN: {this.props.params.vin}</h2>
      	<span id="back-print-btn" className="glyphicon glyphicon-arrow-left" onClick={this.redirectBack}></span>
        <button id="print-qr-btn" onClick={this.print}> PRINT </button> 
				<div className="print-qr">
					<QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 400 }}
            value={QRVal} 
           />
	      </div>
	      
			</div>
			
		);
	}
}