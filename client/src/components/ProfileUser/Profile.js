import React, { Component } from "react";
import "./Profile.css";
import FormArtist from "../FormArtist/FormArtist";
import Axios from "axios";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <FormArtist
          idUser={this.props._id}
          username={this.props.username}
          email={this.props.email}
          password={this.props.password}
          experience={this.props.experience}
          updateUserHandler={newArtist => this.updateUser(newArtist)}
        />
      </div>
    );
  }
}
