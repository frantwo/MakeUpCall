import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BeautyNavBar.css";
import logoApp from "./logo.png";
import logoutApp from "./logout.png";
import profileBtn from "./profile.png";

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
          </ul>
        </div>

        <div>
          {this.props.infouser && console.log(this.props.infouser.role)}
          {this.props.infouser && (
            <ul className="navbar-top-right">
              <li>
                <h4>Welcome {this.props.infouser.username}</h4>
              </li>
              <li>
                {this.props.infouser.role === "Artist" && (
                  <Link to="/profile">
                    <img
                      className="profile-btn"
                      src={profileBtn}
                      alt="Profile Artist"
                    />
                  </Link>
                )}
                {this.props.infouser.role === "User" && (
                  <Link to="/profile">
                    <img
                      className="profile-btn"
                      src={profileBtn}
                      alt="Profile User"
                    />
                  </Link>
                )}
              </li>
              <li>
                <img
                  className="logoutApp"
                  src={logoutApp}
                  alt="logout App"
                  onClick={() => this.props.logout()}
                />
              </li>
            </ul>
          )}
          {!this.props.infouser && (
            <ul className="navbar-top-right">
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    );
  }
}
