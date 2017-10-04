/* ========== MAIN COMPONENT ==========
  - wrapper for all other components
*/

// DEPENDENCIES 
// =====================================================
// Include the React library
import React from 'react';
import helpers from "./utils/helpers.js";

// MAIN COMPONENT
// =====================================================
// Creates and exports the Main component
export default class Main extends React.Component {

  // Initial state setup
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="container">
        <div className="main-container">
          {/* Display children components */}
          {this.props.children}
        </div>

      </div>
    );
  }
}


