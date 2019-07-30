import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthServices from "../../Services/Services";
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", role: "", email: "" };
    this.service = new AuthServices();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const role = this.state.role;
    const email = this.state.email;

    this.service
      .signup(username, password, role, email)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          email: "",
          role: ""
        });
        // this.props.getUser(response)
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log({ [name]: value });
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="signup-wapper">
          <h1>Welcome to MakeUpCall</h1>
          <form id="signup-form" onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={e => this.handleChange(e)}
            />
            <input
              type="text"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={e => this.handleChange(e)}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={e => this.handleChange(e)}
            />
            <div className="role-wrapper">
              <label className="role-label">Role: </label>
              <label className="container">
                User
                <input
                  type="radio"
                  checked="checked"
                  name="role"
                  value="User"
                  onChange={e => this.handleChange(e)}
                />
                <span className="checkmark" />
              </label>
              <label className="container">
                Artist
                <input
                  type="radio"
                  name="role"
                  value="Artist"
                  onChange={e => this.handleChange(e)}
                />
                <span className="checkmark" />
              </label>
            </div>
            <button type="submit" form="signup-form">
              Create Account
            </button>
          </form>
          <p>
            Already have account?
            <Link to={"/login"}> Login</Link>
          </p>
        </div>
      </React.Fragment>
    );
  }
}
