import React from 'react';
import Navbar from './Navbar';
import Package from './Package';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import TrackPackage from './TrackPackage';
import Offices from './Offices';
import AboutCompany from './AboutCompany';

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
            <Route path="/package/ship" exact component={Package} />
            <Route path="/package/track" exact component={TrackPackage} />
            <Route path="/offices" exact component={Offices} />
            <Route path="/company" exact component={AboutCompany} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;