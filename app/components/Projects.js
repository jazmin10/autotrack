/* Projects Component -  lists all cars for a particular user */

// Include the React library
import React from 'react';
import helpers from "./utils/helpers.js";

export default class Projects extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			cars: []
		}
	}

	componentDidMount() {

		helper.getProjectCars().then(response => {
			this.setState({ cars: response });
		})

	}

	render() {

    if (this.state.cars.length !== 0) {

      return (
        <div className="container">
          <div className="panel panel-default">

            <div className="panel-heading">
              <h3 className="panel-title"><strong>My Projects</strong></h3>
            </div>

            <div className="panel-body">

              {this.state.cars.map(search => {

                return (

                  <div className="well" key={i}>
                  	<p><strong>{search.cars.vin}<br/>
                  	{search.cars.year} {search.cars.make} {search.cars.model}</strong></p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      );
    }
}
