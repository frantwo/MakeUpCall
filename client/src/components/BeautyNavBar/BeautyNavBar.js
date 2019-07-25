import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BeautyNavBar.css";
import logoApp from "./logo.png";
import logoutApp from "./logout.png";

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
              <Link to="/search">Find Artist</Link>
            </li>
            <li>
              <Link to="/profiles">Profile</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="navbar-top-right">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">
                <img className="logoutApp" src={logoutApp} alt="logout App" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
