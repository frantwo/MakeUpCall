import React, { Component } from "react";
import "./ListOfCards.css";
import ArtistCard from "../ArtistCard/ArtistCard";

export default class ListOfCards extends Component {
  render() {
    return (
      <div className="wrapper-cards">
        {this.props.listofartists.map((oneartist, index) => {
          if (oneartist.role === "Artist") {
            return (
              <ArtistCard
                key={oneartist._id}
                name={oneartist.username}
                artistPict={oneartist.pictures[0]}
                experience={oneartist.experience}
                services={oneartist.services}
                artist={oneartist}
                ShowDetails={oneartist => this.props.ShowDetails(oneartist)}
              />
            );
          }
        })}
      </div>
    );
  }
}
