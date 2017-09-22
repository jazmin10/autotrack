// Include the React library
import React from 'react';

// Include the react-router module
// import router from 'react-router';

// Include the Route component for displaying individual routes
// Include the Router component to contain all our Routes
// Include the hashHistory prop to handle routing client side without a server
// Include browserHistory - https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
// Include IndexRoute (catch-all route)
import router, {Route, Router, browserHistory, IndexRoute} from "react-router";

// Reference the high-level components
import Main from '../components/Main.js';
import Splash from '../components/Splash.js';
import Dashboard from '../components/Dashboard.js';
import Profile from '../components/Profile.js';
import Projects from '../components/Projects.js';
import Masterlist from '../components/Masterlist.js';
// import Add from '../components/Add.js';

// Export the Routes
export default (

  // The high level component is the Router component
  <Router history={browserHistory}>

   <Route path="/" component={Main}>

       <Route path="dashboard-manager" component={Dashboard}>
        
          <Route path="masterlist" component={Masterlist} />
          <Route path="my-projects" component={Projects} />
           {/*<Route path="add-car" component={Add} /> */}

          <Route path="profile/:vin" component={Profile} />

         <IndexRoute component={Projects} /> 
       </Route>

      { <IndexRoute component={Splash} /> }
    </Route>
  </Router>
);

