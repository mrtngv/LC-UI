import React from 'react';
import Navbar from './navbar/Navbar';
import Package from './packageSubmit/Package';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import TrackPackage from './packageTracker/TrackPackage';
import Offices from './offices/Offices';
import AboutCompany from './AboutCompany';
import AllPackages from './packageView/AllPackages';
import Login from './Login';
import Register from './Register';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   
    };
  }


  render() {
    return (
        <div>
        <Router>
          <Route path="/" component={Navbar} />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/package/ship" exact component={Package} />
            <Route path="/package/track" exact component={TrackPackage} />
            <Route path="/package/all" exact component={AllPackages} />
            <Route path="/offices" exact component={Offices} />
            <Route path="/company" exact component={AboutCompany} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;