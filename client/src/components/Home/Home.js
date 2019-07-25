import React, { Component } from "react";
import backgroundPict from "./backgroundPic.png";
import "./Home.css";
import NavBarBeauty from "../BeautyNavBar/BeautyNavBar";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBarBeauty />
        <div className="bodyApp">
          <img
            className="backgroundPict"
            src={backgroundPict}
            alt="Background App"
          />

          {/* <div>
            <h2>Responsive Topnav Example</h2>
            <p>
              This example use media queries to stack the topnav vertically when
              the screen size is 600px or less.
            </p>
            <p>
              You will learn more about media queries and responsive web design
              later in our CSS Tutorial.
            </p>
            <h4>Resize the browser window to see the effect.</h4>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
