import React, { Component } from "react";
import "./DetailsArtists.css";
import axios from "axios";

export default class DetailsArtists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: {}
    };
  }

  componentDidMount() {
    this.findDetails();
  }

  findDetails = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/artists/getDetails/${
          this.props.match.params.id
        }`
      )
      .then(artist => {
        this.setState({
          ...this.state,
          artist: artist.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="details-container">
        <div className="info-container">
          <h1>{this.state.artist.username} </h1>
          <fieldset className="fieldset-details-wrapper">
            <label>email:</label>
            <input
              disabled
              className="fields-details"
              type="text"
              value={this.state.artist.email}
            />
            <label>Ciudad:</label>
            <input
              disabled
              className="fields-details"
              type="text"
              value={this.state.artist.city}
            />
            <label>
              Experiencia:
              <textarea
                className="fields-details"
                rows="5"
                cols="10"
                value={this.state.artist.experience}
              />
            </label>
          </fieldset>
        </div>
        <div className="pictures-container">
          <h2>lista imagenes</h2>
        </div>
      </div>
    );
  }
}
