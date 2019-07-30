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
        `http://localhost:5000/artists/getDetails/${this.props.match.params.id}`
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
    console.log(this.props.match.params.id);
    return (
      <div className="details-container">
        <div className="info-container">
          <h1>{this.state.artist.username} </h1>
          <fieldset className="fieldset-details-wrapper">
            <label>
              email:
              <input
                className="fields-details"
                type="text"
                value={this.state.artist.email}
              />
            </label>
            <label>
              Ciudad:
              <input
                className="fields-details"
                type="text"
                value={this.state.artist.city}
              />
            </label>
            <label>
              Experiencia:
              <textarea className="fields-details" rows="5" cols="10">
                {this.state.artist.experience}
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
