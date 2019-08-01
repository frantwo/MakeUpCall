import React, { Component } from "react";
import "./ArtistCard.css";

export default class ArtistCard extends Component {
  render() {
    return (
      <div className="card">
        <img
          className="artist-pict"
          src={this.props.artistPict.photo_url}
          alt={this.props.artistPict.photo_name}
        />
        <div className="container-card">
          <h4 className="name-artist">{this.props.name}</h4>
          {this.props.services.map((service, index) => {
            return (
              <p key={index} className="services-artist">
                - {service.serviceId.name}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}
