import React, { Component } from "react";
import "./DetailsArtists.css";
import axios from "axios";

export default class DetailsArtists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: {
        username: "",
        email: "",
        city: "",
        experience: "",
        services: [],
        pictures: []
      }
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
            <label>Email:</label>
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
            <label>Experiencia:</label>
            <textarea
              disabled
              className="fields-details"
              rows="5"
              cols="10"
              value={this.state.artist.experience}
            />
            <label>Servicios</label>
            {this.state.artist.services.map((element, index) => {
              return (
                <p key={index}>
                  {element._id} ({element.price} €)
                </p>
              );
            })}
          </fieldset>
        </div>
        <div className="pictures-container">
          <h3>Works:</h3>
          <div className="container-pict">
            {this.state.artist.pictures.map((onepict, index) => {
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
