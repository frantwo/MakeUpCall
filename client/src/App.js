import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import Profile from "./components/ProfileUser/Profile";
import AuthServices from "./Services/Services";
import { withRouter } from "react-router";

import Home from "./components/Home/Home";
import SearchArtist from "./components/SearchArtist/SearchArtist";
import NavBarBeauty from "./components/BeautyNavBar/BeautyNavBar";
import DetailsArtist from "./components/DetailsArtists/DetailsArtists";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      oneartist: null
    };
    this.service = new AuthServices();
  }

  getTheUser = userObj => {
    this.setState({ ...this.state, loggedInUser: userObj });
  };

  logout = e => {
    this.service.logout().then(() => {
      this.props.history.push("/");

      this.setState({
        loggedInUser: null
      });
    });
  };

  login = (username, password) => {
    this.service
      .login(username, password)
      .then(response => {
        this.props.history.push("/profile");

        this.setState({
          loggedInUser: response
        });
      })
      .catch(error => {
        this.setState({
          loggedInUser: null,
          loginError: error.response.data.message
        });
      });
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.service.loggedin().then(response => {
      if (response.username) {
        this.setState({
          loggedInUser: response
        });
        this.props.history.push("/");
      }
    });
  };

  updateUserHandler = useUpdated => {
    console.log("AHORA ACTUALIZA LOS DATOS EN EL SERVIDOR!!!");
    console.log(useUpdated);
  };
  ShowDetails(oneartist) {
    this.setState({ ...this.state, oneartist: oneartist });
    this.props.history.push("/details");
  }

  render() {
    console.log("ENRUTADOR MÁS ENRUTADO");
    console.log(this.state.oneartist);
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <NavBarBeauty
            infouser={this.state.loggedInUser}
            logout={this.logout}
          />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              exact
              path="/profile"
              render={() => (
                <Profile
                  {...this.state.loggedInUser}
                  logout={this.logout}
                  updateUserHandler={e => this.updateUserHandler(e)}
                />
              )}
            />
            {/* <Route exact path="/search" component={SearchArtist} /> */}
            <Route exact path="/search" render={() => <SearchArtist />} />

            <Route
              exact
              path="/details/:id"
              render={props => (
                <DetailsArtist {...props} artistinfo={this.state.oneartist} />
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
                <Login
                  {...this.state.loggedInUser}
                  getUser={this.getTheUser}
                  login={this.login}
                  error={this.state.loginError}
                />
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
            <Route
              exact
              path="/details/:id"
              render={props => (
                <DetailsArtist {...props} artistinfo={this.state.oneartist} />
              )}
            />
            <Route exact path="/" component={Home} />
          </Switch>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(App);
