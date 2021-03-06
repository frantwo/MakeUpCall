import React, { Component } from "react";
import "./FormArtist.css";
import SearchCity from "../SearchCity/SearchCity";
import SearchServices from "../SearchServices/SearchServices";
import Axios from "axios";
import FormPictures from "../FormPictures/FormPictures";

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userFormDetails: {
        _id: "",
        username: "",
        password: "",
        email: "",
        services: [],
        experience: "",
        city: "",
        listOfServices: [],
        service: [],
        pictures: []
      }
    };
  }

  getAllServices = () => {
    Axios.get(`${process.env.REACT_APP_URL}/services/list`).then(
      responseFromApi => {
        this.setState({
          ...this.state,
          userFormDetails: {
            ...this.state.userFormDetails,
            listOfServices: [...responseFromApi.data]
          }
        });
      }
    );
  };

  componentDidMount() {
    this.getAllServices();
    this.setState({
      ...this.state,
      userFormDetails: {
        ...this.state.userFormDetails,
        _id: this.props.idUser,
        username: this.props.username,
        password: "",
        email: this.props.email,
        services: [],
        experience: this.props.experience,
        city: this.props.city,
        pictures: this.props.pictures
      },
      allFormFilled: true,
      updatedFinished: false
    });
  }

  handleFormChange(e, field) {
    let newState = { ...this.state };
    newState.userFormDetails[field] = e.target.value;
    this.setState(newState);
  }

  deleteArtist(e) {
    e.preventDefault();
    let currentUserId = this.state.userFormDetails._id;

    Axios.delete(
      `${process.env.REACT_APP_URL}/artists/delete/` + currentUserId
    ).then(deletedInfo => {
      console.log(deletedInfo);
      this.props.logout();
    });
  }

  submitForm(e) {
    e.preventDefault();

    if (
      this.state.userFormDetails.password === "" ||
      this.state.userFormDetails.city === "" ||
      this.state.userFormDetails.services.length === 0
    ) {
      let newState = { ...this.state };
      newState.allFormFilled = false;

      return this.setState(newState);
    }

    // this.props.updateUserHandler(this.state.userFormDetails);

    // then we can use axios to communicate with our API to record this data for example
    // axios.put("http://localhost:3000/employeeDetails", this.state.userFormDetails).then
    Axios.put(
      `${process.env.REACT_APP_URL}/artists/update`,
      this.state.userFormDetails
    ).then(updatedUser => {
      console.log(updatedUser);
      let newState = { ...this.state };
      newState.allFormFilled = true;
      newState.updatedFinished = true;
      this.setState(newState);
    });
  }

  citySelected(city) {
    let newState = { ...this.state };
    newState.userFormDetails.city = city.value;
    this.setState(newState);
  }

  ServiceSelected(value) {
    this.setState({
      ...this.state,
      userFormDetails: {
        ...this.state.userFormDetails,
        services: value
      }
    });
  }

  render() {
    return (
      <div className="profile-form">
        <div className="form-wrapper">
          <form>
            <h1>Welcome to your profile: {this.props.username} </h1>
            <fieldset className="fieldset-wrapper">
              <input
                className="fields-of-form"
                type="hidden"
                name="_id"
                value={this.state.userFormDetails._id}
                onChange={e => this.handleFormChange(e, "username")}
              />
              <input
                className="fields-of-form"
                name="username"
                type="text"
                placeholder="please write your username"
                value={this.state.userFormDetails.username}
                onChange={e => this.handleFormChange(e, "username")}
              />
              <input
                className="fields-of-form"
                name="email"
                type="email"
                placeholder="please write your email"
                value={this.state.userFormDetails.email}
                onChange={e => this.handleFormChange(e, "email")}
              />
              <input
                className="fields-of-form"
                name="password"
                type="password"
                placeholder="please write your password"
                value={this.state.userFormDetails.password}
                onChange={e => this.handleFormChange(e, "password")}
              />
              <input
                className="fields-of-form"
                name="experience"
                type="text"
                placeholder="please write your experience"
                value={this.state.userFormDetails.experience}
                onChange={e => this.handleFormChange(e, "experience")}
              />

              <SearchCity
                className="field-city"
                name="city"
                filterCity={e => this.citySelected(e)}
                defaultValue={this.state.userFormDetails.city}
              >
                {this.state.city}>
              </SearchCity>
              <br />
              <SearchServices
                className="field-service"
                name="services"
                AllServices={this.state.userFormDetails.listOfServices}
                filterService={e => this.ServiceSelected(e)}
              />
              <div className="buttons-account">
                <button onClick={e => this.submitForm(e)}>
                  UPDATE ACCOUNT
                </button>
                <button onClick={e => this.deleteArtist(e)}>
                  REMOVE ACCOUNT
                </button>
              </div>
            </fieldset>
          </form>
          {!this.state.allFormFilled && (
            <p className="error">You must fill all fields</p>
          )}
          {this.state.updatedFinished && (
            <p className="updatedFinished">Update finished succesfully!</p>
          )}
        </div>
        <div className="pictures-wrapper">
          <FormPictures userID={this.state.userFormDetails._id} />
          <h3>List:</h3>
          <div className="container-pict">
            {this.state.userFormDetails.pictures.map((onepict, index) => {
              return (
                <img
                  className="mini-pict"
                  key={onepict._id}
                  src={onepict.photo_url}
                  alt={onepict.photo_name}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
