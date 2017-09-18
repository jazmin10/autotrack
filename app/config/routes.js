// Include the React library
import React from 'react';

// Include the react-router module
import router from 'react-router';

// Include the Route component for displaying individual routes
// Include the Router component to contain all our Routes
// Include the hashHistory prop to handle routing client side without a server
// Include browserHistory - https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
// Include IndexRoute (catch-all route)
import router, {Route, Router, hashHistory, browserHistory, IndexRoute} from "react-router";
// Reference the high-level components
import Main from '../components/Main';
import Splash from '../components/Splash';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import Masterlist from '../components/Masterlist';
import Add from '../components/Add';

// Export the Routes
export default (

  // The high level component is the Router component
  <Router history={hashHistory}>

    <Route path="/" component={Main}>

      <Route path="dashboard-manager" component={Dashboard}>

        <Route path="masterlist" component={Masterlist} />
        <Route path="my-projects" component={Projects} />
        <Route path="add-car" component={Add} />

        <Route path="profile/:vin" component={Profile} />

        <IndexRoute component={Projects} />

      </Route>

      <Route path="login" component={Login} />   
  
      <IndexRoute component={Splash} />  

    </Route>
  </Router>
);