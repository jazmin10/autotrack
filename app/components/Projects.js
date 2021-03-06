/* ========== PROJECTS COMPONENT ==========
  - lists all cars and their progressbars for a particular user
 */

// DEPENDENCIES -----------------------------

// Include the React library
import React from 'react';
// include helpers
import helpers from "./utils/helpers.js";
// include isEqual from lodash
import isEqual from 'lodash/isequal';
// include semicircle progressbar
import { SemiCircle } from "./react-progress.js";
// include react router
import { Link } from 'react-router';
import router, {browserHistory} from "react-router";

// PROJECTS -----------------------------

// create and export Projects component
export default class Projects extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			carList: "",
      carMaintenance: [],
      overallProgress: []
		}

    // bind functions
    this.calculateCategoryProgress = this.calculateCategoryProgress.bind(this);
    this.calculateOverallProgress = this.calculateOverallProgress.bind(this);
	}

  componentWillMount() {
    // this method initializes once the component is mounted

    if (localStorage.getItem("autotrackToken") === null) {
      // If there isn't a token in the local storage then redirect user to home page for login
      browserHistory.push("/");
    }
  }

	componentDidMount() {
    // method invoked immediately after component is mounted

		helpers.getProjectCars(localStorage.getItem("username")).then(response => {
      // Call helper function to get all of a particular user's cars.

      var newMaintenanceArr = [];

      var maintenanceArr = response.usercars.map((maintenanceRes, i) => {
        // map out the maintenance array of each of the user's cars

        maintenanceRes.maintenance.map((tasks) => {
          // map out each maintenance category's task category progress and set it to 0
          tasks.categoryProgress = 0;
        });

        newMaintenanceArr.push(maintenanceRes.maintenance);
      });

      this.setState({
        carList: response.usercars,
        carMaintenance:newMaintenanceArr
      });

		});

	}

  calculateCategoryProgress(){
    // method to calculate the progress of each category's progress

    var superBigMaintenanceArray = [];

    // loop through so that the category progress is calculated
    // for all cars
    for (var i = 0; i < this.state.carList.length; i++){

      var carMaintenanceArray = [];

      this.state.carMaintenance[i].map((maintask, k) => {
        // for each maintenance category, map out the tasks

        var taskProgress = 0;
        var numberOfTasks = maintask.tasks.length;

        for (let j=0; j < maintask.tasks.length; j++) {
          // get the sum of each task's completion
          taskProgress += maintask.tasks[j].completed;
        }

        // calculate categoryProgress by dividing taskProgress by numberOfTasks
        var categoryProgressNum = Number((taskProgress / numberOfTasks));

        var newObject = {
          category:maintask.category,
          tasks:maintask.tasks,
          categoryProgress:categoryProgressNum
        };

        carMaintenanceArray.push(newObject);
      });

      superBigMaintenanceArray.push(carMaintenanceArray);
    }

    // update the state with the up-to-date maintenance array
    this.setState({carMaintenance:superBigMaintenanceArray}, function(){
      this.calculateOverallProgress();
    });
  }

  calculateOverallProgress(){
    // method to calculate overall progress for each car
    var overallProgressArr = [];

    this.state.carMaintenance.map(carInfo => {
      // for each car maintenance category, keep track of the progress
      
      var sumProgress = 0;
      var calculatedProgress = 0;

      carInfo.map(category => {
        if(!isNaN(category.categoryProgress)) {
          sumProgress += category.categoryProgress;
        }
      });

      calculatedProgress = (sumProgress/carInfo.length);

      overallProgressArr.push(calculatedProgress);
    });

    this.setState({overallProgress:overallProgressArr});
  }

  componentDidUpdate(prevProps, prevState){
    // method every time the state updates

    if (!isEqual(prevState.overallProgress, this.state.overallProgress) ||
      !isEqual(prevState.carList, this.state.carList) ||
      !isEqual(prevState.carMaintenance, this.state.carMaintenance)
      ) {
      this.calculateCategoryProgress();
    }

  }

	render() {

    var containerStyle = {
      width:'300px',
      height:'150px'
    };

    if (this.state.carList === "") {
      return (
        <div></div>
      );
    }

	  // If carList is not empty, render list of cars.
    else if (this.state.carList.length !== 0) {

      return (

        <div className="panel-body projects-div">

          {
            this.state.carList.map((car, i) => {

            return (

              <div className="well projects-content" key={i}>
              
                {
                  this.state.overallProgress.map((progressbar,j) => {

                    if (progressbar == 1) {
                        var options = {
                          strokeWidth:2,
                          color: '#42f445'
                        };
                        var text = (progressbar * 100).toFixed(0) + "%";
                      }
                    else if (progressbar < 1 && progressbar >= .5) {
                      var options = {
                        strokeWidth:2,
                        color: '#fb1'
                      };
                      var text = (progressbar * 100).toFixed(0) + "%";
                    }
                    else if (progressbar < .5 && progressbar >= 0) {
                      var options = {
                        strokeWidth:2,
                        color: '#f44242'
                      };
                      var text = (progressbar * 100).toFixed(0) + "%";
                    }

                    else {
                      var options={
                        strokeWidth:2,
                        color:'#fff'
                      }
                      var text = "No tasks yet.";

                      progressbar = 1;
                    }

                    if (i == j){
                      return(

                          <SemiCircle
                            progress = {progressbar}
                            text={text}
                            options={options}
                            initialAnimate={true}
                            containerStyle={containerStyle}
                            containerClassName={'progressbar'}
                            key={j}
                          />

                      );
                    }  
                  })
                } 
                <h4 className="projects-h4"><strong>{car.year} {car.make} {car.model}</strong></h4>
                <br/>
                <Link to={"/dashboard-manager/profile/" + car.vin + "?token=" + localStorage.getItem("autotrackToken")} className="btn projects-btn">VIEW PROFILE</Link>
                
              </div>
            );
          })}
        </div>

      );
    }

    // If carList is empty, render message saying there are no cars to list.
    return(
      <div className="no-cars-div">
        <h2>You have no cars in your project list.</h2>
      </div>
      );
  }
}
