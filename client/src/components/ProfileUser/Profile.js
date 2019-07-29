import React, { Component } from "react";
import "./Profile.css";

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userFormDetails: {
        username: "",
        password: "",
        services: [],
        experience: "",
        city: ""
      }
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      userFormDetails: {
        ...this.state.userFormDetails,
        username: this.props.username,
        // password: "",
        // services: [],
        experience: this.props.experience,
        city: this.props.city
      }
    });
  }

  handleFormChange(e, field) {
    let newState = { ...this.state };
    newState.userFormDetails[field] = e.target.value;
    this.setState(newState);
  }

  submitForm(e) {
    e.preventDefault();

    this.props.updateUserHandler(this.state.userFormDetails);

    // then we can use axios to communicate with our API to record this data for example
    // axios.put("http://localhost:3000/employeeDetails", this.state.userFormDetails).then
  }
  render() {
    return (
      <div className="profile-form">
        <form className="form-wrapper">
          <h1>Welcome to your profile: {this.props.username} </h1>
          <fieldset className="fieldset-wrapper">
            <input
              type="text"
              placeholder="please write your username"
              value={this.state.userFormDetails.username}
              onChange={e => this.handleFormChange(e, "username")}
            />
            <input
              type="password"
              placeholder="please write your password"
              value={this.state.userFormDetails.password}
              onChange={e => this.handleFormChange(e, "password")}
            />
            <input
              type="text"
              placeholder="please write your experience"
              value={this.state.userFormDetails.experience}
              onChange={e => this.handleFormChange(e, "experience")}
            />
            <input
              type="text"
              placeholder="please write your city"
              value={this.state.userFormDetails.age}
              onChange={e => this.handleFormChange(e, "city")}
            />
          </fieldset>
          <button onClick={e => this.submitForm(e)}>Submit this form!</button>
        </form>
      </div>
    );
  }
}
