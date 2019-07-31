import React, { Component } from "react";
import "./CommentNew.css";
import Popularity from "../Popularity/Popularity";
import Axios from "axios";

export default class CommentNew extends Component {
  constructor() {
    super();
    this.state = {
      valoration: 0,
      title: "",
      comment: "",
      username: undefined,
      artistname: undefined
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      username: this.props.user._id,
      artistname: this.props.match.params.id
    });
  }

  submitForm(e) {
    e.preventDefault();
    debugger;
    let isFilledUser =
      this.state.username !== undefined && this.state.username !== "";
    let isFilledArtist =
      this.state.artistname !== undefined && this.state.artistname !== "";
    let isFilledTitle =
      this.state.title !== undefined && this.state.title !== "";
    let isFilledComment =
      this.state.comment !== undefined && this.state.comment !== "";

    if (isFilledUser && isFilledArtist && isFilledTitle && isFilledComment) {
      console.log(`vas a ir a ${process.env.REACT_APP_URL}`);
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
      <div>
        <h1>USERNAME</h1>
        <form>
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
            type="text"
            name="title"
            onChange={e => {
              this.handleFormChange(e, "title");
            }}
            placeholder="Write here one title"
          />
          <textarea
            name="comment"
            onChange={e => this.handleFormChange(e, "comment")}
            placeholder="Write here your comment"
          />
          <button onClick={e => this.submitForm(e)}>Add comment</button>
        </form>
      </div>
    );
  }
}
