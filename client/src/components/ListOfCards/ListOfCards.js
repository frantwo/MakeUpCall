import React, { Component } from "react";
import "./ListOfCards.css";
import ArtistCard from "../ArtistCard/ArtistCard";

export default class ListOfCards extends Component {
  render() {
    return (
      <div className="wrapper-cards">
        {Array(8)
          .fill()
          .map((one, index) => {
            return (
              <ArtistCard
                key={index}
                name="Pepita"
                experience="Muchos años trabajando de ésto, he maquillado al Sr. Hurtado en todos sus programas."
              />
            );
          })}
      </div>
    );
  }
}
