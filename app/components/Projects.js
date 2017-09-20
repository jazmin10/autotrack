/* Projects Component -  lists all cars for a particular user */

// Include the React library
import React from 'react';
import helper from "./utils/helpers.js";

export default class Projects extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			carList: []
		}
	}

	componentDidMount() {

		helper.getProjectCars("steve").then(response => {
      this.setState({carList: response.usercars});
		});

	}

	render() {

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
                  	<p><strong>{car.vin}<br/>
                  	{car.year} {car.make} {car.model}</strong></p>
                  </div>
                );
              })}
            </div>

          </div>
        </div> 
      );
    }

    return(<div>No cars</div>);
  }
}
