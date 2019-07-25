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
        {this.props.areyouLogged && (
          <h1>
            {this.props.areyouLogged.username} {this.props.areyouLogged.role}
          </h1>
        )}
        <div>
          <ul className="navbar-top-right">
            {!this.props.areyouLogged && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {this.props.areyouLogged && (
              <li>
                <img
                  className="logoutApp"
                  src={logoutApp}
                  alt="logout App"
                  onClick={() => this.props.logout()}
                />
              </li>
            )}
          </ul>
        </div>
      </section>
    );
  }
}
