/* Masterlist Component -  lists of all cars saved in the cars collection */

// Include the React library
import React from 'react';
import helper from "./utils/helpers.js";

export default class Masterlist extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			masterlist: []
		}
	}

	componentDidMount() {

		helper.getMasterlist().then(response => {
      this.setState({masterlist: response});
		});

	}

	render() {

    if (this.state.masterlist.length !== 0) {

      return (
        <div className="container">
          <div className="panel panel-default">

            <div className="panel-heading">
              <h3 className="panel-title"><strong>My Projects</strong></h3>
            </div>

            <div className="panel-body">

              {this.state.masterlist.map((car, i) => {

                return (

                  <div className="well" key={i}>
					<h4><strong>{car.year} {car.make} {car.model}</strong></h4><button type="button" class="btn btn-secondary float-right">View Profile</button>
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
