import React, { Component } from "react";
import "./Profile.css";
import SearchCity from "../SearchCity/SearchCity";
import SearchServices from "../SearchServices/SearchServices";
import Axios from "axios";

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userFormDetails: {
        username: "",
        password: "",
        email: "",
        services: [],
        experience: "",
        city: "",
        listOfServices: [],
        service: []
      }
    };
  }

  getAllServices = () => {
    Axios.get(`http://localhost:5000/services/list`).then(responseFromApi => {
      this.setState({
        ...this.state,
        listOfServices: [...responseFromApi.data]
      });
    });
  };

  componentDidMount() {
    this.getAllServices();
    this.setState({
      ...this.state,
      userFormDetails: {
        ...this.state.userFormDetails,
        username: this.props.username,
        password: "",
        email: this.props.email,
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

  citySelected(city) {
    this.setState({ ...this.state, city: city.value });
  }
  ServiceSelected(value) {
    this.setState({ ...this.state, service: value });
  }

  render() {
    return (
      <div className="profile-form">
        <form className="form-wrapper">
          <h1>Welcome to your profile: {this.props.username} </h1>
          <fieldset className="fieldset-wrapper">
            <input
              className="fields-of-form"
              type="text"
              placeholder="please write your username"
              value={this.state.userFormDetails.username}
              onChange={e => this.handleFormChange(e, "username")}
            />
            <input
              className="fields-of-form"
              type="text"
              placeholder="please write your email"
              value={this.state.userFormDetails.email}
              onChange={e => this.handleFormChange(e, "email")}
            />
            <input
              className="fields-of-form"
              type="password"
              placeholder="please write your password"
              value={this.state.userFormDetails.password}
              onChange={e => this.handleFormChange(e, "password")}
            />
            <input
              className="fields-of-form"
              type="text"
              placeholder="please write your experience"
              value={this.state.userFormDetails.experience}
              onChange={e => this.handleFormChange(e, "experience")}
            />

            <SearchCity
              className="fields-of-form"
              filterCity={e => this.citySelected(e)}
            >
              {this.state.city}>
            </SearchCity>

            <SearchServices
              AllServices={this.state.listOfServices}
              filterService={e => this.ServiceSelected(e)}
            />
          </fieldset>
          <button onClick={e => this.submitForm(e)}>Submit this form!</button>
        </form>
      </div>
    );
  }
}
