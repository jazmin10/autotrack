/* Projects Component -  lists all cars for a particular user */

// Include the React library
import React from 'react';
import helper from "./utils/helpers.js";
import { Link } from 'react-router';


export default class Projects extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			carList: []
		}
	}

	componentDidMount() {

		// Call helper function to get all of a particular user's cars.
		helper.getProjectCars("Steve").then(response => {
      		this.setState({carList: response.usercars});
		});

	}

	render() {

	// If carList is not empty, render list of cars.
    if (this.state.carList.length !== 0) {

      return (
        <div className="container">
          <div className="panel panel-default">

            <div className="panel-heading">
              <h3 className="panel-title"><strong>My Projects</strong></h3>
            </div>

            <div className="panel-body">

              {this.state.carList.map((car, i) => {

                return (

                  <div className="well" key={i}>
					<h4><strong>{car.year} {car.make} {car.model}</strong></h4><Link to={"/dashboard-manager/profile/" + car.vin} className="btn btn-primary"> View Profile</Link>
                  </div>
                );
              })}
            </div>

          </div>
        </div> 
      );
    }

    // If carList is empty, render message saying there are no cars to list.
    return(<div>No cars</div>);
  }
}
