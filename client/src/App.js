import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import Profile from "./components/ProfileUser/Profile";
import AuthServices from "./Services/Services";

import Home from "./components/Home/Home";
import SearchArtist from "./components/SearchArtist/SearchArtist";
import NavBarBeauty from "./components/BeautyNavBar/BeautyNavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthServices();
  }

  getTheUser = userObj => {
    this.setState({ ...this.state, loggedInUser: userObj });
  };

  logout = e => {
    e.preventDefault();
    this.service.logout().then(() => {
      this.setState({
        loggedInUser: null
      });
    });
  };

  fetchUser = () => {
    this.service.loggedin().then(response => {
      this.setState({
        loggedInUser: response
      });
    });
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <NavBarBeauty {...this.state.loggedInUser} logout={this.logout} />
          <Switch>
            <Route
              exact
              path="/login"
              render={() => {
                return <Redirect to="/profile" />;
              }}
            />
            <Route
              exact
              path="/profile"
              render={() => (
                <Profile {...this.state.loggedInUser} logout={this.logout} />
              )}
            />
          </Switch>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <NavBarBeauty {...this.state.loggedInUser} logout={this.logout} />
          <Switch>
            <Route
              exact
              path="/login"
              render={() => (
                <Login {...this.state.loggedInUser} getUser={this.getTheUser} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => <Signup {...this.state.loggedInUser} />}
            />
            <Route
              exact
              path="/search"
              render={() => (
                <SearchArtist
                  {...this.state.loggedInUser}
                  getUser={this.getTheUser}
                />
              )}
            />
            <Route exact path="/" component={Home} />
            />
          </Switch>
        </React.Fragment>
      );
    }
  }
}

export default App;
