import React, { Component } from "react";
import AuthServices from "../../Services/Services";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import NavBarBeauty from "../BeautyNavBar/BeautyNavBar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthServices();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    debugger;
    this.service
      .login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
        debugger;
        this.props.getUser(response);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="login-wapper">
          <h1>Start Session in MakeUpCall</h1>
          <form id="login-form" onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={e => this.handleChange(e)}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={e => this.handleChange(e)}
            />
            {/* <input type="submit" value="Login" /> */}
            <button type="submit" form="login-form">
              Login
            </button>
          </form>
          <p>
            Don't have account?
            <Link to={"/signup"}> Create account</Link>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
