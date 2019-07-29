import React, { Component } from "react";
import "./ListOfCards.css";
import ArtistCard from "../ArtistCard/ArtistCard";

export default class ListOfCards extends Component {
  render() {
    return (
      <div className="wrapper-cards">
        {this.props.listofartists.map((oneartist, index) => {
          console.log("ESTO ES LO QUE VA AL ARTIST CARD");
          console.log(oneartist);
          return (
            <ArtistCard
              key={index}
              name={oneartist.username}
              artistPict={oneartist.pictures[0]}
              experience={oneartist.experience}
              services={oneartist.services}
            />
          );
        })}
      </div>
    );
  }
}
