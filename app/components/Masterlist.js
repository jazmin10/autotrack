/* Masterlist Component -  lists of all cars saved in the cars collection */

// Include the React library
import React from 'react';
import helpers from "./utils/helpers.js";
import { Link } from 'react-router';


export default class Masterlist extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			masterlist: []
		}
	}

	componentDidMount() {

		helpers.getMasterlist().then(response => {
      this.setState({masterlist: response});
		});

	}

	render() {

    if (this.state.masterlist.length !== 0) {

      return (

            <div className="panel-body">

              {this.state.masterlist.map((car, i) => {

                return (

                  <div className="well" key={i}>
					<h4><strong>{car.year} {car.make} {car.model}</strong></h4><Link to={"/dashboard-manager/profile/" + car.vin} className="btn btn-primary"> View Profile</Link>
                  </div>
                );
              })}
            </div>

      );
    }

    return(<div>No cars</div>);
  }
}
