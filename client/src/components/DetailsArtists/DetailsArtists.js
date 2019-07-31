import React, { Component } from "react";
import "./DetailsArtists.css";
import axios from "axios";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import Popularity from "../Popularity/Popularity";

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
          <div className="header-detail-container">
            <h1>{this.state.artist.username} </h1>
            <Popularity mode="noneditable" value={this.state.artist.ranking} />
          </div>
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
                  - {element.serviceId.name} ({element.price} €)
                </p>
              );
            })}
          </fieldset>
          <br />
          <div className="comment-content">
            <Link key="1" to={`/newcomment/${this.props.match.params.id}`}>
              <button className="btn-write-comment">Write a comment</button>
            </Link>
            <Comment
              user={"prueba"}
              valoration={1}
              creation_date={"10/10/2019"}
              title={"primer comentario"}
              comment={"fue uan pasada de servicio y repitiré"}
            />
          </div>
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
