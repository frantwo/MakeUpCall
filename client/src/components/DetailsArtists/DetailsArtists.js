import React, { Component } from "react";
import "./DetailsArtists.css";

export default class DetailsArtists extends Component {
  render() {
    return (
      <div className="info-container">
        <div>
          <h1>Profile info of {this.props.artistinfo.username} </h1>
          <fieldset className="fieldset-details-wrapper">
            <label>
              email:
              <input
                className="fields-details"
                type="text"
                value={this.props.artistinfo.email}
              />
            </label>
            <label>
              Ciudad:
              <input
                className="fields-details"
                type="text"
                value={this.props.artistinfo.city}
              />
            </label>
            <label>
              Experiencia:
              <textarea className="fields-details" rows="5" cols="10">
                {this.props.artistinfo.experience}
              </textarea>
            </label>
          </fieldset>
        </div>
        <div>
          <h2>lista imagenes</h2>
        </div>
      </div>
    );
  }
}
