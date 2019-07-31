import React, { Component } from "react";
import Popularity from "../Popularity/Popularity";
import "./Comment.css";

export default class Comment extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      created_date: undefined,
      ranking: 0,
      title: "",
      comment: ""
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      user: this.props.user,
      created_date: this.props.creation_date,
      ranking: this.props.valoration,
      title: this.props.title,
      comment: this.props.comment
    });
  }

  render() {
    return (
      <div className="comment-wrapper">
        <h5 className="name-of-user">{this.state.user}</h5>
        <div className="head-comment">
          <Popularity mode="noneditable" value={this.state.ranking} />
          <p className="title-comment">
            ({this.state.created_date}) {this.state.title}
          </p>
        </div>
        <textarea
          className="description-comment"
          disabled
          rows="5"
          cols="10"
          value={this.state.comment}
        />
      </div>
    );
  }
}
