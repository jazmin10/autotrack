/* Main Component -  wrapper */

// Include the React library
import React from 'react';
import helpers from "./utils/helpers.js";

// Creates and exports the Main component
export default class Main extends React.Component {

  // Initial state setup
  constructor(props){
    super(props);
  }

  // Render the component: displays navbar and jumbotron
  render() {

    return (
      <div className="container">
        <div>
          {/* Display children components */}
          {this.props.children}
        </div>

      </div>
    );
  }
}


