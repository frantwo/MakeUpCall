import React, { Component } from "react";
import "./FormEmail.css";
import axios from "axios";

export default class FormEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistID: "",
      artistName: "",
      emailArtist: "",
      emailUser: "",
      subject: "",
      textEmail: "",
      emailSentSucess: false
    };
  }

  sendEmail(e) {
    e.preventDefault();
    console.log("voy a acceder a la api");
    console.log(
      `${process.env.REACT_APP_URL}/artists/contact/${
        this.props.match.params.id
      }`
    );
    axios
      .post(`${process.env.REACT_APP_URL}/artists/contact`, this.state)
      .then(emailResponse => {
        this.setState({
          ...this.state,
          emailSentSucess: emailResponse.data.emailSent
        });
      })
      .catch(err => console.log(err));
  }

  findDetails = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/artists/getDetails/${
          this.props.match.params.id
        }`
      )
      .then(artist => {
        this.setState({
          ...this.state,
          artistName: artist.data.username,
          artistID: this.props.match.params.id,
          emailArtist: artist.data.email,
          emailUser: this.props.user.email
        });
      })
      .catch(err => console.log(err));
  };

  handleFormChange(e, field) {
    let newState = { ...this.state };
    newState[field] = e.target.value;
    newState["emailSentSucess"] = false;
    this.setState(newState);
  }

  componentDidMount() {
    this.findDetails();
  }

  render() {
    return (
      <div className="email-wrapper">
        <h1>Contact with {this.state.artistName}</h1>
        <form className="email-container">
          <label className="email-field">From:</label>
          <input
            className="email-field"
            placeholder="Write here your email"
            value={this.state.emailUser}
            onChange={e => this.handleFormChange(e, "emailUser")}
          />
          <label className="email-field">To:</label>
          <input
            className="email-field"
            disabled
            value={this.state.emailArtist}
            onChange={e => this.handleFormChange(e, "emailArtist")}
          />
          <label className="email-field">Subject:</label>
          <input
            className="email-field"
            placeholder="Write here the subject"
            onChange={e => this.handleFormChange(e, "subject")}
          />
          <textarea
            className="email-field"
            placeholder="Write here the text for the artist"
            rows="15"
            cols="10"
            onChange={e => this.handleFormChange(e, "textEmail")}
          />
          <div className="btn-container">
            <button className="btn-email" onClick={e => this.sendEmail(e)}>
              Send Email
            </button>
            {this.state.emailSentSucess && (
              <p className="email-sent">Email sent succesfully!</p>
            )}
          </div>
        </form>
      </div>
    );
  }
}
