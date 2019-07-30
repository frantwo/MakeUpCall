import React, { Component } from "react";
import "./ListOfCards.css";
import ArtistCard from "../ArtistCard/ArtistCard";
import { Link } from "react-router-dom";

export default class ListOfCards extends Component {
  render() {
    return (
      <div className="wrapper-cards">
        {this.props.listofartists.map((oneartist, index) => {
          if (oneartist.role === "Artist") {
            return (
              <Link key={oneartist._id} to={`/details/${oneartist._id}`}>
                <ArtistCard
                  name={oneartist.username}
                  artistPict={oneartist.pictures[0]}
                  experience={oneartist.experience}
                  services={oneartist.services}
                  artist={oneartist}
                />
              </Link>
            );
          }
        })}
      </div>
    );
  }
}
