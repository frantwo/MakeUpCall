import React, { Component } from "react";
import "./ArtistCard.css";

export default class ArtistCard extends Component {
  render() {
    return (
      <div className="card">
        <img
          className="artist-pict"
          src="http://farfallahair.com/wp-content/uploads/strikingr/images/3366_Emily-pic-1-369x410.jpg"
          alt="Avatar"
        />
        <div className="container-card">
          <h4>
            <b>Jane Doe</b>
          </h4>
          <p className="experience">
            Y hablando de estilos de maquillaje, hoy en día muchas empresas son
            flexibles en cuanto a este tema, por lo que tenemos un rango
            bastante
          </p>
        </div>
      </div>
    );
  }
}
