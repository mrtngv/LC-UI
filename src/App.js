import React from 'react';
import Navbar from './navbar/Navbar';
import Package from './packageSubmit/Package';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TrackPackage from './packageTracker/TrackPackage';
import Offices from './offices/Offices';
import AboutCompany from './AboutCompany';
import AllPackages from './packageView/AllPackages';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import EditAllPackages from './packageView/EditAllPackages';
import AllUsers from './AllUsers';
import Statistics from './Statistics';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "NO_ROLE"
    };
  }

  componentDidMount() {
    try {
      const role = JSON.parse(sessionStorage.getItem('user')).role;
      this.setState({
        role: role
      })
    }
    catch (e) { }
  }

  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Navbar} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/package/ship" exact component={Package} />
            <Route path="/package/track" exact component={TrackPackage} />
            {this.state.role !== "NO_ROLE" ?
              <Route path="/package/all" exact component={AllPackages} /> : null}
            {this.state.role !== "ROLE_CLIENT" ?
              <Route path="/package/edit" exact component={EditAllPackages} /> : null}
            {this.state.role === "ROLE_MODERATOR" ?
              <Route path="/users" exact component={AllUsers} /> : null}
            {this.state.role === "ROLE_MODERATOR" ?
              <Route path="/statistic" exact component={Statistics} /> : null}
            <Route path="/offices" exact component={Offices} />
            <Route path="/company" exact component={AboutCompany} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;