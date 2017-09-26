/* ========== MASTERLIST COMPONENT ==========
  - lists of all cars saved in the cars collection
  and their progressbars
 */

// DEPENDENCIES -----------------------------

// Include the React library
import React from 'react';
import helpers from "./utils/helpers.js";
import { Link } from 'react-router';
import isEqual from 'lodash/isequal';
import { SemiCircle } from "./react-progress.js";

import router, {browserHistory} from "react-router";

// MASTERLIST -----------------------------
export default class Masterlist extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			masterlist: [],
      carMaintenance:[],
      overallProgress: []
		}

    this.calculateCategoryProgress = this.calculateCategoryProgress.bind(this);
    this.calculateOverallProgress = this.calculateOverallProgress.bind(this);
	}

  // If there isn't a token in the local storage then redirect user to home page for login
  componentWillMount() {
    if (localStorage.getItem("autotrackToken") === null) {
      browserHistory.push("/");
    }
  }

	componentDidMount() {
    // method invoked immediately after component is mounted

		helpers.getMasterlist().then(response => {
      // helper to get info for masterlist

      var newMaintenanceArr = [];

      var maintenanceArr = response.map((maintenanceRes, j) => {

        maintenanceRes.maintenance.map((tasks) => {
          tasks.categoryProgress = 0;
        });

        newMaintenanceArr.push(maintenanceRes.maintenance);
      });

      this.setState({
        masterlist: response, 
        carMaintenance:newMaintenanceArr
      }); 
     
		});
  }

  calculateCategoryProgress(){
    // method to calculate the progress of each category's progress
    
    var superBigMaintenanceArray = [];

    // loop through so that the category progress is calculated
    // for all cars 
    for (var i = 0; i < this.state.masterlist.length; i++){
      
      var carMaintenanceArray = [];
      
      this.state.carMaintenance[i].map((maintask, k) => {
        var taskProgress = 0;
        var numberOfTasks = maintask.tasks.length;

        for (let j=0; j < maintask.tasks.length; j++) {
          // get the sum of each task's completion
          taskProgress += maintask.tasks[j].completed;
        }

        // calculate categoryProgress by dividing taskProgress by numberofTasks
        var categoryProgressNum = Number((taskProgress / numberOfTasks));        

        var newObject ={
          category:maintask.category,
          tasks:maintask.tasks,
          categoryProgress:categoryProgressNum
        };

        carMaintenanceArray.push(newObject);

      });

      superBigMaintenanceArray.push(carMaintenanceArray);
    }

      this.setState({carMaintenance:superBigMaintenanceArray}, function(){
        this.calculateOverallProgress();

      });
  }

  calculateOverallProgress(){
    // method to calculate overall progress for each car
    var overallProgressArr = [];

    this.state.carMaintenance.map(carInfo => {
      var sumProgress = 0;
      var calculatedProgress = 0;

      carInfo.map(category => {
        if (!isNaN(category.categoryProgress)) {
          sumProgress += category.categoryProgress;
        }
      });

      calculatedProgress = (sumProgress/carInfo.length);
  
      overallProgressArr.push(calculatedProgress); 
    });

    this.setState({overallProgress: overallProgressArr});
  }

  componentDidUpdate(prevProps, prevState){
    // method every time the state updates

    if (!isEqual(prevState.overallProgress, this.state.overallProgress) ||
      !isEqual(prevState.masterlist, this.state.masterlist) ||
      !isEqual(prevState.carMaintenance, this.state.carMaintenance)) {

      this.calculateCategoryProgress();
        
    }
  }

	render() {

    var containerStyle = {
      width:'350px',
      height:'200px'
    };

    if (this.state.masterlist.length !== 0) {

      return (

            <div className="panel-body">

            {
              this.state.masterlist.map((car, i) => {
                  return (

                    <div className="well" key={i}>
                      <h4><strong>{car.year} {car.make} {car.model}</strong></h4><Link to={"/dashboard-manager/profile/" + car.vin + "?token=" + localStorage.getItem("autotrackToken")} className="btn btn-primary"> View Profile</Link>
                
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
                              color:'#262525'
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
                                  containerClassName={'.progressbar'}
                                  key={j}
                                />
                            );
                          }
                        })
                      }

                  </div>

                  );
              })
            }
            
            </div>

      );
    }

    return(
      <div>
        <h2>There are no cars in the masterlist.</h2>
      </div>);
  }
}
