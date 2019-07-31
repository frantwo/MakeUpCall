import React, { Component } from "react";
import "./CommentNew.css";
import Popularity from "../Popularity/Popularity";
import Axios from "axios";

export default class CommentNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valoration: 0,
      title: "",
      comment: "",
      userID: "",
      username: "",
      artistID: ""
    };
  }

  findDetails = () => {
    Axios.get(
      `${process.env.REACT_APP_URL}/artists/getDetails/${
        this.props.match.params.id
      }`
    )
      .then(artist => {
        this.setState({
          ...this.state,
          artistname: artist.data.username,
          userID: this.props.user._id,
          artistID: this.props.match.params.id
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.findDetails();
  }

  submitForm(e) {
    e.preventDefault();
    let isFilledUser =
      this.state.userID !== undefined && this.state.userID !== "";
    let isFilledArtist =
      this.state.artistID !== undefined && this.state.artistID !== "";
    let isFilledTitle =
      this.state.title !== undefined && this.state.title !== "";
    let isFilledComment =
      this.state.comment !== undefined && this.state.comment !== "";

    if (isFilledUser && isFilledArtist && isFilledTitle && isFilledComment) {
      Axios.post(
        `${process.env.REACT_APP_URL}/artists/newcomment`,
        this.state
      ).then(newComment => {
        console.log(newComment);
      });
    }
  }

  handleFormChange(e, field) {
    let newState = { ...this.state };
    newState[field] = e.target.value;
    this.setState({ ...this.state, ...newState });
  }

  popularitySelected(value) {
    this.setState({ ...this.state, valoration: value });
  }

  render() {
    return (
      <div className="comment-container">
        <h1>{this.state.artistname}</h1>
        <form className="form-opinion">
          <div className="ranking-content">
            <label>Vote: </label>
            <Popularity
              mode="editable-with-handlers"
              name="valoration"
              filterPopularity={e => this.popularitySelected(e)}
              onChange={e => this.handleFormChange(e, "valoration")}
            />
          </div>
          <input
            className="field-opinion"
            type="text"
            name="title"
            onChange={e => {
              this.handleFormChange(e, "title");
            }}
            placeholder="Write here one title"
          />
          <textarea
            className="field-opinion"
            name="comment"
            onChange={e => this.handleFormChange(e, "comment")}
            placeholder="Write here your comment"
            rows="5"
            cols="40"
          />
          <button className="btn-opinion" onClick={e => this.submitForm(e)}>
            Add comment
          </button>
        </form>
      </div>
    );
  }
}
