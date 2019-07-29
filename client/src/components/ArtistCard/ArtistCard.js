import React, { Component } from "react";
import "./ArtistCard.css";

export default class ArtistCard extends Component {
  render() {
    return (
      <div className="card">
        {/* <img
          className="artist-pict"
          src={this.props.artistPict.photo_url}
          alt={this.props.artistPict.photo_name}
        /> */}
        <div className="container-card">
          <h4>
            <b>{this.props.name}</b>
          </h4>
          {/* {this.props.services.map((service, index) => {
            return (
              <p key={index} className="experience">
                service.name
              </p>
            );
          })} */}
          <p className="experience">{this.props.experience}</p>
        </div>
      </div>
    );
  }
}
