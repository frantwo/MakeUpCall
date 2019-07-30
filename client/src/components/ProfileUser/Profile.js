import React, { Component } from "react";
import "./Profile.css";
import FormArtist from "../FormArtist/FormArtist";

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
          city={this.props.city}
          updateUserHandler={newArtist => this.updateUser(newArtist)}
          pictures={this.props.pictures}
          logout={this.props.logout}
        />
      </div>
    );
  }
}
