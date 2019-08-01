import React, { Component } from "react";
import backgroundPict from "./backgroundPic.png";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="bodyApp">
          <img
            className="backgroundPict"
            src={backgroundPict}
            alt="Background App"
          />
          <p className="text-intro">
            MakeUp&amp;Call es una web que permite ponerte en contacto con los
            artistas del maquillaje de tu ciudad, para que vayan a tu casa
            cuando los necesites. Filtra por los servicios que estés buscando,
            consulta las opiniones de nuestros usuarios y encuentra a uno de los
            muchos artistas que tenemos a tu disposición.
          </p>
        </div>
      </React.Fragment>
    );
  }
}
