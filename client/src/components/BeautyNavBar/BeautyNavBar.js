import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BeautyNavBar.css";
import logoApp from "./logo.png";

export default class BeautyNavBar extends Component {
  render() {
    return (
      <section className="navbar-wrapper">
        <div>
          <ul className="navbar-top-left">
            <li>
              <Link to="/">
                <img className="logoApp" src={logoApp} alt="logo App" />
              </Link>
            </li>
            <li>
              <Link to="/Search">Find Artist</Link>
            </li>
            <li>
              <Link to="/Profiles">Profile</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li style={{ float: "right" }}>
              <Link to="/logout">Logout</Link>
            </li>
            <li style={{ float: "right" }}>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
