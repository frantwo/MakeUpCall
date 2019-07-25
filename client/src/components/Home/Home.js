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
        </div>
      </React.Fragment>
    );
  }
}
